const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    tokens: [
        {
            token: {
                type: String,
                required: true,
            },
        },
    ],
});

// Hash password sebelum menyimpan
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 8);
    }

    next();
});

// Generate JWT
userSchema.methods.generateAuthToken = async function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
    this.tokens = this.tokens.concat({ token });

    await this.save();
    return token;
};

// Hapus token saat logout
userSchema.methods.removeToken = async function (token) {
    this.tokens = this.tokens.filter((t) => t.token !== token);

    await this.save();
};

module.exports = mongoose.model("User", userSchema);
