import { Response } from 'express';
import Controller from './Controller';
import OrderService from '../services/OrderService';
import { AdminOrUserRequest, AdminRequest, UserRequest } from '../interfaces/AuthRequest';

class OrderController extends Controller {
    public getOrder = async (req: AdminOrUserRequest | any, res: Response): Promise<void> => {
        const user = req.user;
        const admin = req.admin;
        let orders;

        try {
            if (user) {
                orders = await OrderService.getOrderByUser(user.id);
            } else if (admin) {
                orders = await OrderService.getAllOrders();
            }
    
            if (!orders || orders.length === 0) {
                return this.handleNotFound(res, 'Order not found');
            }
        
            this.handleSuccess(res, { orders })
        } catch (err) {
            this.handleError(res, err, 'Failed to fetch order');
        }
    }
    
    public getOrderById = async (req: AdminOrUserRequest | any, res: Response): Promise<void> => {
        const id: string = req.params.id;
        const user = req.user;
        const admin = req.admin;
        let order;
    
        try {
            if (user) {
                order = await OrderService.getOrderByIdUser(id, user.id);
            } else if (admin) {
                order = await OrderService.getOrderById(id);
            }
    
            if (!order) {
                return this.handleNotFound(res, 'Order not found');
            }
        
            this.handleSuccess(res, order)
        } catch (err) {
            this.handleError(res, err, 'Failed to fetch order');
        }
    }
    
    public createOrder = async (req: UserRequest | any, res: Response): Promise<void> => {
        const { car_id, duration } = req.body;
        const user = req.user;

        try {
            if (user) {
                const user_id: string = user.id;

                const order = await OrderService.createOrder(
                    car_id,
                    user_id,
                    duration
                );
    
                if (!order) {
                    return this.handleNotFound(res, 'Car not available');
                }
            }
            
            this.handleCreated(res, 'Order created successfully');
        } catch (err) {
            this.handleError(res, err, 'Failed to create order');
        }
    }
    
    public updateOrder = async (req: AdminRequest, res: Response): Promise<void> => {
        const id: string = req.params.id;
        const { status } = req.body;
    
        try {
            await OrderService.updateOrder( id, status );
            
            this.handleCreated(res, 'Order updated successfully');
        } catch (err) {
            this.handleError(res, err, 'Failed to update order');
        }
    }
}

export default new OrderController();