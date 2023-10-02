import { pool } from "../db.js"


export const obtenerArticulos = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM `articulos`');
        res.json(rows);
    } catch (error) {
        return res.status(500).json({ message: "Algo salio mal al obtener TODOS los articulos" });
    }
};

export const obtenerArticulo = async (req, res) => {
    try {
        const { id } = req.param
        const [rows] = await pool.query('SELECT * FROM articulos WHERE id = ?' ,[
            id,
        ]);

        if (rows.length <= 0) {
            return res.status(400).json({ message: "Articulo no encontrado" })
        }

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: "Algo salio mal al solicitar el articulo" });    }
};

export const borrarArticulo = async (req, res) => {
    try {
        const { id } = req.param
        const [rows] = await pool.query('SELECT * FROM articulos WHERE id = ?' ,[
            id,
        ]);

        if (rows.length <= 0) {
            return res.status(400).json({ message: "Articulo no encontrado" })
        }

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: "Algo salio mal al solicitar el empleado" });    }
};

export const crearArticulo = async (req, res) => {
    try {
        const {nombre, precio, stock} = req.body;
        const [rows] = await pool.query(
            "INSERT INTO articulos (nombre, precio, stock) VALUES (?, ?, ?)",
            [nombre, precio, stock]
        );
        res.status(201).json({ id: rows,insertId, nombre, precio, stock });
    } catch (error) {
        return res.status(500).json({ message: "Algo salio mal al ELIMINAR un articulo"})
    }
}

export const actualizarArticulo = async (req, res) => {
    try {
      const { id } = req.params;
      const {nombre, precio, stock} = req.body;
  
      const [result] = await pool.query(
        "UPDATE articulos SET name = IFNULL(?, nombre), precio = IFNULL(?, precio), stock = IFNULL(?, stock) WHERE id = ?",
        [nombre, precio, stock, id]
      );
  
      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Articulo no encontrado" });
  
      const [rows] = await pool.query("SELECT * FROM articulos WHERE id = ?", [
        id,
      ]);
  
      res.json(rows[0]);
    } catch (error) {
      return res.status(500).json({ message: "Algo salio mal" });
    }
  };
  