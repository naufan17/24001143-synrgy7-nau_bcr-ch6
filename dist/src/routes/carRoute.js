"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CarController_1 = __importDefault(require("../controllers/CarController"));
const ImageController_1 = __importDefault(require("../controllers/ImageController"));
const multer_1 = require("../config/multer");
const AuthenticateMiddleware_1 = __importDefault(require("../middleware/AuthenticateMiddleware"));
const AuthorizationMiddleware_1 = __importDefault(require("../middleware/AuthorizationMiddleware"));
const router = express_1.default.Router();
router.get('/car', AuthenticateMiddleware_1.default.passAuthenticateAdmin, CarController_1.default.getCar);
router.get('/car/:id', AuthenticateMiddleware_1.default.passAuthenticateAdmin, CarController_1.default.getCarById);
router.post('/car', AuthenticateMiddleware_1.default.authenticate, AuthorizationMiddleware_1.default.authorizeAdmin, CarController_1.default.createCar);
router.post('/car/image', AuthenticateMiddleware_1.default.authenticate, AuthorizationMiddleware_1.default.authorizeAdmin, multer_1.uploadImageCar.single('image'), ImageController_1.default.uploadImageCar);
router.put('/car/:id', AuthenticateMiddleware_1.default.authenticate, AuthorizationMiddleware_1.default.authorizeAdmin, CarController_1.default.updateCar);
router.delete('/car/:id', AuthenticateMiddleware_1.default.authenticate, AuthorizationMiddleware_1.default.authorizeAdmin, CarController_1.default.deleteCar);
exports.default = router;
