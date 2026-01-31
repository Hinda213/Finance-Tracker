import  { useState } from "react";
import type { Transaction } from "../types/transaction";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import Analytics from "../components/Analytics";
import { SummaryCard } from "../components/SummaryCard";




interface DashboardProps {
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
  deleteTransaction: (id: string) => void;
  clearTransactions: () => void;
}

export default function Dashboard({
  transactions,
  setTransactions,
  deleteTransaction,
  clearTransactions,
}: DashboardProps) {
  
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);


  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Form */}
      <section className="mb-6">
        <SummaryCard transaction={transactions} />
      </section>
      <section>
        <TransactionForm
          setTransactions={setTransactions}
          editingTransaction={editingTransaction}
          setEditingTransaction={setEditingTransaction}
        />
      </section>
      <section>
        <TransactionList
          transactions={transactions}
          deleteTransaction={deleteTransaction}
          setEditingTransaction={setEditingTransaction}
        />
      </section>
      {transactions.length > 0 && (
        <div className="flex justify-end mb-6">
          <button
            onClick={clearTransactions}
            className="px-4 py-2 mt-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Clear All Transactions
          </button>
        </div>
      )}
      {/* Analytics */}
      <section>
        <Analytics transactions={transactions} />
      </section>
    </div>
  );
}
