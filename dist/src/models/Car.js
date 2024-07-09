"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const objection_1 = require("objection");
const Option_1 = __importDefault(require("./Option"));
const Spec_1 = __importDefault(require("./Spec"));
const Admin_1 = __importDefault(require("./Admin"));
class Car extends objection_1.Model {
    static get tableName() {
        return 'cars';
    }
    static get relationMappings() {
        return {
            options: {
                relation: objection_1.Model.HasManyRelation,
                modelClass: Option_1.default,
                join: {
                    from: 'cars.id',
                    to: 'options.car_id'
                }
            },
            specs: {
                relation: objection_1.Model.HasManyRelation,
                modelClass: Spec_1.default,
                join: {
                    from: 'cars.id',
                    to: 'specs.car_id'
                }
            },
            createdByAdmin: {
                relation: objection_1.Model.BelongsToOneRelation,
                modelClass: Admin_1.default,
                join: {
                    from: 'cars.created_by',
                    to: 'admins.id'
                }
            },
            updatedByAdmin: {
                relation: objection_1.Model.BelongsToOneRelation,
                modelClass: Admin_1.default,
                join: {
                    from: 'cars.updated_by',
                    to: 'admins.id'
                }
            },
            deletedByAdmin: {
                relation: objection_1.Model.BelongsToOneRelation,
                modelClass: Admin_1.default,
                join: {
                    from: 'cars.deleted_by',
                    to: 'admins.id'
                }
            },
        };
    }
}
exports.default = Car;
