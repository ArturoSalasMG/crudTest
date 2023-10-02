import { pool } from "../db.js"

export const obtenerPolizas = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM polizas');
        res.json(rows);
    } catch (error) {
        return res.status(500).json({ message: "Algo salio mal" });
    }
};

export const obtenerPoliza = async (req, res) => {
    try {
        const { id } = req.param
        const [rows] = await pool.query('SELECT * FROM polizas WHERE id = ?' ,[
            id,
        ]);

        if (rows.length <= 0) {
            return res.status(400).json({ message: "Poliza no encontrado" })
        }

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: "Algo salio mal" });    }
};

export const borrarPolizas = async (req, res) => {
    try {
        const { id } = req.param
        const [rows] = await pool.query('SELECT * FROM polizas WHERE id = ?' ,[
            id,
        ]);

        if (rows.length <= 0) {
            return res.status(400).json({ message: "Poliza no encontrado" })
        }

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: "Algo salio mal al solicitar el empleado" });    }
};

//Si funciona el crear Poliza
export const crearPolizas = async (req, res) => {
    try {
        const {nombre, cantidad} = req.body;
        const [rows] = await pool.query(
            "INSERT INTO polizas (nombre, cantidad) VALUES (?, ?)",
            [nombre, cantidad]
        );

        res.status(201).json({ id: rows,insertId, nombre, cantidad });
    } catch (error) {
        return res.status(500).json({ message: "Algo salio mal al Crear la poliza"})
    }
}

export const actualizarPolizas = async (req, res) => {
    try {
      const { id } = req.params;
      const {nombre, precio} = req.body;
  
      const [result] = await pool.query(
        "UPDATE polizas SET name = IFNULL(?, nombre), precio = IFNULL(?, precio) WHERE id = ?",
        [nombre, precio, stock, id]
      );
  
      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Poliza no encontrado" });
  
      const [rows] = await pool.query("SELECT * FROM Polizas WHERE id = ?", [
        id,
      ]);
  
      res.json(rows[0]);
    } catch (error) {
      return res.status(500).json({ message: "Algo salio mal" });
    }
};
  