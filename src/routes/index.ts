import { Request, Response, NextFunction } from 'express';
import express, { Express } from 'express';
import morgan from 'morgan';
import carRoute from './carRoute';
import orderRoute from './orderRoute';
import userRoute from './userRoute';

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'));

app.use('/api', carRoute);
app.use('/api', orderRoute);
app.use('/api', userRoute);

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({ error: 'Route Not Found' });
});

export default app;