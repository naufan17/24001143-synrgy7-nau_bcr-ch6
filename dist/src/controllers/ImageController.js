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
const UploadImageService_1 = __importDefault(require("../services/UploadImageService"));
class ImageController extends Controller_1.default {
    constructor() {
        super(...arguments);
        this.uploadImageCar = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const fileImage = req.file;
            if (!fileImage) {
                return this.handleBadRequest(res, 'No image uploaded');
            }
            try {
                const result = yield UploadImageService_1.default.uploadImage(fileImage);
                this.handleSuccess(res, { url: result.secure_url });
            }
            catch (err) {
                this.handleError(res, err, 'Error uploading image');
            }
        });
    }
}
exports.default = new ImageController();
