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
const OrderService_1 = __importDefault(require("../services/OrderService"));
class OrderController extends Controller_1.default {
    constructor() {
        super(...arguments);
        this.getOrder = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = req.user;
            const admin = req.admin;
            let orders;
            try {
                if (user) {
                    orders = yield OrderService_1.default.getOrderByUser(user.id);
                }
                else if (admin) {
                    orders = yield OrderService_1.default.getAllOrders();
                }
                if (!orders || orders.length === 0) {
                    return this.handleNotFound(res, 'Order not found');
                }
                this.handleSuccess(res, { orders });
            }
            catch (err) {
                this.handleError(res, err, 'Failed to fetch order');
            }
        });
        this.getOrderById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const user = req.user;
            const admin = req.admin;
            let order;
            try {
                if (user) {
                    order = yield OrderService_1.default.getOrderByIdUser(id, user.id);
                }
                else if (admin) {
                    order = yield OrderService_1.default.getOrderById(id);
                }
                if (!order) {
                    return this.handleNotFound(res, 'Order not found');
                }
                this.handleSuccess(res, order);
            }
            catch (err) {
                this.handleError(res, err, 'Failed to fetch order');
            }
        });
        this.createOrder = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { car_id, duration } = req.body;
            const user = req.user;
            try {
                if (user) {
                    const user_id = user.id;
                    const order = yield OrderService_1.default.createOrder(car_id, user_id, duration);
                    if (!order) {
                        return this.handleNotFound(res, 'Car not available');
                    }
                }
                this.handleCreated(res, 'Order created successfully');
            }
            catch (err) {
                this.handleError(res, err, 'Failed to create order');
            }
        });
        this.updateOrder = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const { status } = req.body;
            try {
                yield OrderService_1.default.updateOrder(id, status);
                this.handleCreated(res, 'Order updated successfully');
            }
            catch (err) {
                this.handleError(res, err, 'Failed to update order');
            }
        });
    }
}
exports.default = new OrderController();
