import express, { Request, Response, NextFunction } from 'express';
import cors, { CorsOptions } from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { json } from 'body-parser';
import ormConfig from './config/data-source';
import dotenv from 'dotenv';
import routes from '../src/routes';

dotenv.config();
const app = express();

// Connect ke DB
ormConfig
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })

// Middleware
const corsOptions: CorsOptions = {
    origin: '*', // allow all origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // allow these HTTP methods
    preflightContinue: false,
    optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.use(helmet());
app.use(json());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// Routes
app.use(routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.statusCode = 500;
    res.end((res as any).sentry + "\n");
});

const port = parseInt(process.env.PORT || '3000', 10);
const ip = process.env.IP || '0.0.0.0';

if (process.env.NODE_ENV === 'development') {
    app.listen(port, ip, () => {
        console.log(`Server start: http://${ip}:${port}`);
    });
} else {
    app.listen(port, () => {
        console.log('Server start');
    });
}

