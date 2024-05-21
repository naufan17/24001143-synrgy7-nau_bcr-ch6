import { Request, Response } from 'express';
import { transaction } from 'objection';
import { v4 as uuidv4 } from 'uuid';
import orderServices from '../services/orderServices';
import Order from '../models/Order';
import Customer from '../models/Customer';
import Rent from '../models/Rent';

class orderController {
    async getOrder(req: Request, res: Response) {
        try {
            const orders = await orderServices.getAllOrders();
    
            if (!orders || orders.length === 0) {
                return res.status(404).json({ message: 'Order not found' });
            }
        
            res.status(200).json({ orders: orders })
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to fetch order' });
        }
    }
    
    async getOrderById(req: Request, res: Response) {
        const id: string = req.params.id;
    
        try {
            const order = await Order.query().findById(id).withGraphFetched('[cars, customers]');
    
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }
        
            res.status(200).json(order)
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to fetch order' });
        }
    }
    
    async createOrder(req: Request, res: Response) {
        const {
            car_id,
            name,
            email,
            address,
            duration,
        } = req.body;
    
        try {
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
            
            res.status(201).json({ message: 'Order created successfully' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to create order' });
        }
    };
    
    async updateOrder(req: Request, res: Response) {
    }
    
    async deleteOrder(req: Request, res: Response) {
        const id: string = req.params.id;
    
        try {
            const rowsDeleted = await transaction(Order.knex(), async (trx) => {
                const order = await Order.query(trx).findById(id);
    
                if (!order) {
                    res.status(404).json({ message: 'Order not found' });
                    return
                }
    
                await Order.query(trx).deleteById(id);
                return await Customer.query(trx).deleteById(order.customer_id);
            });
    
            if (rowsDeleted === 0) {
                res.status(404).json({ message: 'Order not found' });
                return
            }
      
            res.status(201).json({ message: 'Order deleted successfully' })
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to delete order' });
        }
    }
}

export default new orderController();