"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = __importDefault(require("../controllers/UserController"));
const AuthenticateMiddleware_1 = __importDefault(require("../middleware/AuthenticateMiddleware"));
const router = express_1.default.Router();
router.get('/user', AuthenticateMiddleware_1.default.authenticate, UserController_1.default.currentUser);
router.post('/user/register', UserController_1.default.registerUser);
router.post('/user/login', UserController_1.default.loginUser);
exports.default = router;
