import { db } from '../config/db.js';

export const registrarVenta = (venta, callback) => {
  const { id_cliente, id_producto, cantidad } = venta;

  db.query('SELECT precio, stock FROM productos WHERE id = ?', [id_producto], (err, results) => {
    if (err) return callback(err);

    if (results.length === 0) {
      return callback(new Error('Producto no encontrado'));
    }

    const { precio, stock } = results[0];

    if (cantidad > stock) {
      return callback(new Error('Stock insuficiente'));
    }

    const total = precio * cantidad;

    db.query(
      'INSERT INTO ventas (id_cliente, id_producto, cantidad, precio_unitario, total) VALUES (?, ?, ?, ?, ?)',
      [id_cliente, id_producto, cantidad, precio, total],
      (err, resultado) => {
        if (err) return callback(err);

        // Actualizar el stock del producto
        db.query('UPDATE productos SET stock = stock - ? WHERE id = ?', [cantidad, id_producto], (err2) => {
          if (err2) return callback(err2);
          callback(null, resultado);
        });
      }
    );
  });
};

export const obtenerVentas = (callback) => {
  db.query(`
    SELECT v.id, c.nombre AS cliente, p.nombre_prod AS producto,
           v.cantidad, v.precio_unitario, v.total, v.fecha
    FROM ventas v
    JOIN clientes c ON v.id_cliente = c.id
    JOIN productos p ON v.id_producto = p.id
    ORDER BY v.fecha DESC
  `, (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};


