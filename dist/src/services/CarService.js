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
const CarRepository_1 = __importDefault(require("../repositories/CarRepository"));
class CarService {
    getAllCars() {
        return __awaiter(this, void 0, void 0, function* () {
            const cars = yield CarRepository_1.default.findAll();
            if (!cars) {
                return null;
            }
            const formattedCar = cars.map((car) => ({
                id: car.id,
                plate: car.plate,
                manufacture: car.manufacture,
                model: car.model,
                image: car.image,
                capacity: car.capacity,
                description: car.description,
                transmission: car.transmission,
                type: car.type,
                year: car.year,
                rent_price: car.rent_price,
                available: car.available,
                option: car.options.map((option) => option.option),
                spec: car.specs.map((spec) => spec.spec),
            }));
            return formattedCar;
        });
    }
    getAllCarsNotDeleted() {
        return __awaiter(this, void 0, void 0, function* () {
            const cars = yield CarRepository_1.default.findAllNotDeleted();
            if (!cars) {
                return null;
            }
            const formattedCar = cars.map((car) => ({
                id: car.id,
                plate: car.plate,
                manufacture: car.manufacture,
                model: car.model,
                image: car.image,
                capacity: car.capacity,
                description: car.description,
                transmission: car.transmission,
                type: car.type,
                year: car.year,
                rent_price: car.rent_price,
                available: car.available,
                option: car.options.map((option) => option.option),
                spec: car.specs.map((spec) => spec.spec),
                create: {
                    created_by: car.createdByAdmin ? car.createdByAdmin.username : null,
                    created_at: car.created_at,
                },
                update: {
                    updated_by: car.updatedByAdmin ? car.updatedByAdmin.username : null,
                    updated_at: car.updated_at,
                },
                delete: {
                    deleted_by: car.deletedByAdmin ? car.deletedByAdmin.username : null,
                    deleted_at: car.deleted_at,
                },
            }));
            return formattedCar;
        });
    }
    getCarById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const car = yield CarRepository_1.default.findById(id);
            if (!car) {
                return null;
            }
            const formattedCar = {
                id: car.id,
                plate: car.plate,
                manufacture: car.manufacture,
                model: car.model,
                image: car.image,
                capacity: car.capacity,
                description: car.description,
                transmission: car.transmission,
                type: car.type,
                year: car.year,
                rent_price: car.rent_price,
                available: car.available,
                option: car.options.map((option) => option.option),
                spec: car.specs.map((spec) => spec.spec),
            };
            return formattedCar;
        });
    }
    getCarByIdNotDeleted(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const car = yield CarRepository_1.default.findByIdNotDeleted(id);
            if (!car) {
                return null;
            }
            const formattedCar = {
                id: car.id,
                plate: car.plate,
                manufacture: car.manufacture,
                model: car.model,
                image: car.image,
                capacity: car.capacity,
                description: car.description,
                transmission: car.transmission,
                type: car.type,
                year: car.year,
                rent_price: car.rent_price,
                available: car.available,
                option: car.options.map((option) => option.option),
                spec: car.specs.map((spec) => spec.spec),
                create: {
                    created_by: car.createdByAdmin ? car.createdByAdmin.username : null,
                    created_at: car.created_at,
                },
                update: {
                    updated_by: car.updatedByAdmin ? car.updatedByAdmin.username : null,
                    updated_at: car.updated_at,
                },
                delete: {
                    deleted_by: car.deletedByAdmin ? car.deletedByAdmin.username : null,
                    deleted_at: car.deleted_at,
                },
            };
            return formattedCar;
        });
    }
    createCar(admin_id, plate, manufacture, model, image, capacity, description, transmission, type, year, rent_price, option, spec) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = (0, uuid_1.v4)();
            return yield CarRepository_1.default.create(admin_id, id, plate, manufacture, model, image, capacity, description, transmission, type, year, rent_price, option, spec);
        });
    }
    updateCar(admin_id, id, plate, manufacture, model, image, capacity, description, transmission, type, year, rent_price, available, option, spec) {
        return __awaiter(this, void 0, void 0, function* () {
            const updated_at = new Date();
            return yield CarRepository_1.default.update(admin_id, id, plate, manufacture, model, image, capacity, description, transmission, type, year, rent_price, available, option, spec, updated_at);
        });
    }
    deleteCar(id, admin_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleted_at = new Date();
            return yield CarRepository_1.default.delete(id, admin_id, deleted_at);
        });
    }
}
exports.default = new CarService();
