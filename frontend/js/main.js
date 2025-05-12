const API_URL = 'http://localhost:3000/api/clientes';

document.getElementById('formCliente').addEventListener('submit', async (e) => {
  e.preventDefault();
  const nombre = document.getElementById('nombre').value;
  const email = document.getElementById('email').value;
  const telefono = document.getElementById('telefono').value;

  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, email, telefono })
  });

  document.getElementById('formCliente').reset();
  cargarClientes();
});

async function cargarClientes() {
  const res = await fetch(API_URL);
  const datos = await res.json();

  const tabla = document.getElementById('tablaClientes');
  tabla.innerHTML = '';
  datos.forEach(cliente => {
    tabla.innerHTML += `
      <tr>
        <td>${cliente.id}</td>
        <td>${cliente.nombre}</td>
        <td>${cliente.email}</td>
        <td>${cliente.telefono}</td>
      </tr>
    `;
  });
}

cargarClientes();
