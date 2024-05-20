import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    await knex("cars").del();

    await knex("cars").insert([
        {
            "id": "6e2bc663-5197-441a-957b-bc75e4a2da7c",
            "plate": "DBH-3491",
            "manufacture": "Ford",
            "model": "F150",
            "image": "https://res.cloudinary.com/ddpbwjjfz/image/upload/v1715908216/car/jhm4qjtedmakflzbiq1z.jpg",
            "capacity": 2,
            "description": "Brake assist. Leather-wrapped shift knob. Glove box lamp. Air conditioning w/in-cabin microfilter.",
            "transmission": "Automatic",
            "type": "Sedan",
            "year": 2022,
        },
        {
            "id": "9ff03bbc-b18c-4ba7-8f3a-4c4b5c2f6c77",
            "plate": "WXB-3984",
            "manufacture": "BMW",
            "model": "X5",
            "image": "https://res.cloudinary.com/ddpbwjjfz/image/upload/v1715908216/car/jhm4qjtedmakflzbiq1z.jpg",
            "capacity": 6,
            "description": "Rear passenger map pockets. Electrochromic rearview mirror. Dual chrome exhaust tips. Locking glove box.",
            "transmission": "Automatic",
            "type": "Convertible",
            "year": 2019,
        },
        {
            "id": "bf6b5c43-1377-4ae0-8908-310c64266f81",
            "plate": "OSL-4224",
            "manufacture": "Lincoln",
            "model": "MKZ",
            "image": "https://res.cloudinary.com/ddpbwjjfz/image/upload/v1715908216/car/jhm4qjtedmakflzbiq1z.jpg",
            "capacity": 6,
            "description": "Driver & front passenger map pockets. Direct-type tire pressure monitor system. Cargo area lamp. Glove box lamp.",
            "transmission": "Automanual",
            "type": "Sedan",
            "year": 2021,
        },
        {
            "id": "e1eebdd1-7065-40f2-8c1b-0dd1b6509f83",
            "plate": "LXD-2147",
            "manufacture": "Honda",
            "model": "Civic",
            "image": "https://res.cloudinary.com/ddpbwjjfz/image/upload/v1715908216/car/jhm4qjtedmakflzbiq1z.jpg",
            "capacity": 4,
            "description": "Automatic temperature control. Delay-off headlights. Electronic stability. Remote keyless entry.",
            "transmission": "Manual",
            "type": "Coupe",
            "year": 2020,
        },
        {
            "id": "a3fcbe66-8166-4e58-8d58-4cbe6e4f22bb",
            "plate": "WMC-8412",
            "manufacture": "Chevrolet",
            "model": "Impala",
            "image": "https://res.cloudinary.com/ddpbwjjfz/image/upload/v1715908216/car/jhm4qjtedmakflzbiq1z.jpg",
            "capacity": 5,
            "description": "Trip computer. Variably intermittent wipers. Power steering. Air conditioning.",
            "transmission": "Automatic",
            "type": "Sedan",
            "year": 2018,
        },
        {
            "id": "89cb8f64-3f98-4b8a-abc1-72f35c76e91d",
            "plate": "OPQ-7583",
            "manufacture": "Toyota",
            "model": "Camry",
            "image": "https://res.cloudinary.com/ddpbwjjfz/image/upload/v1715908216/car/jhm4qjtedmakflzbiq1z.jpg",
            "capacity": 5,
            "description": "Front bucket seats. Rear window defroster. Power door mirrors. Power windows.",
            "transmission": "Automatic",
            "type": "Sedan",
            "year": 2021,
        },
        {
            "id": "97a8e593-6f3f-41ef-bda7-4c5e4324e9c3",
            "plate": "MSD-7631",
            "manufacture": "Tesla",
            "model": "Model S",
            "image": "https://res.cloudinary.com/ddpbwjjfz/image/upload/v1715908216/car/jhm4qjtedmakflzbiq1z.jpg",
            "capacity": 5,
            "description": "Navigation system. Automatic temperature control. Emergency communication system. Wireless phone connectivity.",
            "transmission": "Automatic",
            "type": "Sedan",
            "year": 2021,
        },
        {
            "id": "4fae5f5c-f4b9-40e7-8a78-5a3f2d5ad1b9",
            "plate": "ZXC-4738",
            "manufacture": "Nissan",
            "model": "Altima",
            "image": "https://res.cloudinary.com/ddpbwjjfz/image/upload/v1715908216/car/jhm4qjtedmakflzbiq1z.jpg",
            "capacity": 5,
            "description": "Power driver seat. Front bucket seats. Rear window defroster. Power door mirrors.",
            "transmission": "Automatic",
            "type": "Sedan",
            "year": 2022,
        },
        {
            "id": "3b5f5e28-bc91-4421-a729-0a68e24d9b98",
            "plate": "JKL-2384",
            "manufacture": "Hyundai",
            "model": "Elantra",
            "image": "https://res.cloudinary.com/ddpbwjjfz/image/upload/v1715908216/car/jhm4qjtedmakflzbiq1z.jpg",
            "capacity": 5,
            "description": "Front bucket seats. Rear window defroster. Power door mirrors. Power windows.",
            "transmission": "Automatic",
            "type": "Sedan",
            "year": 2020,
        },
        {
            "id": "b8d6f55b-3d1c-4e0a-bf95-902fae1db828",
            "plate": "RTY-9521",
            "manufacture": "Kia",
            "model": "Sorento",
            "image": "https://res.cloudinary.com/ddpbwjjfz/image/upload/v1715908216/car/jhm4qjtedmakflzbiq1z.jpg",
            "capacity": 7,
            "description": "Automatic temperature control. Wireless phone connectivity. Exterior parking camera rear. Front dual zone A/C.",
            "transmission": "Automatic",
            "type": "SUV",
            "year": 2020,
        }
    ]);
};
