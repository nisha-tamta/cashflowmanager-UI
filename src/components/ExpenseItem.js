import React from "react";

const ExpenseItem = ({ expense }) => {
  return (
    <div>
      <p>Category: {expense.category}</p>
      <p>Amount: ${expense.amount}</p>
    </div>
  );
};

export default ExpenseItem;