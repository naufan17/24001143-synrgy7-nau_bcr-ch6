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
const AdminRepository_1 = __importDefault(require("../repositories/AdminRepository"));
const UserRepository_1 = __importDefault(require("../repositories/UserRepository"));
const jwt_1 = require("../utils/jwt");
class AdminService {
    getAllAdmin() {
        return __awaiter(this, void 0, void 0, function* () {
            const admins = yield AdminRepository_1.default.findAll();
            if (!admins) {
                return null;
            }
            const formattedAdmin = admins.map((admin) => ({
                id: admin.id,
                username: admin.username,
                super_admin: admin.super_admin,
                created_at: admin.created_at,
                updated_at: admin.updated_at,
            }));
            return formattedAdmin;
        });
    }
    getAllUser() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield UserRepository_1.default.findAll();
            if (!users) {
                return null;
            }
            const formattedUser = users.map((user) => ({
                id: user.id,
                name: user.name,
                email: user.email,
                address: user.address,
                phone_number: user.phone_number,
                created_at: user.created_at,
                updated_at: user.updated_at,
            }));
            return formattedUser;
        });
    }
    loginAdmin(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const admin = yield AdminRepository_1.default.findByUsername(username);
            if (!admin) {
                return null;
            }
            const validPassword = yield bcryptjs_1.default.compare(password, admin.password);
            if (!validPassword) {
                return null;
            }
            const token = (0, jwt_1.generateToken)({
                id: admin.id,
                username: admin.username,
                super_admin: admin.super_admin
            });
            return token;
        });
    }
    registerAdmin(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = (0, uuid_1.v4)();
            const admin = yield AdminRepository_1.default.findByUsername(username);
            if (admin) {
                return null;
            }
            password = yield bcryptjs_1.default.hash(password, 10);
            return yield AdminRepository_1.default.create(id, username, password);
        });
    }
}
exports.default = new AdminService();
