"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const OrderController_1 = __importDefault(require("../controllers/OrderController"));
const AuthenticateMiddleware_1 = __importDefault(require("../middleware/AuthenticateMiddleware"));
const AuthorizationMiddleware_1 = __importDefault(require("../middleware/AuthorizationMiddleware"));
const router = express_1.default.Router();
router.get('/order', AuthenticateMiddleware_1.default.authenticate, OrderController_1.default.getOrder);
router.get('/order/:id', AuthenticateMiddleware_1.default.authenticate, OrderController_1.default.getOrderById);
router.post('/order', AuthenticateMiddleware_1.default.authenticate, AuthorizationMiddleware_1.default.authorizeUser, OrderController_1.default.createOrder);
router.put('/order/:id', AuthenticateMiddleware_1.default.authenticate, AuthorizationMiddleware_1.default.authorizeAdmin, OrderController_1.default.updateOrder);
exports.default = router;
