import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    await knex("rents").del();

    await knex("rents").insert([
        {
            "car_id": "6e2bc663-5197-441a-957b-bc75e4a2da7c",
            "rent_price": 200000,
            "available": false
        },
        {
            "car_id": "9ff03bbc-b18c-4ba7-8f3a-4c4b5c2f6c77",
            "rent_price": 800000,
            "available": false
        },
        {
            "car_id": "bf6b5c43-1377-4ae0-8908-310c64266f81",
            "rent_price": 900000,
            "available": false
        },
        {
            "car_id": "e1eebdd1-7065-40f2-8c1b-0dd1b6509f83",
            "rent_price": 300000,
            "available": true
        },
        {
            "car_id": "a3fcbe66-8166-4e58-8d58-4cbe6e4f22bb",
            "rent_price": 400000,
            "available": true
        },
        {
            "car_id": "89cb8f64-3f98-4b8a-abc1-72f35c76e91d",
            "rent_price": 350000,
            "available": true
        },
        {
            "car_id": "97a8e593-6f3f-41ef-bda7-4c5e4324e9c3",
            "rent_price": 700000,
            "available": true
        },
        {
            "car_id": "4fae5f5c-f4b9-40e7-8a78-5a3f2d5ad1b9",
            "rent_price": 320000,
            "available": true
        },
        {
            "car_id": "3b5f5e28-bc91-4421-a729-0a68e24d9b98",
            "rent_price": 310000,
            "available": true
        },
        {
            "car_id": "b8d6f55b-3d1c-4e0a-bf95-902fae1db828",
            "rent_price": 500000,
            "available": true
        }
    ]);
};
