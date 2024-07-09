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
exports.seed = seed;
const uuid_1 = require("uuid");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
function seed(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        yield knex("admins").del();
        const id_1 = (0, uuid_1.v4)();
        const id_2 = (0, uuid_1.v4)();
        const id_3 = (0, uuid_1.v4)();
        const id_4 = (0, uuid_1.v4)();
        yield knex("admins").insert([
            {
                "id": id_1,
                "username": "Super Admin 1",
                "super_admin": true,
                "password": yield bcryptjs_1.default.hash('passwordsuperadmin', 10),
            },
            {
                "id": id_2,
                "username": "Super Admin 2",
                "super_admin": true,
                "password": yield bcryptjs_1.default.hash('passwordsuperadmin', 10),
            },
            {
                "id": id_3,
                "username": "Admin 1",
                "password": yield bcryptjs_1.default.hash('passwordadmin', 10),
            },
            {
                "id": id_4,
                "username": "Admin 2",
                "password": yield bcryptjs_1.default.hash('passwordadmin', 10),
            },
        ]);
    });
}
;
