import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('car_deletes', (table: Knex.TableBuilder) => {
        table.increments('id').primary();
        table.uuid('admin_id').references('id').inTable('admins');
        table.uuid('car_id').references('id').inTable('cars').notNullable();
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('car_deletes')
}