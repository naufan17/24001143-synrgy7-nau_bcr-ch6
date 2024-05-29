import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('orders', (table: Knex.TableBuilder) => {
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
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('orders')
}