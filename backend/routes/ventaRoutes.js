import express from 'express';
import { obtenerVentas, registrarVenta } from '../controllers/ventasController.js';

const router = express.Router();

router.get('/', obtenerVentas);
router.post('/', registrarVenta);

export default router;


