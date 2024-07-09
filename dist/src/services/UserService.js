"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const UserRepository_1 = __importDefault(require("../repositories/UserRepository"));
const jwt_1 = require("../utils/jwt");
class UserService {
    loginUser(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield UserRepository_1.default.findByEmail(email);
            if (!user) {
                return null;
            }
            const validPassword = yield bcryptjs_1.default.compare(password, user.password);
            if (!validPassword) {
                return null;
            }
            const token = (0, jwt_1.generateToken)({
                id: user.id,
                email: user.email
            });
            return token;
        });
    }
    registerUser(name, email, address, phone_number, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = (0, uuid_1.v4)();
            const user = yield UserRepository_1.default.findByEmail(email);
            if (user) {
                return null;
            }
            password = yield bcryptjs_1.default.hash(password, 10);
            return yield UserRepository_1.default.create(id, name, email, address, phone_number, password);
        });
    }
}
exports.default = new UserService();
