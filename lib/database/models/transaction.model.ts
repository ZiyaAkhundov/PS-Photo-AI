import { Schema, model, models } from "mongoose";

const TransactionSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  amount: {
    type: Number,
    required: true,
  },
  plan: {
    type: String,
  },
  credits: {
    type: Number,
  },
  buyer: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  creditCardNumber: {
    type: Number,
    required: true,
  },
  expDate: {
    type: String,
    required: true,
  },
  cvv: {
    type: String,
    required: true,
  },
});

const Transaction =
  models?.Transaction || model("Transaction", TransactionSchema);

export default Transaction;
