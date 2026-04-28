// Mock database layer for frontend
// In production, these would call backend APIs

const mockCustomers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    sentiment_score: 0.8,
    channel: 'whatsapp',
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+0987654321',
    sentiment_score: 0.6,
    channel: 'email',
    created_at: new Date().toISOString(),
  },
];

const mockConversations = [
  {
    id: 1,
    customer_id: 1,
    channel: 'whatsapp',
    status: 'open',
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    customer_id: 2,
    channel: 'email',
    status: 'closed',
    created_at: new Date().toISOString(),
  },
];

const mockTickets = [
  {
    id: 1,
    customer_id: 1,
    title: 'Payment processing issue',
    description: 'Unable to process credit card',
    status: 'open',
    priority: 'high',
    category: 'billing',
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    customer_id: 2,
    title: 'Feature request',
    description: 'Export to CSV',
    status: 'open',
    priority: 'medium',
    category: 'feature_request',
    created_at: new Date().toISOString(),
  },
];

export async function getCustomers() {
  return mockCustomers;
}

export async function getCustomerById(id: number) {
  return mockCustomers.find(c => c.id === id);
}

export async function createCustomer(data: any) {
  const newCustomer = {
    id: Math.max(...mockCustomers.map(c => c.id), 0) + 1,
    ...data,
    created_at: new Date().toISOString(),
  };
  mockCustomers.push(newCustomer);
  return newCustomer;
}

export async function getConversations(customerId?: number) {
  if (customerId) {
    return mockConversations.filter(c => c.customer_id === customerId);
  }
  return mockConversations;
}

export async function createConversation(data: any) {
  const newConversation = {
    id: Math.max(...mockConversations.map(c => c.id), 0) + 1,
    ...data,
    status: data.status || 'open',
    created_at: new Date().toISOString(),
  };
  mockConversations.push(newConversation);
  return newConversation;
}

export async function getMessages(conversationId: number) {
  return [];
}

export async function createMessage(data: any) {
  return {
    ...data,
    id: Math.random(),
    created_at: new Date().toISOString(),
  };
}

export async function getTickets(customerId?: number) {
  if (customerId) {
    return mockTickets.filter(t => t.customer_id === customerId);
  }
  return mockTickets;
}

export async function createTicket(data: any) {
  const newTicket = {
    id: Math.max(...mockTickets.map(t => t.id), 0) + 1,
    ...data,
    status: 'open',
    priority: data.priority || 'medium',
    created_at: new Date().toISOString(),
  };
  mockTickets.push(newTicket);
  return newTicket;
}

export async function updateTicket(id: number, data: any) {
  const ticket = mockTickets.find(t => t.id === id);
  if (ticket) {
    Object.assign(ticket, data);
  }
  return ticket;
}

export async function getReports(days = 30) {
  const reports = [];
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    reports.push({
      report_date: date.toISOString().split('T')[0],
      total_messages: Math.floor(Math.random() * 50) + 10,
      resolved_tickets: Math.floor(Math.random() * 15) + 5,
      total_customers: Math.floor(Math.random() * 20) + 10,
    });
  }
  return reports;
}

export async function getKnowledgeBase() {
  return [
    {
      id: 1,
      title: 'How to reset password',
      content: 'Go to login page and click "Forgot Password"',
      category: 'account',
      created_at: new Date().toISOString(),
    },
    {
      id: 2,
      title: 'Payment methods',
      content: 'We accept credit cards, debit cards, and digital wallets',
      category: 'billing',
      created_at: new Date().toISOString(),
    },
  ];
}

export async function searchKnowledgeBase(query_text: string) {
  const kb = await getKnowledgeBase();
  return kb.filter(
    item => item.title.toLowerCase().includes(query_text.toLowerCase()) ||
      item.content.toLowerCase().includes(query_text.toLowerCase())
  );
}
