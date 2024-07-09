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
const Car_1 = __importDefault(require("../models/Car"));
const Spec_1 = __importDefault(require("../models/Spec"));
const Option_1 = __importDefault(require("../models/Option"));
class CarRepository {
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Car_1.default.query().whereNull('deleted_at').withGraphFetched('[options, specs]');
        });
    }
    findAllNotDeleted() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Car_1.default.query().withGraphFetched('[options, specs]');
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Car_1.default.query().findById(id).whereNull('deleted_at').withGraphFetched('[options, specs]');
        });
    }
    findByIdNotDeleted(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Car_1.default.query().findById(id).withGraphFetched('[options, specs]');
        });
    }
    create(admin_id, id, plate, manufacture, model, image, capacity, description, transmission, type, year, rent_price, option, spec) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, objection_1.transaction)(Car_1.default.knex(), (trx) => __awaiter(this, void 0, void 0, function* () {
                yield Car_1.default.query(trx).insert({
                    id: id,
                    plate,
                    manufacture,
                    model,
                    image,
                    capacity,
                    description,
                    transmission,
                    type,
                    year,
                    rent_price,
                    created_by: admin_id
                });
                const optionsArray = Array.isArray(option) ? option : [option];
                const specsArray = Array.isArray(spec) ? spec : [spec];
                yield Promise.all([
                    ...optionsArray.map((opt) => Option_1.default.query(trx).insert({ car_id: id, option: opt })),
                    ...specsArray.map((sp) => Spec_1.default.query(trx).insert({ car_id: id, spec: sp }))
                ]);
            }));
        });
    }
    update(admin_id, id, plate, manufacture, model, image, capacity, description, transmission, type, year, rent_price, available, option, spec, updated_at) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, objection_1.transaction)(Car_1.default.knex(), (trx) => __awaiter(this, void 0, void 0, function* () {
                yield Car_1.default.query(trx).findById(id).update({
                    plate,
                    manufacture,
                    model,
                    image,
                    capacity,
                    description,
                    transmission,
                    type,
                    year,
                    rent_price,
                    available,
                    updated_by: admin_id,
                    updated_at
                });
                const optionsArray = Array.isArray(option) ? option : [option];
                const specsArray = Array.isArray(spec) ? spec : [spec];
                if (optionsArray.length > 0 && optionsArray[0]) {
                    yield Option_1.default.query(trx).where('car_id', id).delete();
                    yield Promise.all([
                        ...optionsArray.map((opt) => Option_1.default.query(trx).insert({ car_id: id, option: opt })),
                    ]);
                }
                if (specsArray.length > 0 && specsArray[0]) {
                    yield Spec_1.default.query(trx).where('car_id', id).delete();
                    yield Promise.all([
                        ...specsArray.map((sp) => Spec_1.default.query(trx).insert({ car_id: id, spec: sp }))
                    ]);
                }
            }));
        });
    }
    delete(id, admin_id, deleted_at) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, objection_1.transaction)(Car_1.default.knex(), (trx) => __awaiter(this, void 0, void 0, function* () {
                yield Car_1.default.query(trx).findById(id).update({
                    deleted_by: admin_id,
                    deleted_at
                });
            }));
        });
    }
}
exports.default = new CarRepository();
