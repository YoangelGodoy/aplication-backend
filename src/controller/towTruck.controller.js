import { towTruckModel } from "../models/towTruck.model.js";

// /api/v1/towCreateee
const createTowTruck = async (req, res) => {
    try {
        const { id, model_id, status, type} = req.body;

        if (!id, !model_id || !status || !type) {
            return res.status(400).json({ ok: false, msg: "Missing required fields: id, model, status, type" });
        }

        // Validar tipoo
        const validTypes = ['gancho', 'plataforma'];
        if (!validTypes.includes(type.toLowerCase())) {
            return res.status(400).json({ ok: false, msg: "Invalid tipo. Must be 'gancho' or 'plataforma'" });
        }

        const newTruck = {
            id,
            model_id,
            status,
            type,
        };

        const createTow = await towTruckModel.createTowTruck(newTruck);

        return res.status(201).json({ ok: true, msg: "Tow truck registered successfully", truck: newTruck });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: "Error registering tow truck",
            error
        });
    }
}

// /api/v1/towTruck/:id
const getTowTruck = async (req, res) => {
    try {
        const { id } = req.params;
        const truck = await towTruckModel.findTowTruckById(id);

        if (!truck) {
            return res.status(404).json({ ok: false, msg: "Tow truck not found" });
        }

        return res.json({
            ok: true,
            msg: truck
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: "Error retrieving tow truck"
        });
    }
}

// /api/v1/GetAllTowTruck
const listTowTrucks = async (req, res) => {
    try {
        const towTrucks = await towTruckModel.getAllTowTruck();
        return res.json({
            ok: true,
            trucks: towTrucks
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: "Error retrieving tow trucks"
        });
    }
}

const listModels = async (req, res) => {
    try {
        const models = await towTruckModel.getAllModels();
        return res.json({
            ok: true,
            trucks: models
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: "Error retrieving models"
        });
    }
}

// /api/v1/towTruckUpadte/:id
const updateTowTruck = async (req, res) => {
    try {
        const { id } = req.params;
        const { model_id, status, type } = req.body;

        // Validar tipo
        if (type && !['gancho', 'plataforma'].includes(type.toLowerCase())) {
            return res.status(400).json({ ok: false, msg: "Invalid tipo. Must be 'gancho' or 'plataforma'" });
        }

        const updatedTruck = await towTruckModel.updateTowTruck(id,{
            id,
            model_id,
            status,
            type
        });

        if(!updatedTruck){
            return res.status(404).json({ok: false, msg: "Tow truck not found"})
        }

        return res.json({ ok: true, msg: "Tow truck updated successfully", truck: updatedTruck });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: "Error updating tow truck"
        });
    }
}

// /api/v1/towTruckDelete/:id
const deleteTowTruck = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTowtruck = await towTruckModel.deleteTowTruck(id);
        
        if (!deletedTowtruck) return res.status(404).json({ ok: false, msg: "Tow truck not found" });

        return res.json({ ok: true, msg: "Tow truck deleted successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: "Error deleting tow truck"
        });
    }
}
export const TowTruckController = {
    createTowTruck,
    getTowTruck,
    listTowTrucks,
    updateTowTruck,
    deleteTowTruck,
    listModels
}