import type { Transaction } from "../types/transaction";

interface TransactionItemProps {
  transaction: Transaction;
  deleteTransaction: (id: string) => void;
  setEditingTransaction: (t: Transaction) => void;
}

export default function TransactionItem({
  transaction,
  deleteTransaction,
  setEditingTransaction,
}: TransactionItemProps) {
  const isIncome = transaction.type === "income";

  return (
    <div
      className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border-1-4 border-1-green-500 text-slate-800  dark:text-gray-900 mb-4"
      style={{
        borderLeftColor: isIncome ? "#22c55e" : "#ef4444",
      }}
    >
      <div>
        <p className="font-medium">{transaction.type}</p>
        <p className="text-sm text-gray-500 dark:text-gray-900">{transaction.category}</p>
      </div>

      <p
        className={`font-semibold ${isIncome ? "text-green-600" : "text-red-600"}`}
      >
        {isIncome ? "+" : "-"}${transaction.amount}
      </p>
      <div className="flex gap-5 p-4">
        <button
          onClick={() => setEditingTransaction(transaction)}
          className="text-black font-bold  hover:text-blue-600 transition border  rounded-xl"
        >
          Edit
        </button>
        <button
          onClick={() => deleteTransaction(transaction.id)}
          className="text-black font-bold  hover:text-red-500 border  rounded-xl bg-white hover:bg-red-100 transition "
        >
          ❌
        </button>
      </div>
    </div>
  );
}
