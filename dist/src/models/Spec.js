"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const objection_1 = require("objection");
class Spec extends objection_1.Model {
    static get tableName() {
        return 'specs';
    }
}
exports.default = Spec;
