import React from 'react';
import styles from './styles.module.css'; // Import CSS module

const SpendingAnalyzer = ({ expenses }) => {
  // Calculate total spending
  const totalSpending = expenses.reduce((total, expense) => {
    return total + expense.amount;
  }, 0);

  // Calculate average spending
  const averageSpending = totalSpending / expenses.length || 0;

  // Calculate highest spending
  const highestSpending = expenses.reduce((max, expense) => {
    return Math.max(max, expense.amount);
  }, 0);

  // Calculate lowest spending
  const lowestSpending = expenses.reduce((min, expense) => {
    return Math.min(min, expense.amount);
  }, expenses[0]?.amount || 0);

  return (
    <div className={styles['spending-analyzer']}>
      <h2 className={styles['spending-analyzer__title']}>Spending Analysis</h2>
      <p className={styles['spending-analyzer__item']}>Total Spending: ${totalSpending}</p>
      <p className={styles['spending-analyzer__item']}>Average Spending: ${averageSpending.toFixed(2)}</p>
      <p className={styles['spending-analyzer__item']}>Highest Spending: ${highestSpending}</p>
      <p className={styles['spending-analyzer__item']}>Lowest Spending: ${lowestSpending}</p>
    </div>
  );
};

export default SpendingAnalyzer;
