import React from "react";
import { Progress } from "antd";
const Analytics = ({ allTransaction }) => {
  const categories = [
    "salary",
    "tip",
    "project",
    "Food",
    "bills",
    "medical",
    "misc",
  ];
  const totalTransaction = allTransaction.length;
  const totalIncomeTransaction = allTransaction.filter(
    (transaction) => transaction.type === "income"
  );
  const totalExpenseTransaction = allTransaction.filter(
    (transaction) => transaction.type === "expense"
  );
  const totalIncomePercent =
    (totalIncomeTransaction.length / totalTransaction) * 100;
  const totalExpensePercent =
    (totalExpenseTransaction.length / totalTransaction) * 100;

  //  Total Turnover
  const totalTurnover = allTransaction
    .map((transaction) => transaction.amount)
    .reduce((acc, amount) => acc + amount, 0);
  const totalIncomeTurnover = allTransaction
    .filter((transaction) => transaction.type === "income")
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  const totalExpenseTurnover = allTransaction
    .filter((transaction) => transaction.type === "expense")
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  const totalIncomeTurnoverPercent =
    (totalIncomeTurnover / totalTurnover) * 100;
  const totalExpenseTurnoverPercent =
    (totalExpenseTurnover / totalTurnover) * 100;
  let totalAmount = 0;
  allTransaction.forEach((transaction) => {
    totalAmount += parseInt(transaction.amount);
  });
  return (
    <>
      <div className='row m-3'>
        <div className='col-md-4'>
          <div className='card'>
            <div className='card-header'>
              Total Transaction : {totalTransaction}
            </div>
            <div className='card-body'>
              <h5 style={{ color: "green" }}>
                Income : {totalIncomeTransaction.length}{" "}
              </h5>
              <h5 style={{ color: "red" }}>
                Expense : {totalExpenseTransaction.length}{" "}
              </h5>
            </div>
            <div>
              <Progress
                type='circle'
                strokeColor={"green"}
                className='mx-2'
                percent={totalIncomePercent.toFixed(0)}
              />
              <Progress
                type='circle'
                strokeColor={"red"}
                className='mx-2'
                percent={totalExpensePercent.toFixed(0)}
              />
            </div>
          </div>
        </div>
        <div className='col-md-4'>
          <div className='card'>
            <div className='card-header'>Total Turnover : {totalAmount}</div>
            <div className='card-body'>
              <h5 style={{ color: "green" }}>
                Income : {totalIncomeTurnover}{" "}
              </h5>
              <h5 style={{ color: "red" }}>
                Expense : {totalExpenseTurnover}{" "}
              </h5>
            </div>
            <div>
              <Progress
                type='circle'
                strokeColor={"green"}
                className='mx-2'
                percent={totalIncomeTurnoverPercent.toFixed(0)}
              />
              <Progress
                type='circle'
                strokeColor={"red"}
                className='mx-2'
                percent={totalExpenseTurnoverPercent.toFixed(0)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className='row-mt-3 d-flex'>
        <div className='col-md-4 mx-3'>
          <h4>Category-Wise Income</h4>
          {categories.map((category) => {
            const amount = allTransaction
              .filter(
                (transaction) =>
                  transaction.type === "income" &&
                  transaction.category === category
              )
              .reduce((acc, transaction) => acc + transaction.amount, 0);
              return(
                amount>0 && 
                <div className = "card">
                  <div className = "card-body">
                    <h5>{category}</h5>
                    <Progress percent = {((amount/totalIncomeTurnover)*100).toFixed(0)} />
                  </div>
                </div>
              )
          })}
        </div>
        <div className='col-md-4'>
          <h4>Category-Wise Expense</h4>
          {categories.map((category) => {
            const amount = allTransaction
              .filter(
                (transaction) =>
                  transaction.type === "expense" &&
                  transaction.category === category
              )
              .reduce((acc, transaction) => acc + transaction.amount, 0);
              return(
                amount>0 && 
                <div className = "card">
                  <div className = "card-body">
                    <h5>{category}</h5>
                    <Progress percent = {((amount/totalExpenseTurnover)*100).toFixed(0)} />
                  </div>
                </div>
              )
          })}
        </div>
      </div>
      
    </>
  );
};

export default Analytics;
