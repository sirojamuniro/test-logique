import { Router } from 'express';
import apiV1 from '../../routes/api/v1';


const routes = Router();


routes.use('/v1', apiV1);

export default routes;