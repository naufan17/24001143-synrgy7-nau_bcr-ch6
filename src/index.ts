import { Request, Response } from 'express';
import express, { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs'
import morgan from 'morgan';
import routes from './routes/routes';
import cors from 'cors';
import './config/database';

const openAPIDocument = YAML.load('././openapi.yaml');
const port: number = Number(process.env.PORT) || 5000;
const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'));

// Routes
app.use('/api', cors(), routes)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openAPIDocument));
app.use((req: Request, res: Response) => {
    res.status(404).json({ error: 'Route Not Found' });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

export default app;