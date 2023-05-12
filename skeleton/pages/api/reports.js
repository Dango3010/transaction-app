// Importing necessary functions from the 'selectors' module
import { getCategoriesData, getRunningTotalData } from "@/helpers/selectors";

// Defining an asynchronous function called 'handler' with 'req' and 'res' as parameters
export default async function handler(req, res) {
  // Setting a constant variable 'userId' to 1
  const userId = 1;
  // Extracting the 'month' and 'year' values from the 'req.query' object
  const reqMonth = req.query.month;
  const reqYear = req.query.year;

  // Calling the 'getCategoriesData' function with the provided parameters and storing the returned data in variables
  const {
    month,
    year,
    categories,
    categoriesPercentages,
    percentagePerCategory,
  } = await getCategoriesData(userId, reqMonth, reqYear);

  // Calling the 'getRunningTotalData' function with the provided parameters and storing the returned data in variables
  const { dates, incomes, expenses, runningTotal } = await getRunningTotalData(
    userId,
    reqMonth,
    reqYear
  );

  // Sending the response as a JSON string containing the retrieved data
  res.send(
    JSON.stringify({
      month,
      year,
      categories,
      categoriesPercentages,
      percentagePerCategory,
      dates,
      incomes,
      expenses,
      runningTotal,
    })
  );
}