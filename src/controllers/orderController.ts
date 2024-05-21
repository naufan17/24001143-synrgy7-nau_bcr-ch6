import { Request, Response } from 'express';
import Controller from './Controller';
import OrderService from '../services/OrderService';

class OrderController extends Controller {
    public getOrder = async (req: Request, res: Response) => {
        try {
            const orders = await OrderService.getAllOrders();
    
            if (!orders) {
                return this.handleNotFound(res, 'Order not found');
            }
        
            this.handleSuccess(res, orders )
        } catch (err) {
            this.handleError(res, err, 'Failed to fetch order');
        }
    }
    
    public getOrderById = async (req: Request, res: Response) => {
        const id: string = req.params.id;
    
        try {
            const orders = await OrderService.getOrderById(id);
    
            if (!orders) {
                return this.handleNotFound(res, 'Order not found');
            }
        
            this.handleSuccess(res, orders )
        } catch (err) {
            this.handleError(res, err, 'Failed to fetch order');
        }
    }
    
    public createOrder = async (req: Request, res: Response) => {
        const {
            car_id,
            name,
            email,
            address,
            duration,
        } = req.body;
    
        try {
            await OrderService.createOrder(
                car_id, 
                name, 
                email, 
                address, 
                duration
            );
            
            this.handleCreated(res, 'Order created successfully');
        } catch (err) {
            this.handleError(res, err, 'Failed to create order');
        }
    };
    
    public updateOrder = async (req: Request, res: Response) => {
        const {
            car_id,
            name,
            email,
            address,
            duration,
        } = req.body;
    
        try {
            await OrderService.updateOrder(
                car_id, 
                name, 
                email, 
                address, 
                duration
            );
            
            this.handleCreated(res, 'Order updated successfully');
        } catch (err) {
            this.handleError(res, err, 'Failed to update order');
        }
    }
    
    public deleteOrder = async (req: Request, res: Response) => {
        const id: string = req.params.id;
    
        try {
            const order = await OrderService.deleteOrder(id);
    
            if (!order) {
                return this.handleNotFound(res, 'Order not found')
            }
      
            this.handleDeleted(res, 'Order deleted successfully')
        } catch (err) {
            this.handleError(res, err, 'Failed to delete order');
        }
    }
}

export default new OrderController();