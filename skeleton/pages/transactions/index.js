import TransactionList from "@/components/ui/TransactionsList";

import { getDateByMonthYear, getTransactions } from "../../helpers/selectors";
import axios from "axios";
import { useEffect, useState } from "react";
import { formatDate } from "@/helpers/formatters";

export default function Transactions({ month, year, transactions, indexPage, text}) {
  const [currentTransactions, setCurrentTransactions] = useState(transactions);
  const [currentMonth, setCurrentMonth] = useState(month);
  const [currentYear, setCurrentYear] = useState(year);
  const [formattedDates, setFormattedDates] = useState({});

  useEffect(() => {
    const transactionDates = formatDate(currentTransactions);
    setFormattedDates(transactionDates);
  }, []);

  // Function to fetch transactions data from the API
  const getTransactionsAPI = (month, year) => {
    // Adjusting month and year values for previous and next month
    if (month === 0) {
      month = 12;
      year--;
    }

    if (month === 13) {
      month = 1;
      year++;
    }

    // Making an API call to retrieve data for the specified month and year
    axios
      .get("../api/transactions", { params: { month, year } })
      .then((res) => {
        // Updating the state with the fetched data
        setCurrentMonth(Number(res.data.month));
        setCurrentYear(Number(res.data.year));
        setCurrentTransactions(res.data.transactions);
      });
  };

  return (
    <main className="flex flex-col p-5">
      {!indexPage && <div className="flex flex-row mb-5 space-x-5">
        <div className="flex-1 bg-nav-gray rounded-lg p-5">Checkings</div>
        <div className="flex-1 bg-nav-gray rounded-lg p-5">Savings</div>
      </div>}
      <div className="flex space-x-5 justify-center mb-5">
        {!indexPage && <button
          className="flex"
          onClick={() => getTransactionsAPI(currentMonth - 1, currentYear)}
        >
          Previous month
        </button>}
        <h1 className="flex">
          {indexPage ? text : getDateByMonthYear(currentMonth, currentYear)}
        </h1>
        {!indexPage && <button
          className="flex"
          onClick={() => getTransactionsAPI(currentMonth + 1, currentYear)}
        >
          Next month
        </button>}
      </div>
      <TransactionList
        transactions={currentTransactions}
        formattedDates={formattedDates}
        indexPage={indexPage}
      />
    </main>
  );
}

export async function getServerSideProps() {
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  const transactions = await getTransactions(1, currentMonth, currentYear);
  const indexPage = false;

  return {
    props: {
      month: currentMonth,
      year: currentYear,
      transactions: transactions,
      indexPage: indexPage
    },
  };
}