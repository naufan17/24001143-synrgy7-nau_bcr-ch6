import { transaction, Transaction } from 'objection';
import Order from '../models/Order';
import Car from '../models/Car';

class OrderRepository {
    async findAll(): Promise<Order[]> {
        return await Order.query().withGraphFetched('[cars, users]');
    }
    
    async findByUser(user_id: string): Promise<Order[]> {
        return await Order.query().where('user_id', user_id).withGraphFetched('[cars]');
    }

    async findById(id: string): Promise<Order | undefined> {
        return await Order.query().findById(id).withGraphFetched('[cars, users]');
    }

    async findByIdUser(id: string): Promise<Order | undefined> {
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
    ): Promise<void> {
        return await transaction(Order.knex(), async (trx: Transaction) => {
            await Order.query(trx).insert({
                id,
                car_id,
                user_id,
                duration,
                rent_start,
                rent_end,
                total_price,
                status: "Rented"
            });

            await Car.query(trx).findById(car_id).update({
                available: false
            })
        })
    }

    async update(id: string, status: string, updated_at: Date): Promise<void> {
        return await transaction(Order.knex(), async (trx: Transaction) => {
            const order = await Order.query(trx).findById(id)

            if(order) {
                await Order.query(trx).findById(id).update({
                    id,
                    status,
                    updated_at
                })
    
                await Car.query(trx).findById(order.car_id).update({
                    available: true
                })
            }
        })
    }
}

export default new OrderRepository();