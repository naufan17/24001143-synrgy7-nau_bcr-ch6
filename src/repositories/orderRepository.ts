import Order from '../models/Order';

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
    }

    async update(
        id: string,
        status: string,
    ) {
        const updated_at = new Date();

        await Order.query().findById(id).update({
            id,
            status,
            updated_at
        });
    }
}

export default new OrderRepository();