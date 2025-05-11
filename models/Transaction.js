const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    amount: {
        type: Number,
        required: [true, "Jumlah transaksi harus diisi"],
        min: [0, "Jumlah tidak boleh negatif"],
    },
    type: {
        type: String,
        enum: ["income", "expense"],
        required: [true, "Tipe transaksi harus diisi"],
    },
    category: {
        type: String,
        enum: [
            "Makanan",
            "Transportasi",
            "Belanja",
            "Hiburan",
            "Gaji",
            "Lainnya",
        ]
    },
    date: {
        type: Date,
        default: Date.now,
    },
    description: {
        type: String,
        maxlength: [200, "Deskripsi maksimal 200 karakter"],
    },
});

module.exports = mongoose.model("Transaction", transactionSchema);
