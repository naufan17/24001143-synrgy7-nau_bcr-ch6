import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('roles', (table: Knex.TableBuilder) => {
        table.increments('id').primary();
        table.uuid('admin_id').references('id').inTable('admins').notNullable();;
        table.boolean('super_admin').defaultTo(false);
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('roles')
}