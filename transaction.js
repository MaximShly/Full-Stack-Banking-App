const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  email: { type: String, required: true },
  type: { type: String, enum: ['deposit', 'withdraw'], required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

const Transaction = mongoose.model('Transaction', transactionSchema);
exports.Transaction = Transaction;
