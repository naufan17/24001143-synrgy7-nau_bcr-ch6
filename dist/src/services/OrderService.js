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
const uuid_1 = require("uuid");
const OrderRepository_1 = __importDefault(require("../repositories/OrderRepository"));
const CarRepository_1 = __importDefault(require("../repositories/CarRepository"));
class OrderService {
    getAllOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            const orders = yield OrderRepository_1.default.findAll();
            if (!orders) {
                return null;
            }
            const formattedOrder = orders.map((order) => ({
                id: order.id,
                duration: order.duration,
                rent_start: order.rent_start,
                rent_end: order.rent_end,
                total_price: order.total_price,
                status: order.status,
                car: {
                    manufacture: order.cars.manufacture,
                    model: order.cars.model,
                    type: order.cars.type,
                },
                user: {
                    name: order.users.name,
                    email: order.users.email,
                    address: order.users.address,
                    phone_number: order.users.phone_number,
                },
                created_at: order.created_at,
                updated_at: order.updated_at,
            }));
            return formattedOrder;
        });
    }
    getOrderByUser(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const orders = yield OrderRepository_1.default.findByUser(user_id);
            if (!orders) {
                return null;
            }
            const formattedOrder = orders.map((order) => ({
                id: order.id,
                manufacture: order.cars.manufacture,
                model: order.cars.model,
                type: order.cars.type,
                duration: order.duration,
                rent_start: order.rent_start,
                rent_end: order.rent_end,
                total_price: order.total_price,
                status: order.status,
                created_at: order.created_at,
            }));
            return formattedOrder;
        });
    }
    getOrderById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield OrderRepository_1.default.findById(id);
            if (!order) {
                return null;
            }
            const formattedOrder = {
                id: order.id,
                duration: order.duration,
                rent_start: order.rent_start,
                rent_end: order.rent_end,
                total_price: order.total_price,
                status: order.status,
                car: {
                    manufacture: order.cars.manufacture,
                    model: order.cars.model,
                    type: order.cars.type,
                },
                user: {
                    name: order.users.name,
                    email: order.users.email,
                    address: order.users.address,
                    phone_number: order.users.phone_number,
                },
                created_at: order.created_at,
                updated_at: order.updated_at,
            };
            return formattedOrder;
        });
    }
    getOrderByIdUser(id, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield OrderRepository_1.default.findByIdUser(id);
            if (!order) {
                return null;
            }
            else if (order.user_id !== user_id) {
                return null;
            }
            const formattedOrder = {
                id: order.id,
                manufacture: order.cars.manufacture,
                model: order.cars.model,
                type: order.cars.type,
                duration: order.duration,
                rent_start: order.rent_start,
                rent_end: order.rent_end,
                total_price: order.total_price,
                status: order.status,
                created_at: order.created_at
            };
            return formattedOrder;
        });
    }
    createOrder(car_id, user_id, duration) {
        return __awaiter(this, void 0, void 0, function* () {
            const car = yield CarRepository_1.default.findById(car_id);
            if (!car || !car.available) {
                return null;
            }
            const id = (0, uuid_1.v4)();
            const rent_start = new Date();
            const rent_end = new Date(rent_start.getTime() + duration * 24 * 60 * 60 * 1000);
            const total_price = car.rent_price * duration;
            return yield OrderRepository_1.default.create(id, car_id, user_id, duration, rent_start, rent_end, total_price);
        });
    }
    updateOrder(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            const updated_at = new Date();
            return yield OrderRepository_1.default.update(id, status, updated_at);
        });
    }
}
exports.default = new OrderService();
