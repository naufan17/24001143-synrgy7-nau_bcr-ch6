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
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
function up(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        return knex.schema.createTable('cars', (table) => {
            table.uuid('id').primary();
            table.string('plate', 10);
            table.string('manufacture', 50);
            table.string('model', 50);
            table.string('image', 255);
            table.integer('capacity', 10);
            table.text('description');
            table.string('transmission', 20);
            table.string('type', 20);
            table.integer('year', 10);
            table.integer('rent_price', 50);
            table.boolean('available').defaultTo(true);
            table.uuid('created_by').references('id').inTable('admins');
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.uuid('updated_by').references('id').inTable('admins');
            table.timestamp('updated_at');
            table.uuid('deleted_by').references('id').inTable('admins');
            table.timestamp('deleted_at');
        });
    });
}
function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        return knex.schema.dropTable('cars');
    });
}
