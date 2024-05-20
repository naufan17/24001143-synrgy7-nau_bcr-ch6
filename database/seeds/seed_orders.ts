import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    await knex("orders").del();

    await knex("orders").insert([
        {
            "id": "e76e884b-8f3e-4b90-a717-9239676d0191",
            "car_id": "6e2bc663-5197-441a-957b-bc75e4a2da7c",
            "customer_id": "950575d6-958c-422e-a46b-c3ed2e1315ed",
            "duration": 2,
            "rent_start": "2024-05-16T08:49:05.563Z",
            "rent_end": "2024-05-18T08:49:05.563Z",
            "total_price": 400000,
            "status": 'Rented'
        },
        {
            "id": "32e7e56f-1a00-455f-bf4b-dbd2c8c4daaf",
            "car_id": "9ff03bbc-b18c-4ba7-8f3a-4c4b5c2f6c77",
            "customer_id": "08cbd537-497f-4305-b7b4-e7493c703a2c",
            "duration": 2,
            "rent_start": "2024-05-16T08:49:05.563Z",
            "rent_end": "2024-05-18T08:49:05.563Z",
            "total_price": 1600000,
            "status": 'Rented'
        },
        {
            "id": "432d9ed1-e330-4953-ac33-f51a60a5799b",
            "car_id": "bf6b5c43-1377-4ae0-8908-310c64266f81",
            "customer_id": "1bfda124-5175-4b90-bee7-d66affdbcc66",
            "duration": 3,
            "rent_start": "2024-05-13T08:49:05.563Z",
            "rent_end": "2024-05-16T08:49:05.563Z",
            "total_price": 2700000,
            "status": 'Late'
        },
        {
            "id": "fc1d3297-ab17-40a9-a79c-ca7307ed5faa",
            "car_id": "e1eebdd1-7065-40f2-8c1b-0dd1b6509f83",
            "customer_id": "22c969a7-04ce-4efb-a479-7ab3bc094cb9",
            "duration": 1,
            "rent_start": "2024-05-16T08:49:05.563Z",
            "rent_end": "2024-05-17T08:49:05.563Z",
            "total_price": 300000,
            "status": 'Returned'
        },
        {
            "id": "b89117fc-69e1-4366-ba21-9d6a0b2bfb04",
            "car_id": "a3fcbe66-8166-4e58-8d58-4cbe6e4f22bb",
            "customer_id": "79cc327b-2b0f-4042-acdf-78386b2f8ebd",
            "duration": 1,
            "rent_start": "2024-05-17T08:49:05.563Z",
            "rent_end": "2024-05-18T08:49:05.563Z",
            "total_price": 400000,
            "status": 'Returned'
        },
    ]);
};
