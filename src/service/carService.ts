import { Request, Response } from 'express';
import { transaction } from 'objection';
import { v4 as uuidv4 } from 'uuid';
import Car from '../models/Car';
import Rent from '../models/Rent';
import Spec from '../models/Spec';
import Option from '../models/Option';

const getCar = async (req: Request, res: Response) => {
    try {
        const cars = await Car.query().withGraphFetched('[rents]');

        if (!cars || cars.length === 0) {
            return res.status(404).json({ message: 'Car not found' });
        }

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

        res.status(200).json({ cars: formattedCar })
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch car' });
    }
}

const getCarById = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    
    try {
        const car = await Car.query().findById(id).withGraphFetched('[rents, options, specs]');

        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }

        const formattedCar = {
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

        res.status(200).json(formattedCar)
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch car' });
    }
}

const createCar = async (req: Request, res: Response): Promise<void> => {
    const {
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
    } = req.body;
    const car_id = uuidv4();
    
    try {
        await transaction(Car.knex(), async (trx) => {
            await Car.query(trx).insert({
                id: car_id,
                plate,
                manufacture,
                model,
                image,
                capacity,
                description,
                transmission,
                type,
                year
            });

            await Rent.query(trx).insert({
                car_id: car_id,
                rent_price,
                available
            });

            if (Array.isArray(option)) {
                await Promise.all(option.map((opt: string) => 
                    Option.query(trx).insert({
                        car_id: car_id,
                        option: opt
                    })
                ));
            } else {
                await Option.query(trx).insert({
                    car_id: car_id,
                    option
                })
            }

            if (Array.isArray(spec)) {
                await Promise.all(spec.map((sp: string) => 
                    Spec.query(trx).insert({
                        car_id: car_id,
                        spec: sp
                    })
                ));
            } else {
                await Spec.query(trx).insert({
                    car_id: car_id,
                    spec
                })
            }
        });
        
        res.status(201).json({ message: 'Car created successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create car' });
    }
};

const updateCar = async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;
    const {
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
    } = req.body;

    try {
        await transaction(Car.knex(), async (trx) => {
            await Car.query(trx).findById(id).update({
                plate,
                manufacture,
                model,
                image,
                capacity,
                description,
                transmission,
                type,
                year
            });

            await Rent.query(trx).where('car_id', id).update({
                rent_price,
                available
            });

            await Option.query(trx).where('car_id', id).delete();
            if (Array.isArray(option)) {
                await Promise.all(option.map((opt: string) => 
                    Option.query(trx).insert({ 
                        car_id: id,
                        option: opt 
                    })
                ));
            } else {
                await Option.query(trx).insert({ 
                    car_id: id,
                    option 
                });
            }

            await Spec.query(trx).where('car_id', id).delete();
            if (Array.isArray(spec)) {
                await Promise.all(spec.map((sp: string) => 
                    Spec.query(trx).insert({ 
                        car_id: id,
                        spec: sp 
                    })
                ));
            } else {
                await Spec.query(trx).insert({ 
                    car_id: id,
                    spec 
                });
            }
        })

        res.status(201).json({ message: 'Car updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update car' });
    }
}

const deleteCar = async (req: Request, res: Response) => {
    const id: string = req.params.id;

    try {
        const rowsDeleted = await transaction(Car.knex(), async (trx) => {
            await Rent.query(trx).delete().where('car_id', id);
            await Option.query(trx).delete().where('car_id', id);
            await Spec.query(trx).delete().where('car_id', id);
            return await Car.query(trx).deleteById(id);
        });

        if (rowsDeleted === 0) {
            res.status(404).json({ message: 'Car not found' });
            return
        }
  
        res.status(201).json({ message: 'Car deleted successfully' })
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete car' });
    }
}

export { getCar, getCarById, createCar, updateCar, deleteCar }