import React, { useState } from "react";

const ExpenseList = ({ expenses }) => {
  const [filterCategory, setFilterCategory] = useState("");
  const [filterAmount, setFilterAmount] = useState("");
  const [filterAmountType, setFilterAmountType] = useState("");
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");

  const handleFilterCategoryChange = (e) => {
    setFilterCategory(e.target.value);
  };

  const handleFilterAmountChange = (e) => {
    setFilterAmount(e.target.value);
  };

  const handleFilterAmountTypeChange = (e) => {
    setFilterAmountType(e.target.value);
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const sortedExpenses = [...expenses].sort((a, b) => {
    const multiplier = sortDirection === "asc" ? 1 : -1;
    switch (sortColumn) {
      case "date":
        return multiplier * (new Date(a.date) - new Date(b.date));
      case "category":
        return multiplier * a.category.name.localeCompare(b.category.name);
      case "description":
        return multiplier * a.description.localeCompare(b.description);
      case "amount":
        return multiplier * (a.amount - b.amount);
      default:
        return 0;
    }
  });

  const filteredExpenses = sortedExpenses.filter(
    (expense) =>
      expense.category
        .toLowerCase()
        .includes(filterCategory.toLowerCase()) &&
      (filterAmountType === "" ||
        filterAmount === "" ||
        (filterAmountType === "greaterThan" &&
          expense.amount > parseInt(filterAmount)) ||
        (filterAmountType === "lessThan" &&
          expense.amount < parseInt(filterAmount)))
  );

  return (
    <div>
      <div style={{ marginBottom: "16px" }}>
        <label>
          Category like{" "}
          <input
            type="text"
            value={filterCategory}
            onChange={handleFilterCategoryChange}
          />
        </label>
      </div>
      <div style={{ marginBottom: "16px" }}>
        <label>
          Amount{" "}
          <select
            value={filterAmountType}
            onChange={handleFilterAmountTypeChange}
          >
            <option value="">-- Select filter type --</option>
            <option value="greaterThan">Greater Than</option>
            <option value="lessThan">Less Than</option>
          </select>{" "}
          <input
            type="number"
            value={filterAmount}
            onChange={handleFilterAmountChange}
          />
        </label>
      </div>
      <table style={{ border: "1px solid black", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ border: "1px solid black" }}>
            <th
              style={{ border: "1px solid black", padding: "8px" }}
              onClick={() => handleSort("date")}
            >
              Date {sortColumn === "date" && sortDirection === "asc" && "▲"}
              {sortColumn === "date" && sortDirection === "desc" && "▼"}
            </th>
            <th style={{ border: "1px solid black", padding: "8px" }}
              onClick={() => handleSort("category")}
            >
              Category {sortColumn === "category" && sortDirection === "asc" && "▲"}
              {sortColumn === "category" && sortDirection === "desc" && "▼"}
            </th>
            <th
              style={{ border: "1px solid black", padding: "8px" }}
              onClick={() => handleSort("description")}
            >
              Description {sortColumn === "description" && sortDirection === "asc" && "▲"}
              {sortColumn === "description" && sortDirection === "desc" && "▼"}
            </th>
            <th
              style={{ border: "1px solid black", padding: "8px" }}
              onClick={() => handleSort("amount")}
            >
              Amount {sortColumn === "amount" && sortDirection === "asc" && "▲"}
              {sortColumn === "amount" && sortDirection === "desc" && "▼"}
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredExpenses.map((expense) => (
            <tr key={expense.id} style={{ border: "1px solid black" }}>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {new Date(expense.date).toLocaleDateString()}
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {expense.category}
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {expense.description}
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {expense.amount}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseList;

