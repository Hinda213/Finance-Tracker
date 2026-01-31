import { useEffect, useState, type FormEvent } from "react";
import type { Transaction, TransactionType } from "../types/transaction.ts";
import { v4 as uuidv4 } from "uuid";

interface TransactionFormProps {
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
  editingTransaction: Transaction | null;
  setEditingTransaction: React.Dispatch<
    React.SetStateAction<Transaction | null>
  >;
}

export default function TransactionForm({
  setTransactions,
  editingTransaction,
  setEditingTransaction,
}: TransactionFormProps) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [type, setType] = useState<TransactionType>("income");
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (editingTransaction) {
      setTitle(editingTransaction.title);
      setAmount(editingTransaction.amount);
      setType(editingTransaction.type);
      setCategory(editingTransaction.category);
    }
  }, [editingTransaction]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!title || !amount || !category) return;

    if (editingTransaction) {
      setTransactions((prev) =>
        prev.map((t) =>
          t.id === editingTransaction.id
            ? {
                ...t,
                title,
                amount: Number(amount),
                type,
                category,
              }
            : t,
        ),
      );
      setEditingTransaction(null);
    } else {
      const newTransaction: Transaction = {
        id: uuidv4(),
        title,
        amount: Number(amount),
        type,
        category,
        date: new Date().toISOString(),
      };

      setTransactions((prev) => [newTransaction, ...prev]);
    }

    setTitle("");
    setAmount("");
    setType("income");
    setCategory("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-200 dark:bg-slate-700 p-6 rounded-xl shadow-md w-full max-w-md mx-auto my-6"
    >
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
        {editingTransaction ? "Edit Transaction" : "Add Transaction"}
      </h2>

      {/* Title */}
      <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">
        Title
      </label>
      <input
        type="text"
        placeholder="e.g. Salary, Rent, Grocery shopping"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 mb-4 border rounded dark:bg-gray-800 dark:border-gray-600"
      />

      {/* Amount */}
      <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">
        Amount
      </label>
      <input
        type="number"
        placeholder="e.g. 1200"
        value={amount}
        onChange={(e) =>
          setAmount(e.target.value === "" ? "" : Number(e.target.value))
        }
        className="w-full p-2 mb-4 border rounded dark:bg-gray-800 dark:border-gray-600"
      />

      {/* Category */}
      <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">
        Category
      </label>
      <input
        type="text"
        placeholder="e.g. Food, Transport, Entertainment"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full p-2 mb-4 border rounded dark:bg-gray-800 dark:border-gray-600"
      />

      {/* Type */}
      <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">
        Type
      </label>
      <select
        value={type}
        onChange={(e) => setType(e.target.value as TransactionType)}
        className="w-full p-2 mb-6 border rounded dark:bg-gray-800 dark:border-gray-600"
      >
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
      >
       { editingTransaction ? "Update Transaction" : "Add Transaction"}
      </button>

      {editingTransaction && (
        <button
          type="button"
          className="w-full mt-2 bg-gray-300 text-gray-800 p-2 rounded hover:bg-gray-400 transition"
          onClick={() => setEditingTransaction(null)}
        >
          Cancel Edit
        </button>
      )}

    </form>
  );
}
