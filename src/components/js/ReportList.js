import React from "react";

const ReportList = ({ reports }) => {
  return (
    <div>
      <table style={{ border: "1px solid black", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ border: "1px solid black" }}>
            <th
              style={{ border: "1px solid black", padding: "8px" }}
            >
              Month
            </th>
            <th style={{ border: "1px solid black", padding: "8px" }}
            >
              Budget
            </th>
            <th
              style={{ border: "1px solid black", padding: "8px" }}
            >
              Expenditure
            </th>
            <th
              style={{ border: "1px solid black", padding: "8px" }}
            >
              Saving
            </th>
          </tr>
        </thead>
        <tbody>
          {reports.length ? (
            reports.map((report) => (
              <tr key={`${report.consumer.id}-${report.month}`} className="expense-list-item">
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {report.month}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {`$${report.budget}`}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {report.expenditure}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {report.saving}
                </td>
              </tr>
            ))
          ) : (
            <div className="expense-list-no-items-message">No reports available.</div>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ReportList;
