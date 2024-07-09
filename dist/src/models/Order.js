"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const objection_1 = require("objection");
const Car_1 = __importDefault(require("./Car"));
const User_1 = __importDefault(require("./User"));
class Order extends objection_1.Model {
    static get tableName() {
        return 'orders';
    }
    static get relationMappings() {
        return {
            cars: {
                relation: objection_1.Model.HasOneRelation,
                modelClass: Car_1.default,
                join: {
                    from: 'orders.car_id',
                    to: 'cars.id'
                }
            },
            users: {
                relation: objection_1.Model.HasOneRelation,
                modelClass: User_1.default,
                join: {
                    from: 'orders.user_id',
                    to: 'users.id'
                }
            }
        };
    }
}
exports.default = Order;
