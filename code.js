const url = 'http://localhost:3000/api/articulos';
const contenedor = document.querySelector('tbody');
let resultados = '';

const modalArticulo = new bootstrap.Modal(document.getElementById('modalArticulo'));
const formArticulo = document.querySelector('form')
const descripcion =  document.getElementById('descripcion');
const precio =  document.getElementById('precio');
const stock = document.getElementById('stock');

let opcion = '';

btnCrear.addEventListener('click', () => {
    nombre.value = '';
    precio.value = '';
    stock.value = '';
    modalArticulo.show(); //abre modal
    opcion = 'crear';
});

const mostrar = (articulos) => {
    articulos.forEach(articulo => {
        resultados += ` <tr>
        <td class="text-center">${articulo.id}</td>
        <td class="text-center">${articulo.nombre}</td>
        <td class="text-center">${articulo.precio}</td>
        <td class="text-center">${articulo.stock}</td>
        <td class="text-center"><a class="btnBorrar btn btn-danger">Borrar</a></td>
        </tr>
        `
    });
    contenedor.innerHTML = resultados;
}

fetch(url)
    .then( response => response.json() )
    .then(data => mostrar(data))
    .catch(error => console.log(error))
