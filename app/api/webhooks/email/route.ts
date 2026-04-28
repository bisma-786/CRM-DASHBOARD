import { NextRequest, NextResponse } from 'next/server';

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

// Store email conversations in memory
const emailConversations: Record<string, Array<{ role: string; content: string }>> = {};

async function getAIResponseForEmail(message: string, senderEmail: string): Promise<string> {
  try {
    if (!emailConversations[senderEmail]) {
      emailConversations[senderEmail] = [];
    }

    emailConversations[senderEmail].push({ role: 'user', content: message });

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
        system: `You are a helpful customer support agent responding to emails. Be professional, friendly, and concise.
Help with: orders, billing, technical issues, general inquiries.
Keep response to 2-3 paragraphs max.`,
        messages: emailConversations[senderEmail].map(m => ({
          role: m.role as 'user' | 'assistant',
          content: m.content,
        })),
      }),
    });

    if (response.ok) {
      const data = await response.json();
      const aiMessage = data.content[0].text;
      emailConversations[senderEmail].push({ role: 'assistant', content: aiMessage });
      console.log('[v0] Claude email response:', aiMessage);
      return aiMessage;
    } else {
      console.error('[v0] Claude error:', response.status);
      return 'Thank you for your email. We will review your message and get back to you shortly.';
    }
  } catch (error) {
    console.error('[v0] AI Error:', error);
    return 'Thank you for your email. We will review your message and get back to you shortly.';
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    console.log('[v0] ===== EMAIL WEBHOOK RECEIVED =====');
    console.log('[v0] Email webhook data:', body);

    const { from, to, subject, text, html, messageId } = body;

    if (!from || !text) {
      console.log('[v0] Missing required email fields');
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Extract email address
    const senderEmail = from.email || from;
    console.log('[v0] From:', senderEmail);
    console.log('[v0] Subject:', subject);

    // Get AI response
    console.log('[v0] Getting AI response for email...');
    const aiResponse = await getAIResponseForEmail(text, senderEmail);
    console.log('[v0] AI email response ready');

    // In a real scenario, you'd send the email response here
    // For now, we're just processing it and storing the conversation
    console.log('[v0] Email response:', aiResponse);

    // Store email conversation (in production, save to database)
    console.log('[v0] ===== EMAIL WEBHOOK COMPLETE =====');

    return NextResponse.json({
      success: true,
      messageId,
      response: aiResponse,
      stored: true,
    }, { status: 200 });
  } catch (error) {
    console.error('[v0] Email webhook error:', error);
    return NextResponse.json(
      { error: 'Failed to process email' },
      { status: 500 }
    );
  }
}
