import { v4 as uuidv4 } from 'uuid';
import CarRepository from "../repositories/CarRepository";

class CarService {
    async getAllCars() {
        const cars = await CarRepository.findAll();

        if (!cars) {
            return null;
        }

        const formattedCar = cars.map((car: any) => ({
            id: car.id,
            plate: car.plate,
            manufacture: car.manufacture,
            model: car.model,
            image: car.image,
            capacity: car.capacity,
            description: car.description,
            transmission: car.transmission,
            type: car.type,
            year: car.year,
            rent_price: car.rent_price,
            available: car.available,
            option: car.options.map((option: any) => option.option),
            spec: car.specs.map((spec: any) => spec.spec),
        }));

        return formattedCar;
    }

    async getAllCarsNotDeleted() {
        const cars = await CarRepository.findAllNotDeleted();

        if (!cars) {
            return null;
        }

        const formattedCar = cars.map((car: any) => ({
            id: car.id,
            plate: car.plate,
            manufacture: car.manufacture,
            model: car.model,
            image: car.image,
            capacity: car.capacity,
            description: car.description,
            transmission: car.transmission,
            type: car.type,
            year: car.year,
            rent_price: car.rent_price,
            available: car.available,
            option: car.options.map((option: any) => option.option),
            spec: car.specs.map((spec: any) => spec.spec),
            create: {
                admin_id: car.created_by,
                created_at: car.created_at,
            },
            update: {
                admin_id: car.updated_at,
                updated_at: car.updated_at,
            },
            delete: {
                admin_id: car.deleted_by,
                deleted_at: car.deleted_at,
            },
        }));

        return formattedCar;
    }


    async getCarById(id: string) {
        const car = await CarRepository.findById(id);

        if (!car) {
            return null;
        }

        let formattedCar = {}
        if (car) {
            formattedCar = {
                id: car.id,
                plate: car.plate,
                manufacture: car.manufacture,
                model: car.model,
                image: car.image,
                capacity: car.capacity,
                description: car.description,
                transmission: car.transmission,
                type: car.type,
                year: car.year,
                rent_price: car.rent_price,
                available: car.available,
                option: car.options.map((option: any) => option.option),
                spec: car.specs.map((spec: any) => spec.spec),
            };
        }

        return formattedCar;
    }

    async getCarByIdNotDeleted(id: string) {
        const car = await CarRepository.findByIdNotDeleted(id);

        if (!car) {
            return null;
        }

        let formattedCar = {}
        if (car) {
            formattedCar = {
                id: car.id,
                plate: car.plate,
                manufacture: car.manufacture,
                model: car.model,
                image: car.image,
                capacity: car.capacity,
                description: car.description,
                transmission: car.transmission,
                type: car.type,
                year: car.year,
                rent_price: car.rent_price,
                available: car.available,
                option: car.options.map((option: any) => option.option),
                spec: car.specs.map((spec: any) => spec.spec),
                create: {
                    admin_id: car.created_by,
                    created_at: car.created_at,
                },
                update: {
                    admin_id: car.updated_at,
                    updated_at: car.updated_at,
                },
                delete: {
                    admin_id: car.deleted_by,
                    deleted_at: car.deleted_at,
                },
            };
        }

        return formattedCar;
    }

    async createCar( 
        admin_id: string,
        plate: string,
        manufacture: string,
        model: string,
        image: string,
        capacity: number,
        description: string,
        transmission: string,
        type: string,
        year: number,
        rent_price: number,
        option: string,
        spec: string
    ){
        const id = uuidv4();

        return await CarRepository.create(
            admin_id,
            id,         
            plate,
            manufacture,
            model,
            image,
            capacity,
            description,
            transmission,
            type,
            year,
            rent_price,
            option,
            spec
        )
    }

    async updateCar(
        admin_id: string,
        id: string, 
        plate: string,
        manufacture: string,
        model: string,
        image: string,
        capacity: number,
        description: string,
        transmission: string,
        type: string,
        year: number,
        rent_price: number,
        available: boolean,
        option: string,
        spec: string
    ){
        return await CarRepository.update(
            admin_id,
            id,         
            plate,
            manufacture,
            model,
            image,
            capacity,
            description,
            transmission,
            type,
            year,
            rent_price,
            available,
            option,
            spec
        )
    }

    async deleteCar(
        id: string, 
        admin_id: string
    ){
        return await CarRepository.delete(id, admin_id);
    }
}

export default new CarService();