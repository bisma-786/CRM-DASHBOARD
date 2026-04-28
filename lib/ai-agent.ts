import { generateText, tool } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';
import { query } from './db';
import { z } from 'zod';

// Define tools for the AI agent
const tools = {
  searchKnowledgeBase: tool({
    description: 'Search the knowledge base for relevant information',
    parameters: z.object({
      query: z.string().describe('Search query'),
    }),
    execute: async ({ query: searchQuery }) => {
      const result = await query(
        `SELECT * FROM knowledge_base WHERE title ILIKE $1 OR content ILIKE $1 LIMIT 5`,
        [`%${searchQuery}%`]
      );
      return result.rows.map(r => `${r.title}: ${r.content}`).join('\n');
    },
  }),

  createTicket: tool({
    description: 'Create a support ticket for complex issues',
    parameters: z.object({
      customerId: z.number().describe('Customer ID'),
      title: z.string().describe('Ticket title'),
      description: z.string().describe('Ticket description'),
      priority: z.enum(['low', 'medium', 'high', 'critical']).describe('Ticket priority'),
    }),
    execute: async ({ customerId, title, description, priority }) => {
      const result = await query(
        `INSERT INTO tickets (customer_id, title, description, priority, status) 
         VALUES ($1, $2, $3, $4, 'open') 
         RETURNING id, title, priority`,
        [customerId, title, description, priority]
      );
      return `Ticket created: #${result.rows[0].id}`;
    },
  }),

  analyzeSentiment: tool({
    description: 'Analyze sentiment of customer message',
    parameters: z.object({
      text: z.string().describe('Text to analyze'),
    }),
    execute: async ({ text }) => {
      // Simple sentiment analysis (can be enhanced with ML model)
      const positive = /happy|great|excellent|satisfied|thank|love/i.test(text);
      const negative = /angry|frustrated|terrible|worst|hate|disappointed/i.test(text);
      
      const sentiment = negative ? 'negative' : positive ? 'positive' : 'neutral';
      const score = negative ? -1 : positive ? 1 : 0;
      
      return { sentiment, score };
    },
  }),

  getCustomerInfo: tool({
    description: 'Get customer information',
    parameters: z.object({
      customerId: z.number().describe('Customer ID'),
    }),
    execute: async ({ customerId }) => {
      const result = await query('SELECT * FROM customers WHERE id = $1', [customerId]);
      const customer = result.rows[0];
      if (!customer) return 'Customer not found';
      return `Customer: ${customer.name} (${customer.email}), Company: ${customer.company}, Status: ${customer.status}`;
    },
  }),

  escalateIssue: tool({
    description: 'Escalate an issue to human agent',
    parameters: z.object({
      ticketId: z.number().describe('Ticket ID'),
      reason: z.string().describe('Reason for escalation'),
    }),
    execute: async ({ ticketId, reason }) => {
      const result = await query(
        `INSERT INTO escalations (ticket_id, reason, priority) 
         VALUES ($1, $2, 'high') 
         RETURNING id`,
        [ticketId, reason]
      );
      return `Issue escalated. Escalation ID: ${result.rows[0].id}`;
    },
  }),
};

export async function processCustomerMessage(
  customerId: number,
  conversationId: number,
  customerMessage: string
) {
  const systemPrompt = `You are a helpful CRM customer support AI agent. Your role is to:
1. Answer customer questions using the knowledge base
2. Create tickets for issues that need human attention
3. Analyze sentiment and escalate angry customers
4. Provide accurate information about products/services

Always be professional, empathetic, and helpful. If you cannot resolve an issue, create a ticket and inform the customer.`;

  try {
    const { text: response } = await generateText({
      model: anthropic('claude-3-5-sonnet-20241022'),
      system: systemPrompt,
      prompt: customerMessage,
      tools: tools,
      maxSteps: 5,
    });

    return response;
  } catch (error) {
    console.error('AI processing error:', error);
    return "I'm having trouble processing your request. Please try again or contact our support team.";
  }
}

export async function generateDailyReport(date: string) {
  const { text: report } = await generateText({
    model: anthropic('claude-3-5-sonnet-20241022'),
    prompt: `Generate a concise daily customer support report for ${date}. Include:
1. Total messages handled
2. Average sentiment score
3. Resolved vs escalated tickets
4. Top customer issues
5. Recommendations

Keep it brief and actionable.`,
  });

  return report;
}
