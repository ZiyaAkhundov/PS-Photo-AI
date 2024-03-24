"use server";

import { handleError } from "../utils";
import { connectDatabase } from "../database/mongoose";
import Transaction from "../database/models/transaction.model";
import { updateCredits } from "./user.actions";

export async function createTransaction(transaction: CreateTransactionParams) {
  try {
    await connectDatabase();

    const newTransaction = await Transaction.create({
      ...transaction,
      buyer: transaction.buyerId,
    });

    await updateCredits(transaction.buyerId, transaction.credits);

    return JSON.parse(JSON.stringify({ ...newTransaction, success: true }));
  } catch (error) {
    handleError(error);
  }
}
