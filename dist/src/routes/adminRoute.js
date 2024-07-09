"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AdminController_1 = __importDefault(require("../controllers/AdminController"));
const AuthenticateMiddleware_1 = __importDefault(require("../middleware/AuthenticateMiddleware"));
const AuthorizationMiddleware_1 = __importDefault(require("../middleware/AuthorizationMiddleware"));
const router = express_1.default.Router();
router.get('/admin', AuthenticateMiddleware_1.default.authenticate, AuthorizationMiddleware_1.default.authorizeAdmin, AdminController_1.default.currentAdmin);
router.post('/admin/register', AuthenticateMiddleware_1.default.authenticate, AuthorizationMiddleware_1.default.authorizeSuperAdmin, AdminController_1.default.registerAdmin);
router.post('/admin/login', AdminController_1.default.loginAdmin);
router.get('/admin/user', AuthenticateMiddleware_1.default.authenticate, AuthorizationMiddleware_1.default.authorizeAdmin, AdminController_1.default.getUser);
router.get('/admin/admin', AuthenticateMiddleware_1.default.authenticate, AuthorizationMiddleware_1.default.authorizeSuperAdmin, AdminController_1.default.getAdmin);
exports.default = router;
