"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Middleware_1 = __importDefault(require("./Middleware"));
class AuthorizationMiddleware extends Middleware_1.default {
    constructor() {
        super(...arguments);
        this.authorizeAdmin = (req, res, next) => {
            const admin = req.admin;
            if (admin && (admin.super_admin === true || admin.super_admin === false)) {
                next();
            }
            else {
                return this.handleUnauthorized(res);
            }
        };
        this.authorizeSuperAdmin = (req, res, next) => {
            const admin = req.admin;
            if (admin && admin.super_admin === true) {
                next();
            }
            else {
                return this.handleUnauthorized(res);
            }
        };
        this.authorizeUser = (req, res, next) => {
            const user = req.user;
            if (user) {
                next();
            }
            else {
                return this.handleUnauthorized(res);
            }
        };
    }
}
exports.default = new AuthorizationMiddleware();
