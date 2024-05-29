import { Knex } from "knex";
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';

export async function seed(knex: Knex): Promise<void> {
    await knex("admins").del();

    const id_1 = uuidv4();
    const id_2 = uuidv4();
    const id_3 = uuidv4();
    const id_4 = uuidv4();
    
    await knex("admins").insert([
        {
            "id": id_1,
            "username": "Super Admin 1",
            "super_admin": true,
            "password": await bcrypt.hash('passwordsuperadmin', 10),
        },
        {
            "id": id_2,
            "username": "Super Admin 2",
            "super_admin": true,
            "password": await bcrypt.hash('passwordsuperadmin', 10),
        },
        {
            "id": id_3,
            "username": "Admin 1",
            "password": await bcrypt.hash('passwordadmin', 10),
        },
        {
            "id": id_4,
            "username": "Admin 2",
            "password": await bcrypt.hash('passwordadmin', 10),
        },
    ]);
};
