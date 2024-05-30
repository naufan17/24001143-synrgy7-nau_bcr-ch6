import { v4 as uuidv4 } from 'uuid';
import OrderRepository from '../repositories/OrderRepository';
import CarRepository from '../repositories/CarRepository';

interface FormattedCar {
    manufacture: string;
    model: string;
    type: string;
}

interface FormattedUser {
    name: string;
    email: string;
    address: string;
    phone_number: string;
}

interface FormattedOrderDetail {
    id: string;
    duration: number;
    rent_start: Date;
    rent_end: Date;
    total_price: number;
    status: string;
    car: FormattedCar;
    user: FormattedUser;
    created_at: Date;
    updated_at: Date;
}

interface FormattedOrder {
    id: string;
    manufacture: string,
    model: string,
    type: string,    
    duration: number;
    rent_start: Date;
    rent_end: Date;
    total_price: number;
    status: string;
    created_at: Date;
}

class OrderService {
    async getAllOrders(): Promise<FormattedOrderDetail[] | null> {
        const orders = await OrderRepository.findAll();

        if (!orders) {
            return null;
        }

        const formattedOrder: FormattedOrderDetail[] = orders.map((order: any) => ({
            id: order.id,
            duration: order.duration,
            rent_start: order.rent_start,
            rent_end: order.rent_end,
            total_price: order.total_price,
            status: order.status,
            car: {
                manufacture: order.cars.manufacture,
                model: order.cars.model,
                type: order.cars.type,    
            },
            user: {
                name: order.users.name,
                email: order.users.email,
                address: order.users.address,    
                phone_number: order.users.phone_number,    
            },
            created_at: order.created_at,
            updated_at: order.updated_at,
        }));

        return formattedOrder;
    }

    async getOrderByUser(user_id: string): Promise<FormattedOrder[] | null> {
        const orders = await OrderRepository.findByUser(user_id);

        if (!orders) {
            return null;
        }

        const formattedOrder: FormattedOrder[] = orders.map((order: any) => ({
            id: order.id,
            manufacture: order.cars.manufacture,
            model: order.cars.model,
            type: order.cars.type,    
            duration: order.duration,
            rent_start: order.rent_start,
            rent_end: order.rent_end,
            total_price: order.total_price,
            status: order.status,
            created_at: order.created_at,
        }));
        
        return formattedOrder;
    }

    async getOrderById(id: string): Promise<FormattedOrderDetail | null> {
        const order = await OrderRepository.findById(id);

        if (!order) {
            return null;
        }

        const formattedOrder: FormattedOrderDetail = {
            id: order.id,
            duration: order.duration,
            rent_start: order.rent_start,
            rent_end: order.rent_end,
            total_price: order.total_price,
            status: order.status,
            car: {
                manufacture: order.cars.manufacture,
                model: order.cars.model,
                type: order.cars.type,    
            },
            user: {
                name: order.users.name,
                email: order.users.email,
                address: order.users.address,
                phone_number: order.users.phone_number,    
            },
            created_at: order.created_at,
            updated_at: order.updated_at,
        };    
        
        return formattedOrder;
    }

    async getOrderByIdUser(id: string, user_id: string): Promise<FormattedOrder | null>  {
        const order = await OrderRepository.findByIdUser(id);

        if (!order) {
            return null;
        } else if (order.user_id !== user_id) {
            return null;
        }

        const formattedOrder: FormattedOrder = {
            id: order.id,
            manufacture: order.cars.manufacture,
            model: order.cars.model,
            type: order.cars.type,    
            duration: order.duration,
            rent_start: order.rent_start,
            rent_end: order.rent_end,
            total_price: order.total_price,
            status: order.status,
            created_at: order.created_at
        }
        
        return formattedOrder;
    }

    async createOrder(car_id: string, user_id: string, duration: number): Promise<void | null> {
        const car = await CarRepository.findById(car_id);

        if (!car || !car.available) {
            return null;
        }

        const id = uuidv4();
        const rent_start = new Date();
        const rent_end = new Date(rent_start.getTime() + duration * 24 * 60 * 60 * 1000);
        const total_price = car.rent_price * duration;
        
        return await OrderRepository.create(
            id,
            car_id,
            user_id,
            duration,
            rent_start,
            rent_end,
            total_price
        )    
    }
    
    async updateOrder(id: string, status: string): Promise<void> {
        const updated_at = new Date();

        return await OrderRepository.update(id, status, updated_at)
    }
}

export default new OrderService();