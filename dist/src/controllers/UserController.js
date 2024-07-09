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
const UserService_1 = __importDefault(require("../services/UserService"));
class UserController extends Controller_1.default {
    constructor() {
        super(...arguments);
        this.currentUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = req.user;
            if (!user) {
                return this.handleUnauthorized(res);
            }
            this.handleSuccess(res, user);
        });
        this.loginUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                const token = yield UserService_1.default.loginUser(email, password);
                if (!token) {
                    return this.handleNotFound(res, 'Email and password not valid');
                }
                this.handleSuccess(res, { token });
            }
            catch (err) {
                this.handleError(res, err, 'Failed to login user');
            }
        });
        this.registerUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { name, email, address, phone_number, password } = req.body;
            try {
                const user = yield UserService_1.default.registerUser(name, email, address, phone_number, password);
                if (!user) {
                    return this.handleNotFound(res, 'User already registered');
                }
                this.handleCreated(res, 'User created successfully');
            }
            catch (err) {
                this.handleError(res, err, 'Failed to register user');
            }
        });
    }
}
exports.default = new UserController();
