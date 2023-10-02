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
    descripcion.value = ''
    precio.value = ''
    stock.value = ''
    modalArticulo.show()
    opcion = 'crear'
});

const mostrar = (articulos) => {
    articulos.forEach(articulo => {
        resultados += ` <tr>
        <td>${articulo.id}</td>
        <td>${articulo.descripcion}</td>
        <td>${articulo.precio}</td>
        <td>${articulo.stock}</td>
        <td><a class="btnBorrar btn btn-danger"></a></td>
        </tr>
        `
    });
    contenedor.innerHTML = resultados;
}

fetch(url)
    .then( response => response.json() )
    .then(data => mostrar(data))
    .catch(error => console.log(error))
