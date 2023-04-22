import React, { useState } from "react";

const BudgetForm = ({ handleUpdateBudget }) => {
  const [budget, setBudget] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdateBudget(budget);
    setBudget("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        placeholder="Enter Overall Budget"
        value={budget}
        onChange={(e) => setBudget(e.target.value)}
      />
      <button type="submit">Update Budget</button>
    </form>
  );
};

export default BudgetForm;
