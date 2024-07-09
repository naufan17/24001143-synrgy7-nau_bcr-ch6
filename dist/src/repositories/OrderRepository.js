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
const objection_1 = require("objection");
const Order_1 = __importDefault(require("../models/Order"));
const Car_1 = __importDefault(require("../models/Car"));
class OrderRepository {
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Order_1.default.query().withGraphFetched('[cars, users]');
        });
    }
    findByUser(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Order_1.default.query().where('user_id', user_id).withGraphFetched('[cars]');
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Order_1.default.query().findById(id).withGraphFetched('[cars, users]');
        });
    }
    findByIdUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Order_1.default.query().findById(id).withGraphFetched('[cars]');
        });
    }
    create(id, car_id, user_id, duration, rent_start, rent_end, total_price) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, objection_1.transaction)(Order_1.default.knex(), (trx) => __awaiter(this, void 0, void 0, function* () {
                yield Order_1.default.query(trx).insert({
                    id,
                    car_id,
                    user_id,
                    duration,
                    rent_start,
                    rent_end,
                    total_price,
                    status: "Rented"
                });
                yield Car_1.default.query(trx).findById(car_id).update({
                    available: false
                });
            }));
        });
    }
    update(id, status, updated_at) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, objection_1.transaction)(Order_1.default.knex(), (trx) => __awaiter(this, void 0, void 0, function* () {
                const order = yield Order_1.default.query(trx).findById(id);
                if (order) {
                    yield Order_1.default.query(trx).findById(id).update({
                        id,
                        status,
                        updated_at
                    });
                    yield Car_1.default.query(trx).findById(order.car_id).update({
                        available: true
                    });
                }
            }));
        });
    }
}
exports.default = new OrderRepository();
