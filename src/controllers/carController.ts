import { Request, Response } from 'express';
import Controller from './Controller';
import carService from '../services/CarService';

class CarController extends Controller {
    public getCar = async (req: Request, res: Response) => {
        try {
            const cars = await carService.getAllCars();
    
            if (!cars) {
                return this.handleNotFound(res, 'Car not found');
            }
    
            this.handleSuccess(res, { cars: cars })
        } catch (err) {
            this.handleError(res, err, 'Failed to fetch car');
        }
    }
    
    public getCarById = async (req: Request, res: Response) => {
        const id: string = req.params.id;
        
        try {
            const car = await carService.getCarById(id);
    
            if (!car) {
                return this.handleNotFound(res, 'Car not found');
            }
    
            this.handleSuccess(res, car)
        } catch (err) {
            this.handleError(res, err, 'Failed to fetch car');
        }
    }
    
    public createCar = async (req: Request, res: Response) => {
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
            
            this.handleCreated(res, 'Car created successfully');
        } catch (err) {
            this.handleError(res, err, 'Failed to create car');
        }
    };
    
    public updateCar = async (req: Request, res: Response) => {
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
    
            this.handleCreated(res, 'Car updated successfully');
        } catch (err) {
            this.handleError(res, err, 'Failed to update car');
        }
    }
    
    public deleteCar = async (req: Request, res: Response) => {
        const id: string = req.params.id;
    
        try {
            const car = await carService.deleteCar(id);
    
            if (!car) {
                return this.handleNotFound(res, 'Car not found')
            }

            this.handleDeleted(res, 'Car deleted successfully')
        } catch (err) {
            this.handleError(res, err, 'Failed to delete car')
        }
    }
}

export default new CarController();