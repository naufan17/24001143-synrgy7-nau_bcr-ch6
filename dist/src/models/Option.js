"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const objection_1 = require("objection");
class Option extends objection_1.Model {
    static get tableName() {
        return 'options';
    }
}
exports.default = Option;
