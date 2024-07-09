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
const objection_1 = require("objection");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const Admin_1 = __importDefault(require("../models/Admin"));
class AdminRepository {
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Admin_1.default.query();
        });
    }
    findByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Admin_1.default.query().findOne({ username });
        });
    }
    create(id, username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, objection_1.transaction)(Admin_1.default.knex(), (trx) => __awaiter(this, void 0, void 0, function* () {
                yield Admin_1.default.query(trx).insert({
                    id,
                    username,
                    password: yield bcryptjs_1.default.hash(password, 10),
                });
            }));
        });
    }
}
exports.default = new AdminRepository();
