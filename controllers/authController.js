const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) throw new Error("Invalid credentials");

        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) throw new Error("Invalid credentials");

        const token = await user.generateAuthToken();
        res.send({ user, token });
    } catch (error) {
        res.status(401).send(error.message);
    }
};

exports.logout = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(
            (token) => token.token !== req.token
        );
        await req.user.save();
        res.send();
    } catch (error) {
        res.status(500).send();
    }
};
