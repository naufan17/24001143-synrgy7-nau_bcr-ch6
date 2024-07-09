"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretToken_1 = require("../config/secretToken");
const generateToken = (payload) => {
    const options = { expiresIn: '24h' };
    return jsonwebtoken_1.default.sign(payload, secretToken_1.secret_token, options);
};
exports.generateToken = generateToken;
const verifyToken = (token) => {
    const options = {};
    return jsonwebtoken_1.default.verify(token, secretToken_1.secret_token, options);
};
exports.verifyToken = verifyToken;
