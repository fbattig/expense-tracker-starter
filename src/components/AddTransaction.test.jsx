import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import AddTransaction from './AddTransaction';

const categories = ['food', 'housing', 'utilities', 'transport', 'entertainment', 'salary', 'other'];

describe('AddTransaction', () => {
  it('renders the form fields', () => {
    render(<AddTransaction categories={categories} onAddTransaction={() => {}} />);
    expect(screen.getByPlaceholderText('Description')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Amount')).toBeInTheDocument();
    expect(screen.getByText('Add')).toBeInTheDocument();
  });

  it('calls onAddTransaction with correct data on submit', async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();
    render(<AddTransaction categories={categories} onAddTransaction={onAdd} />);

    await user.type(screen.getByPlaceholderText('Description'), 'Coffee');
    await user.type(screen.getByPlaceholderText('Amount'), '5');
    await user.click(screen.getByText('Add'));

    expect(onAdd).toHaveBeenCalledOnce();
    const arg = onAdd.mock.calls[0][0];
    expect(arg.description).toBe('Coffee');
    expect(arg.amount).toBe(5);
    expect(arg.type).toBe('expense');
    expect(arg.category).toBe('food');
  });

  it('does not submit when description is empty', async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();
    render(<AddTransaction categories={categories} onAddTransaction={onAdd} />);

    await user.type(screen.getByPlaceholderText('Amount'), '5');
    await user.click(screen.getByText('Add'));

    expect(onAdd).not.toHaveBeenCalled();
  });

  it('clears the form after submit', async () => {
    const user = userEvent.setup();
    render(<AddTransaction categories={categories} onAddTransaction={() => {}} />);

    await user.type(screen.getByPlaceholderText('Description'), 'Coffee');
    await user.type(screen.getByPlaceholderText('Amount'), '5');
    await user.click(screen.getByText('Add'));

    expect(screen.getByPlaceholderText('Description')).toHaveValue('');
    expect(screen.getByPlaceholderText('Amount')).toHaveValue(null);
  });
});
