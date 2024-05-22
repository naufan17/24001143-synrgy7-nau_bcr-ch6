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
            created_at: car.created_at,
            updated_at: car.updated_at,
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
                created_at: car.created_at,
                updated_at: car.updated_at,
            };
        }

        return formattedCar;
    }

    async createCar( 
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

    async deleteCar(id: string){
        return await CarRepository.delete(id);
    }
}

export default new CarService();