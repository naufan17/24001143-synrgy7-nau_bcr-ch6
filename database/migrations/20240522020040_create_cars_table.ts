import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('cars', (table: Knex.TableBuilder) => {
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
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at');
        table.timestamp('deleted_at');
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('cars')
}