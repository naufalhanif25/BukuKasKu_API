// controllers/transactionController.js
const Transaction = require("../models/Transaction");

exports.getSummary = async (req, res) => {
    try {
        const results = await Transaction.aggregate([
            { $match: { user: req.user._id } },
            {
                $group: {
                    _id: "$type",
                    total: { $sum: "$amount" },
                },
            },
        ]);

        const summary = {
            income: results.find((r) => r._id === "income")?.total || 0,
            expense: results.find((r) => r._id === "expense")?.total || 0,
        };
        summary.balance = summary.income - summary.expense;

        res.json(summary);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.createTransaction = async (req, res) => {
    try {
        const transaction = new Transaction({
            ...req.body,
            user: req.user._id,
        });
        await transaction.save();
        res.status(201).json(transaction);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getTransactions = async (req, res) => {
    try {
        const { type, category, startDate, endDate } = req.query;
        const filter = { user: req.user._id };

        if (type) filter.type = type;
        if (category) filter.category = category;
        if (startDate && endDate) {
            filter.date = {
                $gte: new Date(startDate),
                $lte: new Date(endDate),
            };
        }

        const transactions = await Transaction.find(filter).sort("-date");
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.getTransactionById = async (req, res) => {
    try {
        const transaction = await Transaction.findOne({
            _id: req.params.id,
            user: req.user._id,
        });

        if (!transaction) {
            return res
                .status(404)
                .json({ message: "Transaksi tidak ditemukan" });
        }

        res.json(transaction);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.updateTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findOne({
            _id: req.params.id,
            user: req.user._id, // Pastikan user pemilik transaksi
        });

        if (!transaction) {
            return res
                .status(404)
                .json({ message: "Transaksi tidak ditemukan" });
        }

        Object.assign(transaction, req.body);
        await transaction.save();
        res.json(transaction);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findOneAndDelete({
            _id: req.params.id,
            user: req.user._id,
        });

        if (!transaction) {
            return res
                .status(404)
                .json({ message: "Transaksi tidak ditemukan" });
        }

        res.json({ message: "Transaksi dihapus" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
