import { pool } from "../db.js"

export const obtenerMovimientos = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM movimientos');
        res.json(rows);
    } catch (error) {
        return res.status(500).json({ message: "Algo salio mal" });
    }
};

export const obtenerMovimiento = async (req, res) => {
    try {
        const { id } = req.param
        const [rows] = await pool.query('SELECT * FROM movimientos WHERE id = ?' ,[
            id,
        ]);

        if (rows.length <= 0) {
            return res.status(400).json({ message: "Movimiento no encontrado" })
        }

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: "Algo salio mal" });    }
};

export const borrarMovimientos = async (req, res) => {
    try {
        const { id } = req.param
        const [rows] = await pool.query('SELECT * FROM movimientos WHERE id = ?' ,[
            id,
        ]);

        if (rows.length <= 0) {
            return res.status(400).json({ message: "Movimiento no encontrado" })
        }

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: "Algo salio mal al solicitar el movimiento" });    }
};

export const crearMovimientos = async (req, res) => {
    try {
        const {nombre, cantidad} = req.body;
        const [rows] = await pool.query(
            "INSERT INTO movimientos (nombre, cantidad) VALUES (?, ?)",
            [nombre, cantidad]
        );
        res.status(201).json({ id: rows,insertId, nombre, precio, stock });
    } catch (error) {
        return res.status(500).json({ message: "Algo salio mal al ELIMINAR un movimiento"})
    }
}

export const actualizarMovimientos = async (req, res) => {
    try {
      const { id } = req.params;
      const {nombre, precio} = req.body;
  
      const [result] = await pool.query(
        "UPDATE movimientos SET name = IFNULL(?, nombre), cantidad = IFNULL(?, cantidad) WHERE id = ?",
        [nombre, cantidad, id]
      );
  
      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Movimiento no encontrado" });
  
      const [rows] = await pool.query("SELECT * FROM movimientos WHERE id = ?", [
        id,
      ]);
  
      res.json(rows[0]);
    } catch (error) {
      return res.status(500).json({ message: "Algo salio mal" });
    }
};
  