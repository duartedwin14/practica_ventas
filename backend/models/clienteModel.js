import { db } from '../config/db.js';

export const getClientes = (callback) => {
  db.query('SELECT * FROM clientes', callback);
};

export const addCliente = (cliente, callback) => {
  db.query('INSERT INTO clientes SET ?', cliente, callback);
};
