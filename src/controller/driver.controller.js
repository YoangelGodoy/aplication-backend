import { data } from "../data/data.js";

// /api/v1/driverCreate
const createDriver = async (req, res) => {
    try {
        const { name, lastname, phone, municipio, status } = req.body;

        if (!name || !lastname || !phone || !municipio || !status) {
            return res.status(400).json({ ok: false, msg: "Missing required fields: name, lastname, phone, municipio, status" });
        }

        // Validar status
        const validStatuses = ['activo', 'inactivo'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ ok: false, msg: "Invalid status. Must be 'activo' or 'inactivo'" });
        }

        const newDriver = {
            id: (data.drivers.length + 1).toString(),
            name,
            lastname,
            phone,
            municipio,
            status,
        };

        data.drivers.push(newDriver);

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

// /api/v1/driver/:id
const getDriver = async (req, res) => {
    try {
        const { id } = req.params;
        const driver = data.drivers.find(driver => driver.id === id);

        if (!driver) {
            return res.status(404).json({ ok: false, msg: "Driver not found" });
        }

        return res.json({
            ok: true,
            msg: driver
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: "Error retrieving driver"
        });
    }
}

// /api/v1/GetAllDrivers
const listDrivers = async (req, res) => {
    try {
        return res.json({
            ok: true,
            drivers: data.drivers
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: "Error retrieving drivers"
        });
    }
}

// /api/v1/driversUpdate/:id
const updateDriver = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, lastname, phone, municipio, status } = req.body;

        const driverIndex = data.drivers.findIndex(driver => driver.id === id);
        if (driverIndex === -1) {
            return res.status(404).json({ ok: false, msg: "Driver not found" });
        }

        // Validar status
        if (status && !['activo', 'inactivo'].includes(status)) {
            return res.status(400).json({ ok: false, msg: "Invalid status. Must be 'activo' or 'inactivo'" });
        }

        const updatedDriver = {
            ...data.drivers[driverIndex],
            name: name || data.drivers[driverIndex].name,
            lastname: lastname || data.drivers[driverIndex].lastname,
            phone: phone || data.drivers[driverIndex].phone,
            municipio: municipio || data.drivers[driverIndex].municipio,
            status: status || data.drivers[driverIndex].status,
        };

        data.drivers[driverIndex] = updatedDriver;

        return res.json({ ok: true, msg: "Driver updated successfully", driver: updatedDriver });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: "Error updating driver"
        });
    }
}

// /api/v1/driversDelete/:id
const deleteDriver = async (req, res) => {
    try {
        const { id } = req.params;
        const driverIndex = data.drivers.findIndex(driver => driver.id === id);
        
        if (driverIndex === -1) return res.status(404).json({ ok: false, msg: "Driver not found" });

        data.drivers.splice(driverIndex, 1);

        return res.json({ ok: true, msg: "Driver deleted successfully" });
    } catch (error) {
        console.log (error);
        return res.status(500).json({
            ok: false,
            message: "Error deleting driver"
        });
    }
}

export const DriverController = {
    createDriver,
    getDriver,
    listDrivers,
    updateDriver,
    deleteDriver
}