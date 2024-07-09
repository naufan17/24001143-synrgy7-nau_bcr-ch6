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
const User_1 = __importDefault(require("../models/User"));
class UserRepository {
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User_1.default.query();
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User_1.default.query().findOne({ email });
        });
    }
    create(id, name, email, address, phone_number, password) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, objection_1.transaction)(User_1.default.knex(), (trx) => __awaiter(this, void 0, void 0, function* () {
                yield User_1.default.query(trx).insert({
                    id,
                    name,
                    email,
                    address,
                    phone_number,
                    password: password
                });
            }));
        });
    }
}
exports.default = new UserRepository();
