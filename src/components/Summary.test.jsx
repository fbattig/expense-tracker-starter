import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Summary from './Summary';

const transactions = [
  { id: 1, description: 'Salary', amount: 5000, type: 'income', category: 'salary', date: '2025-01-01' },
  { id: 2, description: 'Rent', amount: 1200, type: 'expense', category: 'housing', date: '2025-01-02' },
  { id: 3, description: 'Groceries', amount: 150, type: 'expense', category: 'food', date: '2025-01-03' },
];

describe('Summary', () => {
  it('displays correct income total', () => {
    render(<Summary transactions={transactions} />);
    expect(screen.getByText('$5000')).toBeInTheDocument();
  });

  it('displays correct expense total', () => {
    render(<Summary transactions={transactions} />);
    expect(screen.getByText('$1350')).toBeInTheDocument();
  });

  it('displays correct balance', () => {
    render(<Summary transactions={transactions} />);
    expect(screen.getByText('$3650')).toBeInTheDocument();
  });

  it('handles empty transactions', () => {
    render(<Summary transactions={[]} />);
    expect(screen.getAllByText('$0')).toHaveLength(3);
  });
});
