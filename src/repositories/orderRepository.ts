import { transaction } from 'objection';
import Order from '../models/Order';
import Rent from '../models/Rent';

class OrderRepository {
    async findAll() {
        return await Order.query().withGraphFetched('[cars, users]');
    }
    
    async findByUser(user_id: string) {
        return await Order.query().where('user_id', user_id).withGraphFetched('[cars]');
    }

    async findById(id: string) {
        return await Order.query().findById(id).withGraphFetched('[cars, users]');
    }

    async findByIdUser(id: string) {
        return await Order.query().findById(id).withGraphFetched('[cars]');
    }


    async create(
        id: string,
        car_id: string,
        user_id: string,
        duration: number,
        rent_start: Date,
        rent_end: Date,
        total_price: number
    ) {
        return await transaction(Order.knex(), async (trx) => {
            await Order.query().insert({
                id,
                car_id,
                user_id,
                duration,
                rent_start,
                rent_end,
                total_price,
                status: "Rented"
            });

            await Rent.query(trx).where('car_id', car_id).update({
                available: false
            })
        })
    }

    async update(
        id: string,
        status: string,
    ) {
        const updated_at = new Date();

        return await transaction(Order.knex(), async (trx) => {
            const order = await Order.query().findById(id)

            await Order.query().findById(id).update({
                id,
                status,
                updated_at
            })

            if(order) {
                await Rent.query(trx).where('car_id', order.car_id).update({
                    available: true
                })
            }
        })
    }
}

export default new OrderRepository();