import { v4 as uuidv4 } from 'uuid';
import carRepository from "../repositories/carRepository";

class CarService {
    async getAllCars() {
        const cars = await carRepository.findAll();

        const formattedCar = cars.map((car: any) => ({
            id: car.id,
            manufacture: car.manufacture,
            model: car.model,
            image: car.image,
            type: car.type,
            year: car.year,
            rent_price: car.rents[0].rent_price,
            available: car.rents[0].available,
            created_at: car.created_at,
            updated_at: car.updated_at,
        }));

        return formattedCar;
    }

    async getCarById(id: string) {
        const car = await carRepository.findById(id);
        let formattedCar: any = {}

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
                rent_price: car.rents[0].rent_price,
                available: car.rents[0].available,
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
        const id: string = uuidv4();
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
        return await carRepository.update(
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
        )
    }

    async deleteCar(id: string){
        return await 
        await carRepository.delete(id);
    }
}

export default new CarService();