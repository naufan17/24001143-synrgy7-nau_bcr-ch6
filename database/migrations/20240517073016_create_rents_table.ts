import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('rents', (table: Knex.TableBuilder) => {
        table.increments('id').primary();
        table.uuid('car_id').references('id').inTable('cars');
        table.integer('rent_price', 50);
        table.boolean('available').defaultTo(true);
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('rents')
}