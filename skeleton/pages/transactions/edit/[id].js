import React from "react";
import { PrismaClient } from '@prisma/client'
import axios from 'axios';

import Form from "../../../components/add-edit-delete/form"
import useHook from '../../../hooks/useHook'

export default function EditTransaction({transaction, categories, accounts, sources }) {
  const {
    titleRef,
    cateRef,
    amountRef,
    accountRef,
    sourRef
  } = useHook();
  
  const transactionSource = sources.find(source => source.id === transaction.sourceId).name;
  
  function handleSubmit(event) {
    event.preventDefault();

    const inputValue = {
      id: transaction.id,
      type: transaction.type,
      title: titleRef.current.value,
      categoryId: Number(cateRef.current.value),
      amountDecimal: amountRef.current.value*100,
      accountId: Number(accountRef.current.value),
      sourceId: sourRef.current.value,
      date: new Date().toISOString()
    }

    axios.post('/api/transaction/edit', inputValue)
    .then(res => console.log('res', res))
    .catch(error => console.log(error.response));
  }
  
  return(
    <div>
      <Form onSubmit={handleSubmit} 
      titleRef={titleRef} cateRef={cateRef} amountRef={amountRef} accountRef={accountRef} sourRef={sourRef}
      type='Edit' text='Edit A Transaction' 
      transaction={transaction} categories={categories} accounts={accounts} transactionSource={transactionSource} />
    </div>
  )
}

export async function getServerSideProps(content) {
  const prisma = new PrismaClient();
  const transactionID = Number(content.params.id); //got the id here

  const transaction = await prisma.transaction.findUnique({
    where: {id: transactionID}
  })
  const categories = await prisma.category.findMany();
  const accounts = await prisma.account.findMany();
  const sources = await prisma.source.findMany();

  return {
    props: {
      transaction: {
        ...transaction,
        date: transaction.date.toISOString()
      },
      categories,
      accounts,
      sources
    }
  }
};

