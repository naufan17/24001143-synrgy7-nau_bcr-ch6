import { transaction } from 'objection';
import Order from '../models/Order';
import Customer from '../models/Customer';

class OrderRepository {
    async findAll() {
        return await Order.query().withGraphFetched('[cars, customers]');
    }

    async findById(id: string) {
        return await Order.query().findById(id).withGraphFetched('[cars, customers]');
    }

    async create(
        id: string,
        car_id: string,
        user_id: string,
        name: string,
        email: string,
        address: string,
        duration: number,
        rent_start: Date,
        rent_end: Date,
        total_price: number
    ) {
        return await transaction(Order.knex(), async (trx) => {
            const customer = await Customer.query(trx).insert({
                id: user_id,
                name,
                email,
                address,
            });

            await Order.query(trx).insert({
                id,
                car_id,
                customer_id: customer.id,
                duration,
                rent_start,
                rent_end,
                total_price,
                status: "Rented"
            });
        });
    }

    async update(
        id: string,
        car_id: string,
        user_id: string,
        name: string,
        email: string,
        address: string,
        duration: number,
        rent_start: Date,
        rent_end: Date,
        total_price: number
    ) {}

    async delete(id: string, customer_id: string) {
        return await transaction(Order.knex(), async (trx) => {
            await Order.query(trx).deleteById(id);
            return await Customer.query(trx).deleteById(customer_id);
        });
    }
}

export default new OrderRepository();