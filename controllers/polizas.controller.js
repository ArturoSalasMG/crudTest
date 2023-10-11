import { pool } from "../db.js"
//todo lo que esta aqui es por parte del Servidor
export const obtenerPolizas = async (req, res) => {
    try {
        // Consulta para obtener todas las pólizas
        const [polizasRows] = await pool.query('SELECT polizas.id AS id_poliza, polizas.nombre AS nombre_poliza, polizas.cantidad, articulos.id AS id_articulo, articulos.nombre AS nombre_articulo FROM polizas INNER JOIN articulos ON polizas.idarticulo = articulos.id');
                
        // Consulta para obtener todos los artículos
        const [articulosRows] = await pool.query('SELECT id AS id_articulo, nombre AS nombre_articulo FROM articulos');
        
        const data = {
            polizas: polizasRows,
            articulos: articulosRows
        };
        
        res.render("polizas", { tituloWeb: "Página Polizas", data });
    } catch (error) {
        return res.status(500).json({ message: "Algo salió mal" });
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
        const { id } = req.params;
        const [polizaInfo] = await pool.query('SELECT nombre, cantidad, idarticulo FROM polizas WHERE id = ?', [id]);

        // Verifica si la póliza existe
        if (polizaInfo.length === 0) {
            return res.status(400).json({ message: "Póliza no encontrada" });
        }

        await pool.query('DELETE FROM polizas WHERE id = ?', [id]);
        await pool.query(
            "INSERT INTO movimientos (nombre, cantidad, idarticulo) VALUES (?, ?, ?)",
            ['ENCONTRADO', polizaInfo[0].cantidad, polizaInfo[0].idarticulo]
        );

        // Realiza una actualización en la tabla "articulos" para restar la cantidad de la póliza al stock
        await pool.query(
            "UPDATE articulos SET stock = stock + ? WHERE id = ?",
            [polizaInfo[0].cantidad, polizaInfo[0].idarticulo]
        );

        //res.json(rows[0]);
        res.redirect('../../polizas/'); 
    } catch (error) {
        return res.status(500).json({ message: "Algo salio mal al solicitar el empleado" });
    }
};

//Si funciona el crear Poliza
export const crearPolizas = async (req, res) => {
    try {
        const {nombre, cantidad, idarticulo} = req.body;

        const [articulo] = await pool.query('SELECT * FROM articulos WHERE id = ?' ,[idarticulo]);

        const stockDisponible = articulo[0].stock;

        if (cantidad > stockDisponible) {
            return res.status(400).json({ message: "La cantidad ingresada es mayor que el stock disponible" });
        }

        await pool.query(
            "INSERT INTO polizas (nombre, cantidad, idarticulo) VALUES (?, ?, ?)",
            [nombre, cantidad, idarticulo]
        );

        await pool.query(
            "INSERT INTO movimientos (nombre, cantidad, idarticulo) VALUES (?, ?, ?)",
            [nombre, cantidad, idarticulo]
        );

        await pool.query(
            "UPDATE articulos SET stock = stock - ? WHERE id = ?",
            [cantidad, idarticulo]
        );

        res.redirect('../api/polizas');
        //res.status(201).json({ id: rows,insertId, nombre, cantidad });
    } catch (error) {
        return res.status(500).json({ message: "Algo salio mal al Crear la poliza"})
    }
}

export const actualizarPolizas = async (req, res) => {
    try {
      const { id } = req.params;
      const {nombre, precio} = req.body;
  
      const [result] = await pool.query(
        "UPDATE articulos SET  = IFNULL(?, nombre), precio = IFNULL(?, precio) WHERE id = ?",
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
  