import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import TransactionList from './TransactionList';

const categories = ['food', 'housing', 'utilities'];

const transactions = [
  { id: 1, description: 'Salary', amount: 5000, type: 'income', category: 'salary', date: '2025-01-01' },
  { id: 2, description: 'Rent', amount: 1200, type: 'expense', category: 'housing', date: '2025-01-02' },
  { id: 3, description: 'Groceries', amount: 150, type: 'expense', category: 'food', date: '2025-01-03' },
];

describe('TransactionList', () => {
  it('renders all transactions', () => {
    render(<TransactionList transactions={transactions} categories={categories} onDeleteTransaction={() => {}} />);
    expect(screen.getByText('Salary')).toBeInTheDocument();
    expect(screen.getByText('Rent')).toBeInTheDocument();
    expect(screen.getByText('Groceries')).toBeInTheDocument();
  });

  it('filters by type', async () => {
    const user = userEvent.setup();
    render(<TransactionList transactions={transactions} categories={categories} onDeleteTransaction={() => {}} />);

    await user.selectOptions(screen.getByDisplayValue('All Types'), 'expense');

    expect(screen.queryByText('Salary')).not.toBeInTheDocument();
    expect(screen.getByText('Rent')).toBeInTheDocument();
    expect(screen.getByText('Groceries')).toBeInTheDocument();
  });

  it('filters by category', async () => {
    const user = userEvent.setup();
    render(<TransactionList transactions={transactions} categories={categories} onDeleteTransaction={() => {}} />);

    await user.selectOptions(screen.getByDisplayValue('All Categories'), 'food');

    expect(screen.queryByText('Rent')).not.toBeInTheDocument();
    expect(screen.getByText('Groceries')).toBeInTheDocument();
  });

  it('shows confirmation modal on delete click', async () => {
    const user = userEvent.setup();
    render(<TransactionList transactions={transactions} categories={categories} onDeleteTransaction={() => {}} />);

    const deleteButtons = screen.getAllByText('Delete');
    await user.click(deleteButtons[0]);

    expect(screen.getByText(/Are you sure you want to delete/)).toBeInTheDocument();
  });

  it('calls onDeleteTransaction when confirmed', async () => {
    const user = userEvent.setup();
    const onDelete = vi.fn();
    render(<TransactionList transactions={transactions} categories={categories} onDeleteTransaction={onDelete} />);

    const deleteButtons = screen.getAllByText('Delete');
    await user.click(deleteButtons[0]);

    const confirmBtn = document.querySelector('.modal-btn-confirm');
    await user.click(confirmBtn);

    expect(onDelete).toHaveBeenCalledWith(1);
  });
});
