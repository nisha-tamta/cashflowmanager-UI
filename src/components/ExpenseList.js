import React from "react";
import ExpenseItem from "./ExpenseItem";
import styles from './styles.module.css'; // Import CSS module

const ExpenseList = ({ expenses }) => {
  return (
    <div>
      <h2>Expense List</h2>
      <table style={{ border: "1px solid black", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ border: "1px solid black" }}>
            <th style={{ border: "1px solid black", padding: "8px" }}>ID</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>Category</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>Amount</th>
          </tr>
        </thead>
        <tbody>
        {expenses.map((expense) => (
          <tr key={expense.id}>
            <td style={{ border: "1px solid black", padding: "8px" }}>{expense.id}</td>
            <td style={{ border: "1px solid black", padding: "8px" }}>{expense.category}</td>
            <td style={{ border: "1px solid black", padding: "8px" }}>${expense.amount}</td>
          </tr>
        ))}
      </tbody>
      </table>
    </div>
  );
};

export default ExpenseList;
