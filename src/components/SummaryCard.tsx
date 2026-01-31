import type { Transaction } from "../types/transaction";

interface SummaryCardProps {
  transaction: Transaction[];
}
export function SummaryCard({ transaction }: SummaryCardProps) {
  const income = transaction
    .filter((item) => item.type === "income")
    .reduce((acc, item) => acc + item.amount, 0);

  const expense = transaction
    .filter((item) => item.type === "expense")
    .reduce((acc, item) => acc + item.amount, 0);
  const balance = income - expense;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
      <div className="bg-green-400 hover:bg-green-500 dark:bg-green-900 dark:hover:bg-green-950 p-4 rounded-xl shadow-sm font-semibold transition">
        <p className="text-sm text-gray-600 dark:text-gray-100">Income</p>
        <p className="text-sm font-semibold">${income}</p>
      </div>

      <div className="bg-red-400 hover:bg-red-500 dark:bg-red-900 dark:hover:bg-red-950 p-4 rounded-xl font-semibold transition">
        <p className="text-sm text-gray-800 dark:text-gray-100">Expenses</p>
        <p className="text-xl font-semibold">${expense}</p>
      </div>

      <div className="bg-blue-400 hover:bg-blue-500 dark:bg-blue-900 dark:hover:to-blue-950 p-4 rounded-xl font-semibold transition">
        <p className="text-sm text-gray-800 dark:text-gray-100">Balance</p>
        <p className="text-xl font-semibold">${balance}</p>
      </div>
    </div>
  );
}
