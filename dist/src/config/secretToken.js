"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.secret_token = void 0;
const crypto_1 = __importDefault(require("crypto"));
const token = crypto_1.default.randomBytes(64).toString('hex');
exports.secret_token = token || process.env.SECRET_TOKEN || 'secret';
