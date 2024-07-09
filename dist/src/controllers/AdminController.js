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
const AdminService_1 = __importDefault(require("../services/AdminService"));
class AdminController extends Controller_1.default {
    constructor() {
        super(...arguments);
        this.currentAdmin = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const admin = req.admin;
            if (!admin) {
                return this.handleUnauthorized(res);
            }
            this.handleSuccess(res, admin);
        });
        this.getAdmin = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const admins = yield AdminService_1.default.getAllAdmin();
                if (!admins || admins.length === 0) {
                    return this.handleNotFound(res, 'Admin not found');
                }
                this.handleSuccess(res, { admins: admins });
            }
            catch (err) {
                this.handleError(res, err, 'Failed to fetch admin');
            }
        });
        this.getUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield AdminService_1.default.getAllUser();
                if (!users || users.length === 0) {
                    return this.handleNotFound(res, 'User not found');
                }
                this.handleSuccess(res, { users: users });
            }
            catch (err) {
                this.handleError(res, err, 'Failed to fetch user');
            }
        });
        this.loginAdmin = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { username, password } = req.body;
            try {
                const token = yield AdminService_1.default.loginAdmin(username, password);
                if (!token) {
                    return this.handleNotFound(res, 'Username and password not valid');
                }
                this.handleSuccess(res, { token });
            }
            catch (err) {
                this.handleError(res, err, 'Failed to login admin');
            }
        });
        this.registerAdmin = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { username, password } = req.body;
            try {
                const admin = yield AdminService_1.default.registerAdmin(username, password);
                if (!admin) {
                    return this.handleNotFound(res, 'Admin already registered');
                }
                this.handleCreated(res, 'Admin created successfully');
            }
            catch (err) {
                this.handleError(res, err, 'Failed to register admin');
            }
        });
    }
}
exports.default = new AdminController();
