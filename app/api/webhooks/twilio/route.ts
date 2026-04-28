import { NextRequest, NextResponse } from 'next/server';

const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_SANDBOX_NUMBER = process.env.TWILIO_WHATSAPP_SANDBOX_NUMBER;
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

// Store conversations in memory for demo
const conversations: Record<string, Array<{ role: string; content: string }>> = {};

async function sendWhatsAppMessage(to: string, message: string) {
  const auth = Buffer.from(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`).toString('base64');
  
  try {
    console.log('[v0] Sending WhatsApp to:', to);
    console.log('[v0] Message:', message);
    console.log('[v0] From:', `whatsapp:${TWILIO_SANDBOX_NUMBER}`);
    
    const params = new URLSearchParams({
      From: `whatsapp:${TWILIO_SANDBOX_NUMBER}`,
      To: `whatsapp:${to}`,
      Body: message.substring(0, 1600), // Twilio limit
    });

    const response = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`,
      {
        method: 'POST',
        headers: {
          Authorization: `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      }
    );

    const responseData = await response.json();
    console.log('[v0] Twilio response status:', response.status);
    console.log('[v0] Twilio response:', responseData);

    if (response.ok) {
      console.log('[v0] WhatsApp sent successfully, SID:', responseData.sid);
      return responseData;
    } else {
      console.error('[v0] Twilio error:', response.status, responseData);
      throw new Error(`Twilio error: ${response.status} - ${JSON.stringify(responseData)}`);
    }
  } catch (error) {
    console.error('[v0] Failed to send WhatsApp:', error);
    throw error;
  }
}

async function getAIResponse(message: string, phoneNumber: string): Promise<string> {
  try {
    if (!conversations[phoneNumber]) {
      conversations[phoneNumber] = [];
    }

    conversations[phoneNumber].push({ role: 'user', content: message });

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': ANTHROPIC_API_KEY || '',
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 1024,
        system: `You are a helpful customer support AI agent. Keep responses brief for WhatsApp (max 160 chars). 
Be friendly, professional, and helpful. Help with: orders, billing, technical issues, general inquiries.`,
        messages: conversations[phoneNumber].map(m => ({
          role: m.role as 'user' | 'assistant',
          content: m.content,
        })),
      }),
    });

    if (response.ok) {
      const data = await response.json();
      const aiMessage = data.content[0].text;
      conversations[phoneNumber].push({ role: 'assistant', content: aiMessage });
      console.log('[v0] Claude response:', aiMessage);
      return aiMessage;
    } else {
      console.error('[v0] Claude error:', response.status);
      return 'Thanks for reaching out! Our team will get back to you shortly.';
    }
  } catch (error) {
    console.error('[v0] AI Error:', error);
    return 'Thanks for reaching out! Our team will get back to you shortly.';
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const from = formData.get('From')?.toString() || '';
    const body = formData.get('Body')?.toString() || '';
    const messageId = formData.get('MessageSid')?.toString() || '';

    console.log('[v0] ===== TWILIO WEBHOOK RECEIVED =====');
    console.log('[v0] From:', from);
    console.log('[v0] Body:', body);
    console.log('[v0] MessageSid:', messageId);

    if (!from || !body) {
      console.log('[v0] Missing required fields');
      return new NextResponse('<?xml version="1.0" encoding="UTF-8"?><Response></Response>', {
        headers: { 'Content-Type': 'application/xml' },
        status: 400,
      });
    }

    const phoneNumber = from.replace('whatsapp:', '').trim();
    console.log('[v0] Extracted phone:', phoneNumber);

    // Get AI response
    console.log('[v0] Getting AI response...');
    const aiResponse = await getAIResponse(body, phoneNumber);
    console.log('[v0] AI response ready:', aiResponse);

    // Send response back via WhatsApp
    console.log('[v0] Sending WhatsApp response...');
    try {
      const sendResult = await sendWhatsAppMessage(phoneNumber, aiResponse);
      console.log('[v0] WhatsApp sent:', sendResult);
    } catch (sendError) {
      console.error('[v0] Failed to send WhatsApp, but continuing:', sendError);
      // Don't fail the webhook if we can't send back - Twilio needs 200 OK
    }

    // Return success response
    const twimlResponse = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
</Response>`;

    console.log('[v0] ===== WEBHOOK COMPLETE =====');
    return new NextResponse(twimlResponse, {
      headers: { 'Content-Type': 'application/xml' },
      status: 200,
    });
  } catch (error) {
    console.error('[v0] ===== WEBHOOK ERROR =====', error);
    // Always return 200 OK so Twilio doesn't retry
    return new NextResponse('<?xml version="1.0" encoding="UTF-8"?><Response></Response>', {
      headers: { 'Content-Type': 'application/xml' },
      status: 200,
    });
  }
}
