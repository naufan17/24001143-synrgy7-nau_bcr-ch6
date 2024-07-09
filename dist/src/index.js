"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const yamljs_1 = __importDefault(require("yamljs"));
const morgan_1 = __importDefault(require("morgan"));
const routes_1 = __importDefault(require("./routes"));
const cors_1 = __importDefault(require("cors"));
require("./config/database");
const openAPIDocument = yamljs_1.default.load("./docs/openapi.yaml");
const port = Number(process.env.PORT) || 8000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, morgan_1.default)('combined'));
app.use('/api', (0, cors_1.default)(), routes_1.default);
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(openAPIDocument));
app.use((req, res) => {
    res.status(404).json({ error: 'Route Not Found' });
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
exports.default = app;
