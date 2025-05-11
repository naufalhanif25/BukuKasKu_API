const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transactionController");
const authMiddleware = require("../middlewares/auth");
const validateTransaction = require("../middlewares/transaction");

// Proteksi semua endpoint dengan middleware autentikasi
router.use(authMiddleware);

// Definisi endpoint
router.get("/summary", transactionController.getSummary);
router.get("/", transactionController.getTransactions);
router.post("/", validateTransaction, transactionController.createTransaction);
router.get("/:id", transactionController.getTransactionById);
router.put("/:id", validateTransaction, transactionController.updateTransaction);
router.delete("/:id", transactionController.deleteTransaction);

module.exports = router;