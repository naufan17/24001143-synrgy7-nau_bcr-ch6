"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImageCar = void 0;
const multer_1 = __importDefault(require("multer"));
exports.uploadImageCar = (0, multer_1.default)({
    dest: 'public/images/car'
});
