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
            manufacture: car.manufacture,
            model: car.model,
            image: car.image,
            capacity: car.capacity,
            transmission: car.transmission,
            type: car.type,
            year: car.year,
            rent_price: car.rents.rent_price,
            available: car.rents.available,
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
            manufacture: car.manufacture,
            model: car.model,
            image: car.image,
            capacity: car.capacity,
            transmission: car.transmission,
            type: car.type,
            year: car.year,
            rent_price: car.rents.rent_price,
            available: car.rents.available,
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
                rent_price: car.rents.rent_price,
                available: car.rents.available,
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
                rent_price: car.rents.rent_price,
                available: car.rents.available,
                option: car.options.map((option: any) => option.option),
                spec: car.specs.map((spec: any) => spec.spec),
                create: {
                    admin_id: car.car_creates? car.car_creates.admin_id : null,
                    created_at: car.car_creates? car.created_at : null,
                },
                update: {
                    admin_id: car.car_updates? car.car_updates.admin_id : null,
                    updated_at: car.car_updates? car.updated_at : null,
                },
                delete: {
                    admin_id: car.car_deletes? car.car_deletes.admin_id: null,
                    deleted_at: car.car_deletes? car.deleted_at: null,
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
        available: boolean,
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
            available,
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