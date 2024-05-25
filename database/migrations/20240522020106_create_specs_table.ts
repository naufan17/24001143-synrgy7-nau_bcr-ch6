import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('specs', (table: Knex.TableBuilder) => {
        table.increments('id').primary();
        table.uuid('car_id').references('id').inTable('cars').notNullable();;
        table.string('spec', 255);
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('specs')
}