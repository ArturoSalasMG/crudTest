
const url = 'http://localhost:3000/api/articulos'; //GET
const contenedor = document.querySelector('tbody');

let resultados = '';
let modalArticulo = new bootstrap.Modal(document.getElementById('modalArticulo'));
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
    .then(response => response.json())
    .then(data => {
        console.log(data); // Colocar la impresión dentro de esta función
        mostrar(data);
    })
    .catch(error => console.log(error));

fetch('https://jsonplaceholder.typicode.com/posts')
    .then( response => response.json() )
    .then(data => {console.log(data);})
.catch(error => console.log(error))

//https://jsonplaceholder.typicode.com/posts

