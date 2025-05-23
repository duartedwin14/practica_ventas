import { db } from '../config/db.js';

export const getProductos = (callback) => {
  db.query('SELECT * FROM productos', callback);
};

export const addProducto = (producto, callback) => {
  db.query('INSERT INTO productos SET ?', producto, callback);
};