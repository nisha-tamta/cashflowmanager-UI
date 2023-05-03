import React from "react";

const ReportList = ({ reports }) => {
  return (
    <div className="expense-list-container">
      <div className="expense-list-header">
        <div className="expense-list-header-item">Date</div>
        <div className="expense-list-header-item">Category</div>
        <div className="expense-list-header-item">Description</div>
        <div className="expense-list-header-item">Amount</div>
      </div>
      {reports.length ? (
        reports.map((report) => (
          <div key={`${report.consumer.id}-${report.month}`} className="expense-list-item">
            <div className="expense-list-item">{report.month}</div>
            <div className="expense-list-item">{`$${report.budget}`}</div>
            <div className="expense-list-item">{`$${report.expenditure}`}</div>
            <div className="expense-list-item">{`$${report.saving}`}</div>
          </div>
        ))
      ) : (
        <div className="expense-list-no-items-message">No reports available.</div>
      )}
    </div>
  );
};

export default ReportList;
