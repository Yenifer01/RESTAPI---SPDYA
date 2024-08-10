import {getConnection} from "./../database/database";
import { AlimentoModel } from "./../models/alimentoModel";

const getAlimentos = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query(`
            SELECT 
                a.id_alimento,
                a.codigo,
                a.nombre,
                g.nombre AS grupo,
                a.energia_kcal,
                a.energia_kj,
                a.agua_g,
                a.proteinas_totales_g,
                a.proteinas_vegetales_g,
                a.proteinas_animal,
                a.grasa_total_g,
                a.carbohidratos_totales_g,
                a.carbohidratos_disponibles_g,
                a.fibra_dietaria_g,
                a.cenizas_g,
                a.calcio_mg,
                a.fosforo_mg,
                a.zinc_mg,
                a.hierro_mg,
                a.caroteno_equivalentes_totales_ug,
                a.vitaminaA_equivalentes_totales_ug,
                a.tiamina_mg,
                a.riboflavina_mg,
                a.niacina_mg,
                a.vitaminaC_mg,
                a.acido_folico_ug,
                a.sodio_mg,
                a.potasio_mg
            FROM alimentos a
            JOIN grupos g ON a.id_grupo = g.id_grupo
        `);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};


const getAlimento = async (req, res) => {
    try {
        const { id_alimento } = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM alimentos WHERE id_alimento = ?", [id_alimento]);
        if (result.length > 0) {
            res.json(result[0]); 
        } else {
            res.status(404).send('Alimento no encontrado'); 
        }
    } catch (error) {
        res.status(500).send(error.message); 
    }
};
const addAlimentos = async (req, res) => {
    try {
        const connection = await getConnection();
        const nuevoAlimento = { ...AlimentoModel, ...req.body };
        const [grupoResult] = await connection.query("SELECT id_grupo FROM grupos WHERE id_grupo = ?", [nuevoAlimento.id_grupo]);
        if (grupoResult.length === 0) {
            return res.status(400).json({ message: "Grupo no existe." });
        }

        await connection.query("INSERT INTO alimentos SET ?", nuevoAlimento);
        res.json({ message: "Nuevo Alimento añadido " });
    } catch (error) {
        res.status(500).send(error.message);
    }
};
const updateAlimento = async (req, res) => {
    try {
        const { id_alimento } = req.params;
        const updatedAlimento = { ...AlimentoModel, ...req.body };

        if (Object.values(updatedAlimento).includes(undefined)) {
            return res.status(400).json({ message: "Bad Request: fill all fields." });
        }
        const connection = await getConnection();
        const result = await connection.query(
            "UPDATE alimentos SET ? WHERE id_alimento = ?",
            [updatedAlimento, id_alimento]
        );
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
const deleteAlimento = async (req, res) => {
    try {
        const { id_alimento } = req.params;
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM alimentos WHERE id_alimento = ?", [id_alimento]);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};
export const methods ={
    getAlimentos,
    addAlimentos,
    updateAlimento,
    getAlimento,
    deleteAlimento
}