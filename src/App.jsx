import { useState } from 'react'
import './App.css'
import Summary from './components/Summary'
import AddTransaction from './components/AddTransaction'
import TransactionList from './components/TransactionList'
import { categories } from './data/categories'
import { initialTransactions } from './data/initialTransactions'

function App() {
  const [transactions, setTransactions] = useState(initialTransactions);

  const handleAddTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  };

  return (
    <div className="app">
      <h1>Finance Tracker</h1>
      <p className="subtitle">Track your income and expenses</p>

      <Summary transactions={transactions} />

      <AddTransaction categories={categories} onAddTransaction={handleAddTransaction} />

      <TransactionList transactions={transactions} categories={categories} />
    </div>
  );
}

export default App
