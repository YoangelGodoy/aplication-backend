import { data } from "../data/data.js";

// /api/v1/towCreate
const createTowTruck = async (req, res) => {
    try {
        const { modelo, marca, año, tipo, status } = req.body;

        if (!modelo || !marca || !año || !tipo || !status) {
            return res.status(400).json({ ok: false, msg: "Missing required fields: modelo, marca, año, tipo, status" });
        }

        // Validar tipoo
        const validTypes = ['gancho', 'plataforma'];
        if (!validTypes.includes(tipo)) {
            return res.status(400).json({ ok: false, msg: "Invalid tipo. Must be 'gancho' or 'plataforma'" });
        }

        const newTruck = {
            id: data.towTrucks.length + 1,
            modelo,
            marca,
            año,
            tipo,
            status,
        };

        data.towTrucks.push(newTruck);

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
        const truck = data.towTrucks.find(towTruck => towTruck.id === id);

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
        return res.json({
            ok: true,
            trucks: data.towTrucks
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: "Error retrieving tow trucks"
        });
    }
}

// /api/v1/towTruckUpadte/:id
const updateTowTruck = async (req, res) => {
    try {
        const { id } = req.params;
        const { modelo, marca, año, tipo, status } = req.body;

        const truckIndex = data.towTrucks.findIndex(towTruck => towTruck.id === id);
        if (truckIndex === -1) {
            return res.status(404).json({ ok: false, msg: "Tow truck not found" });
        }

        // Validar tipo
        if (tipo && !['gancho', 'plataforma'].includes(tipo)) {
            return res.status(400).json({ ok: false, msg: "Invalid tipo. Must be 'gancho' or 'plataforma'" });
        }

        const updatedTruck = {
            ...data.towTrucks[truckIndex],
            modelo: modelo || data.towTrucks[truckIndex].modelo,
            marca: marca || data.towTrucks[truckIndex].marca,
            año: año || data.towTrucks[truckIndex].año,
            tipo: tipo || data.towTrucks[truckIndex].tipo,
            status: status || data.towTrucks[truckIndex].status,
        };

        data.towTrucks[truckIndex] = updatedTruck;

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
        const truckIndex = data.towTrucks.findIndex(towTruck => towTruck.id === id);
        
        if (truckIndex === -1) return res.status(404).json({ ok: false, msg: "Tow truck not found" });

        data.towTrucks.splice(truckIndex, 1);

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
    deleteTowTruck
}