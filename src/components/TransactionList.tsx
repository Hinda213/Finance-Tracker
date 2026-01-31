import type { Transaction } from "../types/transaction";
import TransactionItem from "./TransactionItem";

interface TransactionListProps {
  transactions: Transaction[];
  deleteTransaction: (id: string) => void;
  setEditingTransaction: (t: Transaction) => void;
}

export default function TransactionList({
  transactions,
  deleteTransaction,
  setEditingTransaction,
}: TransactionListProps) {
  if (transactions.length === 0) {
    return (
      <div className="text-center text-gray-400 py-10">
        <p className="text-lg font-medium">
          No transactions yet
        </p>
        <p className="text-sm">
          Add income or expenses to get started
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-center text-lg font-semibold mb-4">
        Transactions
      </h2>

      <div className="space-y-3">
        {transactions.map(transaction => (
          <TransactionItem
            key={transaction.id}
            transaction={transaction}
            deleteTransaction={deleteTransaction}
            setEditingTransaction={setEditingTransaction}
          />
        ))}
      </div>
    </div>
  );
}
