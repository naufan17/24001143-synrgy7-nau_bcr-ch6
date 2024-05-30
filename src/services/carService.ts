import { v4 as uuidv4 } from 'uuid';
import CarRepository from "../repositories/CarRepository";

interface formattedCar {
    id: string;
    plate: string;
    manufacture: string;
    model: string;
    image: string;
    capacity: number;
    description: string;
    transmission: string;
    type: string;
    year: number;
    rent_price: number;
    available: boolean;
    option: string[];
    spec: string[];
}

interface FormattedCarDetail {
    id: string;
    plate: string;
    manufacture: string;
    model: string;
    image: string;
    capacity: number;
    description: string;
    transmission: string;
    type: string;
    year: number;
    rent_price: number;
    available: boolean;
    option: string[];
    spec: string[];
    create: {
        created_by: string;
        created_at: Date;
    };
    update: {
        updated_by: string;
        updated_at: Date;
    };
    delete: {
        deleted_by: string;
        deleted_at: Date;
    };
}

class CarService {
    async getAllCars(): Promise<formattedCar[] | null> {
        const cars = await CarRepository.findAll();

        if (!cars) {
            return null;
        }

        const formattedCar: formattedCar[] = cars.map((car: any) => ({
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

    async getAllCarsNotDeleted(): Promise<FormattedCarDetail[] | null> {
        const cars = await CarRepository.findAllNotDeleted();

        if (!cars) {
            return null;
        }

        const formattedCar: FormattedCarDetail[] = cars.map((car: any) => ({
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
                created_by: car.created_by,
                created_at: car.created_at,
            },
            update: {
                updated_by: car.updated_at,
                updated_at: car.updated_at,
            },
            delete: {
                deleted_by: car.deleted_by,
                deleted_at: car.deleted_at,
            },
        }));

        return formattedCar;
    }

    async getCarById(id: string): Promise<formattedCar | null> {
        const car = await CarRepository.findById(id);

        if (!car) {
            return null;
        }

        const formattedCar: formattedCar = {
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

        return formattedCar;
    }

    async getCarByIdNotDeleted(id: string): Promise<FormattedCarDetail | null> {
        const car = await CarRepository.findByIdNotDeleted(id);

        if (!car) {
            return null;
        }

        const formattedCar: FormattedCarDetail  = {
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
                created_by: car.created_by,
                created_at: car.created_at,
            },
            update: {
                updated_by: car.updated_by,
                updated_at: car.updated_at,
            },
            delete: {
                deleted_by: car.deleted_by,
                deleted_at: car.deleted_at,
            },
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
    ): Promise<void> {
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
    ): Promise<void> {
        const updated_at = new Date();

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
            spec,
            updated_at
        )
    }

    async deleteCar(id: string, admin_id: string): Promise<void | number> {
        const deleted_at = new Date();

        return await CarRepository.delete(id, admin_id, deleted_at);
    }
}

export default new CarService();