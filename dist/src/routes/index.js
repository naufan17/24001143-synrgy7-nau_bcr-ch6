"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRoutes_1 = __importDefault(require("./authRoutes"));
const adminRoute_1 = __importDefault(require("./adminRoute"));
const userRoute_1 = __importDefault(require("./userRoute"));
const carRoute_1 = __importDefault(require("./carRoute"));
const orderRoute_1 = __importDefault(require("./orderRoute"));
const router = express_1.default.Router();
router.use(authRoutes_1.default);
router.use(adminRoute_1.default);
router.use(userRoute_1.default);
router.use(carRoute_1.default);
router.use(orderRoute_1.default);
exports.default = router;
