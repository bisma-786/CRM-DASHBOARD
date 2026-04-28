import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Return mock data for now - database not initialized yet
    const mockReports = [];
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      mockReports.push({
        report_date: date.toISOString().split('T')[0],
        total_messages: Math.floor(Math.random() * 50) + 5,
        resolved_tickets: Math.floor(Math.random() * 20) + 2,
        total_customers: Math.floor(Math.random() * 30) + 5,
      });
    }

    const mockMetrics = {
      total_customers: 45,
      total_conversations: 120,
      total_messages: 1250,
      total_tickets: 89,
      resolved_tickets: 67,
      high_priority_tickets: 12,
      avg_sentiment: 0.72,
    };

    return NextResponse.json({
      reports: mockReports,
      metrics: mockMetrics,
    });
  } catch (error) {
    console.error('Error fetching reports:', error);
    return NextResponse.json({
      reports: [],
      metrics: {
        total_customers: 0,
        total_conversations: 0,
        total_messages: 0,
        total_tickets: 0,
        resolved_tickets: 0,
        avg_sentiment: 0,
      },
    });
  }
}
