import { Router } from 'express';
import RoutesApi from '../routes/api';


const routes = Router();


routes.use('/api', RoutesApi);

export default routes;