import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('admins', (table: Knex.TableBuilder) => {
        table.uuid('id').primary();
        table.string('name', 100);
        table.string('password', 255).notNullable();        
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at');    
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('admins')
}