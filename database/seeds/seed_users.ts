import { Knex } from "knex";
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';

export async function seed(knex: Knex): Promise<void> {
    await knex("users").del();

    await knex("users").insert([
        {
            "id": uuidv4(),
            "name": "Andi",
            "email": "andi@gmail.com",
            "address": "Andi House",
            "phone_number": "089623723481",
            "password": await bcrypt.hash('passworduser', 10),
        },
        {
            "id": uuidv4(),
            "name": "Budi",
            "email": "budi@gmail.com",
            "address": "Budi House",
            "phone_number": "089278345671",
            "password": await bcrypt.hash('passworduser', 10),
        },
        {
            "id": uuidv4(),
            "name": "Abi",
            "email": "abi@gmail.com",
            "address": "Abi House",
            "phone_number": "087696433672",
            "password": await bcrypt.hash('passworduser', 10),
        },
        {
            "id": uuidv4(),
            "name": "Umi",
            "email": "umi@gmail.com",
            "address": "Umi House",
            "phone_number": "089256783452",
            "password": await bcrypt.hash('passworduser', 10),
        },
        {
            "id": uuidv4(),
            "name": "Dono",
            "email": "dono@gmail.com",
            "address": "Dono House",
            "phone_number": "089762343491",
            "password": await bcrypt.hash('passworduser', 10),
        },
    ]);
};
