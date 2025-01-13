import { ClientModel } from '../models/client.model.js'; 

// api/v1/driverCreate
const createClient = async (req, res) => {
    try {
        const {id, name, lastname, municipality_id, phone } = req.body;
        console.log("aqui 1")
        if (!id || !name || !lastname  || !municipality_id || !phone) {
            return res.status(400).json({ ok: false, msg: "Missing required fields: name, lastname, phone, municipality_id" });
        }
        
        const newDriver = await ClientModel.createClient({
            id,
            name,
            lastname,
            municipality_id,
            phone
        });
        console.log("aqui 4")
        return res.status(201).json({ ok: true, msg: "Driver registered successfully", driver: newDriver });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: "Error registering driver",
            error
        });
    }
}

// api/v1/driver/:id
const getClient = async (req, res) => {
    try {
        const { id } = req.params;
        const client = await ClientModel.findClientById(id);

        if (!client) {
            return res.status(404).json({ ok: false, msg: "Client not found" });
        }

        return res.json({
            ok: true,
            client
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: "Error retrieving client"
        });
    }
}

// /api/v1/Drivers
const listClients = async (req, res) => {
    try {
        const clients = await ClientModel.getAllClients();
        return res.json({
            ok: true,
            clients
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: "Error retrieving clients"
        });
    }
}

// /api/v1/clientUpdate/:id
const updateClient = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, lastname, municipality_id, phone } = req.body;

        const updatedClient = await ClientModel.updateClient(id, {
            name,
            lastname,
            municipality_id,
            phone
        });

        if (!updatedClient) {
            return res.status(404).json({ ok: false, msg: "client not found" });
        }

        return res.json({ ok: true, msg: "Client updated successfully", Client: updatedClient });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: "Error updating Client"
        });
    }
}

// /api/v1/driverDelete/:id
const deleteClient = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedClient = await ClientModel.deleteClient(id);
        
        if (!deletedClient) {
            return res.status(404).json({ ok: false, msg: "Client not found" });
        }

        return res.json({ ok: true, msg: "Client deleted successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: "Error deleting client"
        });
    }
}

export const ClientController = {
    createClient,
    getClient,
    listClients,
    updateClient,
    deleteClient
};