const { body } = require("express-validator");

const validateTransaction = [
    body("amount")
        .isFloat({ min: 0 })
        .withMessage("Jumlah harus angka positif"),
    body("type").isIn(["income", "expense"]).withMessage("Tipe tidak valid"),
    body("category")
        .isIn([
            "Makanan",
            "Transportasi",
            "Belanja",
            "Hiburan",
            "Gaji",
            "Lainnya",
        ])
        .withMessage("Kategori tidak valid"),
    body("description").optional().trim().escape().isLength({ max: 200 }),
];

module.exports = validateTransaction;
