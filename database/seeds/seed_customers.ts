import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    await knex("customers").del();

    await knex("customers").insert([
        {
            "id": "950575d6-958c-422e-a46b-c3ed2e1315ed",
            "name": "Andi",
            "email": "andi@gmail.com",
            "address": "Andi House"
        },
        {
            "id": "08cbd537-497f-4305-b7b4-e7493c703a2c",
            "name": "Budi",
            "email": "budi@gmail.com",
            "address": "Budi House"
        },
        {
            "id": "1bfda124-5175-4b90-bee7-d66affdbcc66",
            "name": "Abi",
            "email": "abi@gmail.com",
            "address": "Abi House"
        },
        {
            "id": "22c969a7-04ce-4efb-a479-7ab3bc094cb9",
            "name": "Umi",
            "email": "umi@gmail.com",
            "address": "Umi House"
        },
        {
            "id": "79cc327b-2b0f-4042-acdf-78386b2f8ebd",
            "name": "Dono",
            "email": "dono@gmail.com",
            "address": "Dono House"
        },
    ]);
};
