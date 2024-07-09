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
        yield knex("users").del();
        yield knex("users").insert([
            {
                "id": (0, uuid_1.v4)(),
                "name": "Andi",
                "email": "andi@gmail.com",
                "address": "Andi House",
                "phone_number": "089623723481",
                "password": yield bcryptjs_1.default.hash('passworduser', 10),
            },
            {
                "id": (0, uuid_1.v4)(),
                "name": "Budi",
                "email": "budi@gmail.com",
                "address": "Budi House",
                "phone_number": "089278345671",
                "password": yield bcryptjs_1.default.hash('passworduser', 10),
            },
            {
                "id": (0, uuid_1.v4)(),
                "name": "Abi",
                "email": "abi@gmail.com",
                "address": "Abi House",
                "phone_number": "087696433672",
                "password": yield bcryptjs_1.default.hash('passworduser', 10),
            },
            {
                "id": (0, uuid_1.v4)(),
                "name": "Umi",
                "email": "umi@gmail.com",
                "address": "Umi House",
                "phone_number": "089256783452",
                "password": yield bcryptjs_1.default.hash('passworduser', 10),
            },
            {
                "id": (0, uuid_1.v4)(),
                "name": "Dono",
                "email": "dono@gmail.com",
                "address": "Dono House",
                "phone_number": "089762343491",
                "password": yield bcryptjs_1.default.hash('passworduser', 10),
            },
        ]);
    });
}
;
