CREATE DATABASE IF NOT EXISTS clientes_db;

USE clientes_db;

CREATE TABLE clientes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100),
  email VARCHAR(100),
  telefono VARCHAR(20)
);

CREATE TABLE productos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre_prod VARCHAR(100),
  stock int,
  valor decimal(10, 2)
);

CREATE TABLE ventas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_cliente INT NOT NULL,
  id_producto INT NOT NULL,
  cantidad INT NOT NULL,
  precio_unitario DECIMAL(10,2) NOT NULL,
  total DECIMAL(10,2),
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_cliente) REFERENCES clientes(id),
  FOREIGN KEY (id_producto) REFERENCES productos(id)
);

ALTER TABLE ventas MODIFY COLUMN total DECIMAL(10,2);

Opción 1: Dejar que MySQL calcule el total automáticamente
Paso 1: No incluyas total en tu INSERT
Cambia esto en tu archivo ventaModel.js:
'INSERT INTO ventas (id_cliente, id_producto, cantidad, precio_unitario) VALUES (?, ?, ?, ?)',
[id_cliente, id_producto, cantidad, precio],
Y elimina esta línea porque ya no la necesitas:
const total = precio * cantidad;

Opción 2: Cambiar la tabla y quitar el cálculo automático de total
Si prefieres calcular el total desde tu código JavaScript, modifica la tabla ventas con este comando SQL:
ALTER TABLE ventas MODIFY COLUMN total DECIMAL(10,2);
Con eso, el campo total dejará de ser generado automáticamente y podrás insertar el valor desde Node.js como lo hacías:
const total = precio * cantidad;
...
[precio, total]