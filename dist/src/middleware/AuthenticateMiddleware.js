"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Middleware_1 = __importDefault(require("./Middleware"));
const jwt_1 = require("../utils/jwt");
class AuthenticateMiddleware extends Middleware_1.default {
    constructor() {
        super(...arguments);
        this.authenticate = (req, res, next) => {
            var _a;
            const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
            if (!token) {
                return this.handleUnauthorized(res);
            }
            try {
                const decoded = (0, jwt_1.verifyToken)(token);
                if ('super_admin' in decoded) {
                    req.admin = decoded;
                    next();
                }
                else {
                    req.user = decoded;
                    next();
                }
            }
            catch (err) {
                this.handleForbidden(res, 'Invalid token');
            }
        };
        this.passAuthenticateUser = (req, res, next) => {
            var _a;
            const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
            if (!token) {
                return next();
            }
            try {
                const decoded = (0, jwt_1.verifyToken)(token);
                req.user = decoded;
                next();
            }
            catch (err) {
                this.handleForbidden(res, 'Invalid token');
            }
        };
        this.passAuthenticateAdmin = (req, res, next) => {
            var _a;
            const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
            if (!token) {
                return next();
            }
            try {
                const decoded = (0, jwt_1.verifyToken)(token);
                if (decoded.super_admin !== undefined) {
                    req.admin = decoded;
                    return next();
                }
                next();
            }
            catch (err) {
                this.handleForbidden(res, 'Invalid token');
            }
        };
    }
}
exports.default = new AuthenticateMiddleware();
