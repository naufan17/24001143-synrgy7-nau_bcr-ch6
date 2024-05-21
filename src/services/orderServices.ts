import { v4 as uuidv4 } from 'uuid';
import orderRepository from '../repositories/orderRepository';

class orderService {
    async getAllOrders() {
        const orders = await orderRepository.findAll();

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
            customer: {
                name: order.customers.name,
                email: order.customers.email,
                address: order.customers.address,    
            },
            created_at: order.created_at,
            updated_at: order.updated_at,
        }));

        return formattedOrder;
    }

    async getOrderById(id: string) {
        const order = await orderRepository.findById(id);

        // const formattedOrder = {
        //     id: order.id,
        //     duration: order.duration,
        //     rent_start: order.rent_start,
        //     rent_end: order.rent_end,
        //     total_price: order.total_price,
        //     status: order.status,
        //     car: {
        //         manufacture: order.cars.manufacture,
        //         model: order.cars.model,
        //         type: order.cars.type,    
        //     },
        //     customer: {
        //         name: order.customers.name,
        //         email: order.customers.email,
        //         address: order.customers.address,    
        //     },
        //     created_at: order.created_at,
        //     updated_at: order.updated_at,
        // };

        return order;
    }

    async createOrder(
        car_id: string,
        name: string,
        email: string,
        address: string,
        duration: number,
    ) {
        const user_id = uuidv4();
        const order_id = uuidv4();

        // const car = await Rent.query().where('car_id', car_id);
        // const rent_start = new Date();
        // const rent_end = new Date(rent_start.getTime() + duration * 24 * 60 * 60 * 1000);
        // const total_price = car[0].rent_price * duration;

        // await transaction(Order.knex(), async (trx) => {
        //     const customer = await Customer.query(trx).insert({
        //         id: user_id,
        //         name,
        //         email,
        //         address,
        //     });

        //     await Order.query(trx).insert({
        //         id: order_id,
        //         car_id,
        //         customer_id: customer.id,
        //         duration,
        //         rent_start,
        //         rent_end,
        //         total_price,
        //         status: "Rented"
        //     });
        // });

    }
    
    async updateOrder() {}

    async deleteOrders() {}
}

export default new orderService();