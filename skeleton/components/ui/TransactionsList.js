import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  categoryIcons,
  formatDate,
  formatTransaction,
} from "../../helpers/formatters.js";
import { faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";

export default function TransactionList({ transactions }) {
  return (
    <>
      <div className="p-5 bg-mid-gray rounded-lg flex flex-col">
        <h1>Transactions</h1>
        {transactions.map(({ date, transactions }) => {
          return (
            <div className="mt-5 flex flex-col" key={date + transactions[0].id}>
              <span className="text-sm">{formatDate(date)}</span>
              {transactions.map((transaction) => {
                return (
                  <div key={transaction.id} className="flex mt-5">
                    <div className="flex items-center w-16">
                      <FontAwesomeIcon
                        icon={categoryIcons(transaction.category.name)}
                        size="3x"
                      />
                    </div>
                    <div className="flex flex-col ms-5 flex-1 justify-center">
                      <div className="flex font-semibold text-xl">
                        {transaction.title}
                      </div>
                      <div className="flex text-sm">{transaction.date}</div>
                    </div>
                    <div className="flex items-center font-bold text-xl">
                      {formatTransaction(
                        transaction.type,
                        transaction.amountDecimal
                      )}
                    </div>
                    <div className="flex items-center ps-3 ms-3">
                      <FontAwesomeIcon icon={faPen} />
                    </div>
                    <div className="flex items-center ps-3">
                      <FontAwesomeIcon icon={faTrashCan} />
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
}
