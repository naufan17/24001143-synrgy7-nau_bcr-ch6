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
const Controller_1 = __importDefault(require("./Controller"));
const jwt_1 = require("../utils/jwt");
class AuthController extends Controller_1.default {
    constructor() {
        super(...arguments);
        this.validateToken = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
            if (!token) {
                return this.handleUnauthorized(res);
            }
            try {
                const decoded = (0, jwt_1.verifyToken)(token);
                this.handleSuccess(res, { admin: decoded }, "Token is valid");
            }
            catch (err) {
                this.handleForbidden(res, 'Invalid token');
            }
        });
    }
}
exports.default = new AuthController();
