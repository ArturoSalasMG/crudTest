import { pool } from "../db.js";


export const obtenerArticulos = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM articulos");
        //res.json(rows);
        //Al final mando toda mi informacion al RENDER
        res.render("../views/index.ejs", {tituloWeb: "Pagina Articulos", rows: rows});
      } catch (error) {
        return res.status(500).json({ message: "salio mal al buscar todos los articulos" });
      }
};

export const obtenerArticulo = async (req, res) => {
    try {
      const { id } = req.params;
        const [rows] = await pool.query('SELECT * FROM articulos WHERE id = ?' ,[id]);

        if (rows.length <= 0) {
            return res.status(400).json({ message: "Articulo no encontrado" })
        }
        
        res.render("../views/index.ejs", {tituloWeb: "Pagina Articulos", rows: rows});
        //res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: "Algo salio mal al solicitar el articulo" });    }
};

export const borrarArticulo = async (req, res) => {
  try {
      const { id } = req.params;
      const [result] = await pool.query('DELETE FROM articulos WHERE id = ?', [id]);
      if (result.affectedRows === 0) {
          return res.status(404).json({ message: "Articulo no encontrado" });
      }
      res.redirect('../../articulos/'); 
  } catch (error) {
      return res.status(500).json({ message: "Algo salió mal al eliminar el artículo" });
  }
};

export const crearArticulo = async (req, res) => {
  try {
      const { nombre, precio, stock } = req.body;
      const [rows] = await pool.query(
          "INSERT INTO articulos (nombre, precio, stock) VALUES (?, ?, ?)",
          [nombre, precio, stock]
      );
      res.redirect('../api/articulos');
      console.log(req.body);
      // va a enviar "Articulo Agregado" como respuesta en lugar de renderizar
    } catch (error) {
      console.error(error); // Imprime el error en la consola para debug
      return res.status(500).json({ message: "Algo salió mal al crear un artículo" });
  }
}

export const actualizarArticulo = async (req, res) => {
    try {
      const { id } = req.params.id;
      const {nombre, precio, stock} = req.body;
  
      const [result] = await pool.query(
        "UPDATE articulos SET nombre = IFNULL(?, nombre), precio = IFNULL(?, precio), stock = IFNULL(?, stock) WHERE id = ?",
        [nombre, precio, stock, id]
      );
  
      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Articulo no encontrado" });
  
      const [rows] = await pool.query("SELECT * FROM articulos WHERE id = ?", [
        id,
      ]);
  
      res.json(rows[0]); //deberia cambiar a un redirect a la rama principal
    } catch (error) {
      return res.status(500).json({ message: "Algo salio mal" });
    }
  };
  