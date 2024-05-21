import { Request, Response } from 'express';
import carService from '../services/carService';

class CarController {
    async getCar(req: Request, res: Response) {
        try {
            const cars = await carService.getAllCars();
    
            if (!cars || cars.length === 0) {
                return res.status(404).json({ message: 'Car not found' });
            }
    
            res.status(200).json({ cars: cars })
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to fetch car' });
        }
    }
    
    async getCarById(req: Request, res: Response) {
        const id: string = req.params.id;
        
        try {
            const car = await carService.getCarById(id);
    
            if (!car) {
                return res.status(404).json({ message: 'Car not found' });
            }
    
            res.status(200).json(car)
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to fetch car' });
        }
    }
    
    async createCar(req: Request, res: Response) {
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
            await carService.createCar(        
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
            );
            
            res.status(201).json({ message: 'Car created successfully' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to create car' });
        }
    };
    
    async updateCar(req: Request, res: Response) {
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
            await carService.updateCar(     
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
            );
    
            res.status(201).json({ message: 'Car updated successfully' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to update car' });
        }
    }
    
    async deleteCar(req: Request, res: Response) {
        const id: string = req.params.id;
    
        try {
            const rowsDeleted = await carService.deleteCar(id);
    
            if (rowsDeleted === 0) {
                return res.status(404).json({ message: 'Car not found' })
            }
      
            res.status(201).json({ message: 'Car deleted successfully' })
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to delete car' });
        }
    }
}

export default new CarController();