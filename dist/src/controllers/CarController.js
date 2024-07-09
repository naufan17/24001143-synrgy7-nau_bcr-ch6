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
const CarService_1 = __importDefault(require("../services/CarService"));
class CarController extends Controller_1.default {
    constructor() {
        super(...arguments);
        this.getCar = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const admin = req.admin;
            let cars;
            try {
                if (admin) {
                    cars = yield CarService_1.default.getAllCarsNotDeleted();
                }
                else {
                    cars = yield CarService_1.default.getAllCars();
                }
                if (!cars || cars.length === 0) {
                    return this.handleNotFound(res, 'Car not found');
                }
                this.handleSuccess(res, { cars: cars });
            }
            catch (err) {
                this.handleError(res, err, 'Failed to fetch car');
            }
        });
        this.getCarById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const admin = req.admin;
            let car;
            try {
                if (admin) {
                    car = yield CarService_1.default.getCarByIdNotDeleted(id);
                }
                else {
                    car = yield CarService_1.default.getCarById(id);
                }
                if (!car) {
                    return this.handleNotFound(res, 'Car not found');
                }
                this.handleSuccess(res, car);
            }
            catch (err) {
                this.handleError(res, err, 'Failed to fetch car');
            }
        });
        this.createCar = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { plate, manufacture, model, image, capacity, description, transmission, type, year, rent_price, option, spec } = req.body;
            const admin = req.admin;
            try {
                if (admin) {
                    const admin_id = admin.id;
                    yield CarService_1.default.createCar(admin_id, plate, manufacture, model, image, capacity, description, transmission, type, year, rent_price, option, spec);
                }
                this.handleCreated(res, 'Car created successfully');
            }
            catch (err) {
                this.handleError(res, err, 'Failed to create car');
            }
        });
        this.updateCar = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const { plate, manufacture, model, image, capacity, description, transmission, type, year, rent_price, available, option, spec } = req.body;
            const admin = req.admin;
            try {
                if (admin) {
                    const admin_id = admin.id;
                    yield CarService_1.default.updateCar(admin_id, id, plate, manufacture, model, image, capacity, description, transmission, type, year, rent_price, available, option, spec);
                }
                this.handleCreated(res, 'Car updated successfully');
            }
            catch (err) {
                this.handleError(res, err, 'Failed to update car');
            }
        });
        this.deleteCar = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const admin = req.admin;
            try {
                if (admin) {
                    const admin_id = admin.id;
                    const car = yield CarService_1.default.deleteCar(id, admin_id);
                    if (!car) {
                        return this.handleNotFound(res, 'Car not found');
                    }
                }
                this.handleDeleted(res, 'Car deleted successfully');
            }
            catch (err) {
                this.handleError(res, err, 'Failed to delete car');
            }
        });
    }
}
exports.default = new CarController();
