import { ClientModel } from '../models/client.model.js'; 

// api/v1/clientCreate
const createClient = async (req, res) => {
    try {
        const {id, name, lastname, municipality_id, phone } = req.body;
        console.log("aqui 1")
        if (!id || !name || !lastname  || !municipality_id || !phone) {
            return res.status(400).json({ ok: false, msg: "Missing required fields: name, lastname, phone, municipality_id" });
        }
        // validar name
        const valitedName = /^[A-Za-z]+$/
        if(!valitedName.test(name)){
            return res.status(400).json({ ok: false, msg: "Invalid characters name" });
        } 
        if(!valitedName.test(lastname)){
            return res.status(400).json({ ok: false, msg: "Invalid characters lastname" });
        } 
        
        // Validar que el campo phone contenga solo números
        const phonePattern = /^[0-9]+$/; // Expresión regular para solo números
        if (!phonePattern.test(phone)) {
            return res.status(400).json({ ok: false, msg: "Phone number must contain only numbers." });
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

// api/v1/client/:id
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

// /api/v1/clients
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

        // validar name
        const valitedName = /^[A-Za-z]+$/
        if(!valitedName.test(name)){
            return res.status(400).json({ ok: false, msg: "Invalid characters" });
        } 
        if(!valitedName.test(lastname)){
            return res.status(400).json({ ok: false, msg: "Invalid characters" });
        } 
        
         // Validar que el campo phone contenga solo números
         const phonePattern = /^[0-9]+$/; // Expresión regular para solo números
         if (!phonePattern.test(phone)) {
             return res.status(400).json({ ok: false, msg: "Phone number must contain only numbers." });
         }

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

// /api/v1/clientDelete/:id
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