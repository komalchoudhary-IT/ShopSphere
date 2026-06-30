// import React, { useEffect, useState } from "react";

// function Reports() {
//   const [report, setReport] = useState({});

//   useEffect(() => {
//     fetch("http://127.0.0.1:8000/api/reports/")
//       .then((res) => res.json())
//       .then((data) => setReport(data));
//   }, []);

//   return (
//     <div>
//       <h2>Reports</h2>

//       <h3>Total Categories: {report.categories}</h3>
//       <h3>Total Products: {report.products}</h3>
//       <h3>Total Vendors: {report.vendors}</h3>
//       <h3>Total Customers: {report.customers}</h3>
//     </div>
//   );
// }

// export default Reports;


import { useEffect, useState } from "react";

function Reports() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/reports/")
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.log(err));
  }, []);

  if (!data) return <h2>Loading Reports...</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>📊 Reports Page</h1>

      <div>Total Orders: {data.total_orders}</div>
      <div>Total Customers: {data.total_customers}</div>
      <div>Total Products: {data.total_products}</div>
    </div>
  );
}

export default Reports;