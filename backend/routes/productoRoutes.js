import express from 'express';
import { crearProducto, obtenerProductos } from '../controllers/productoController.js';

const router = express.Router();

router.get('/', obtenerProductos);
router.post('/', crearProducto);

export default router;