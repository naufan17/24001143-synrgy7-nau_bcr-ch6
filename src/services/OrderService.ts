import { v4 as uuidv4 } from 'uuid';
import OrderRepository from '../repositories/OrderRepository';
import CarRepository from '../repositories/CarRepository';

class OrderService {
    async getAllOrders() {
        const orders = await OrderRepository.findAll();

        if (!orders) {
            return null;
        }

        const formattedOrder = orders.map((order: any) => ({
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
            },
            created_at: order.created_at,
            updated_at: order.updated_at,
        }));

        return formattedOrder;
    }

    async getOrderByUser(user_id: string) {
        const orders = await OrderRepository.findByUser(user_id);

        if (!orders) {
            return null;
        }

        const formattedOrder = orders.map((order: any) => ({
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
            },
            created_at: order.created_at,
            updated_at: order.updated_at,
        }));
        
        return formattedOrder;
    }

    async getOrderById(id: string) {
        const order = await OrderRepository.findById(id);

        if (!order) {
            return null;
        }

        let formattedOrder = {}
        if(order){
            formattedOrder = {
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
                },
                created_at: order.created_at,
                updated_at: order.updated_at,
            };    
        }
        
        return formattedOrder;
    }

    async createOrder(
        car_id: string,
        user_id: string,
        duration: number,
    ) {
        const id = uuidv4();
        const rent_start = new Date();
        const rent_end = new Date(rent_start.getTime() + duration * 24 * 60 * 60 * 1000);
        const car = await CarRepository.findById(car_id);
        let total_price = 0;
        
        if(car){
            total_price = car.rents.rent_price * duration;
        }

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
    
    async updateOrder(
        car_id: string,
        name: string,
        email: string,
        address: string,
        duration: number,
    ) {}

    async deleteOrder(id: string) {
        return await OrderRepository.delete(id);
    }
}

export default new OrderService();