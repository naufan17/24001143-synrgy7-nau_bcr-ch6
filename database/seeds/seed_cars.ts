import { Knex } from "knex";
import { v4 as uuidv4 } from 'uuid';

export async function seed(knex: Knex): Promise<void> {
    // await knex("cars").del();
    // await knex("rents").del();
    // await knex("options").del();
    // await knex("specs").del();
    // await knex("car_create").del();

    const id_1 = uuidv4();
    const id_2 = uuidv4();
    const id_3 = uuidv4();
    const id_4 = uuidv4();
    const id_5 = uuidv4();
    const id_6 = uuidv4();
    const id_7 = uuidv4();
    const id_8 = uuidv4();
    const id_9 = uuidv4();
    const id_10 = uuidv4();

    await knex("cars").insert([
        {
            "id": id_1,
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
            "id": id_2,
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
            "id": id_3,
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
            "id": id_4,
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
            "id": id_5,
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
            "id": id_6,
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
            "id": id_7,
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
            "id": id_8,
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
            "id": id_9,
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
            "id": id_10,
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

    await knex("rents").insert([
        {
            "car_id": id_1,
            "rent_price": 200000,
        },
        {
            "car_id": id_2,
            "rent_price": 800000,
        },
        {
            "car_id": id_3,
            "rent_price": 900000,
        },
        {
            "car_id": id_4,
            "rent_price": 300000,
        },
        {
            "car_id": id_5,
            "rent_price": 400000,
        },
        {
            "car_id": id_6,
            "rent_price": 350000,
        },
        {
            "car_id": id_7,
            "rent_price": 700000,
        },
        {
            "car_id": id_8,
            "rent_price": 320000,
        },
        {
            "car_id": id_9,
            "rent_price": 310000,
        },
        {
            "car_id": id_10,
            "rent_price": 500000,
        }
    ]);

    await knex("specs").insert([
        {
            "car_id": id_1,
            "spec": "Brake assist"
        },
        {
            "car_id": id_1,
            "spec": "Leather-wrapped shift knob"
        },
        {
            "car_id": id_1,
            "spec": "Glove box lamp"
        },
        {
            "car_id": id_2,
            "spec": "Rear passenger map pockets"
        },
        {
            "car_id": id_2,
            "spec": "Electrochromic rearview mirror"
        },
        {
            "car_id": id_2,
            "spec": "Dual chrome exhaust tips"
        },
        {
            "car_id": id_3,
            "spec": "Direct-type tire pressure monitor system"
        },
        {
            "car_id": id_3,
            "spec": "Cargo area lamp"
        },
        {
            "car_id": id_4,
            "spec": "Automatic temperature control"
        },
        {
            "car_id": id_4,
            "spec": "Electronic stability"
        },
        {
            "car_id": id_5,
            "spec": "Trip computer"
        },
        {
            "car_id": id_5,
            "spec": "Power steering"
        },
        {
            "car_id": id_6,
            "spec": "Power door mirrors"
        },
        {
            "car_id": id_6,
            "spec": "Front bucket seats"
        },
        {
            "car_id": id_7,
            "spec": "Navigation system"
        },
        {
            "car_id": id_7,
            "spec": "Wireless phone connectivity"
        },
        {
            "car_id": id_8,
            "spec": "Power driver seat"
        },
        {
            "car_id": id_8,
            "spec": "Rear window defroster"
        },
        {
            "car_id": id_9,
            "spec": "Front bucket seats"
        },
        {
            "car_id": id_9,
            "spec": "Rear window defroster"
        },
        {
            "car_id": id_10,
            "spec": "Exterior parking camera rear"
        },
        {
            "car_id": id_10,
            "spec": "Front dual zone A/C"
        }
    ]);

    await knex("options").insert([
        {
            "car_id": id_1,
            "option": "Cruise Control"
        },
        {
            "car_id": id_1,
            "option": "Tinted Glass"
        },
        {
            "car_id": id_1,
            "option": "AM/FM Stereo"
        },
        {
            "car_id": id_2,
            "option": "Keyless Entry"
        },
        {
            "car_id": id_2,
            "option": "Power Windows"
        },
        {
            "car_id": id_2,
            "option": "MP3 (Single Disc)"
        },
        {
            "car_id": id_3,
            "option": "Navigation System"
        },
        {
            "car_id": id_3,
            "option": "Bluetooth"
        },
        {
            "car_id": id_4,
            "option": "Leather Seats"
        },
        {
            "car_id": id_4,
            "option": "Backup Camera"
        },
        {
            "car_id": id_5,
            "option": "Remote Start"
        },
        {
            "car_id": id_5,
            "option": "Heated Seats"
        },
        {
            "car_id": id_6,
            "option": "Sunroof"
        },
        {
            "car_id": id_6,
            "option": "Parking Sensors"
        },
        {
            "car_id": id_7,
            "option": "Adaptive Cruise Control"
        },
        {
            "car_id": id_7,
            "option": "Lane Departure Warning"
        },
        {
            "car_id": id_8,
            "option": "Blind Spot Monitoring"
        },
        {
            "car_id": id_8,
            "option": "Apple CarPlay"
        },
        {
            "car_id": id_9,
            "option": "Android Auto"
        },
        {
            "car_id": id_9,
            "option": "Heated Steering Wheel"
        },
        {
            "car_id": id_10,
            "option": "Remote Start"
        },
        {
            "car_id": id_10,
            "option": "Heated Seats"
        }
    ]);

    const admins = await knex('admins').select('id', 'name');
    const admin_1 = admins.find(admin => admin.name === 'Admin 1')
    const admin_2 = admins.find(admin => admin.name === 'Admin 2')

    await knex("car_create").insert([
        {
            "car_id": id_1,
            "admin_id": admin_1.id,
        },
        {
            "car_id": id_2,
            "admin_id": admin_1.id,
        },
        {
            "car_id": id_3,
            "admin_id": admin_1.id,
        },
        {
            "car_id": id_4,
            "admin_id": admin_1.id,
        },
        {
            "car_id": id_5,
            "admin_id": admin_1.id,
        },
        {
            "car_id": id_6,
            "admin_id": admin_2.id,
        },
        {
            "car_id": id_7,
            "admin_id": admin_2.id,
        },
        {
            "car_id": id_8,
            "admin_id": admin_2.id,
        },
        {
            "car_id": id_9,
            "admin_id": admin_2.id,
        },
        {
            "car_id": id_10,
            "admin_id": admin_2.id,
        }
    ]);
};