import { useEffect, useState } from "react";
import type { Transaction } from "./types/transaction.ts";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header.tsx";

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const stored = localStorage.getItem("transactions");
    return stored ? JSON.parse(stored) : [];
  });

  const clearTransactions = () => {
    const confirmed = window.confirm(
      "Are you sure you want to clear all transactions? This action cannot be undone.",
    );
    if (!confirmed) return; 
    setTransactions([]);
    localStorage.removeItem("transactions");
  }
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const deleteTransaction = (id: string) => {
    setTransactions((prev) =>
      prev.filter((transaction) => transaction.id !== id),
    );
  };

  return (
    <div className="min-h-screen bg-slate-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors">
      <Header/>
      <Dashboard
        transactions={transactions}
        setTransactions={setTransactions}
        deleteTransaction={deleteTransaction}
        clearTransactions={clearTransactions}
      />
    </div>
  );
}

export default App;
