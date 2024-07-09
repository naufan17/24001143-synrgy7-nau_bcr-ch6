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
        return knex.schema.createTable('orders', (table) => {
            table.uuid('id').primary();
            table.uuid('car_id').references('id').inTable('cars').notNullable();
            table.uuid('user_id').references('id').inTable('users').notNullable();
            table.integer('duration', 10);
            table.timestamp('rent_start');
            table.timestamp('rent_end');
            table.integer('total_price', 50);
            table.string('status', 20);
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('updated_at');
        });
    });
}
function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        return knex.schema.dropTable('orders');
    });
}
