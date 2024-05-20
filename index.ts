import './src/config/database';
import express, { Express, Request, Response, NextFunction } from 'express';
import carRoute from './src/routes/carRoute';
import orderRoute from './src/routes/orderRoute';

const port: number = Number(process.env.PORT) || 5000;
const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', carRoute);
app.use('/api', orderRoute);

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({ error: 'Route Not Found' });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});