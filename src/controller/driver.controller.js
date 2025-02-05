import { DriverModel } from '../models/driver.model.js'; 

// api/v1/driverCreate
const createDriver = async (req, res) => {
    try {
        const {id_driver, name_driver, lastname_driver, phone, fkid_municipality, status_driver, license } = req.body;
    
        if (!id_driver || !name_driver || !lastname_driver || !phone || !fkid_municipality || !status_driver || !license) {
            return res.status(400).json({ ok: false, msg: "Missing required fields: name_driver, lastname_driver, phone, municipality_id, status_driver, license" });
        }
        // validar name
        const valitedName = /^[A-Za-z]+$/
        if(!valitedName.test(name_driver)){
            return res.status(400).json({ ok: false, msg: "Invalid characters name" });
        } 
        if(!valitedName.test(lastname_driver)){
            return res.status(400).json({ ok: false, msg: "Invalid characters lastname" });
        } 
        // Validar status
        const validStatuses = ['activo', 'inactivo'];
        if (!validStatuses.includes(status_driver)) {
            return res.status(400).json({ ok: false, msg: "Invalid status. Must be 'activo' or 'inactivo'" });
        }
   
        const valitedLicense = ['4ta', '5ta'];
        if(!valitedLicense.includes(license)){
            return res.status(400).json({ ok: false, msg: "Invalid license. Must be '4ta' or '5ta'" });
        }

        // Validar que el campo phone contenga solo números
        const phonePattern = /^[0-9]+$/; // Expresión regular para solo números
        if (!phonePattern.test(phone)) {
            return res.status(400).json({ ok: false, msg: "Phone number must contain only numbers." });
        }
        
        const newDriver = await DriverModel.createDriver({
            id_driver,
            name_driver,
            lastname_driver,
            phone,
            fkid_municipality,
            status_driver,
            license
        });
    
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
const getDriver = async (req, res) => {
    try {
        const { id } = req.params;
        const driver = await DriverModel.findDriverById(id);

        if (!driver) {
            return res.status(404).json({ ok: false, msg: "Driver not found" });
        }

        return res.json({
            ok: true,
            driver
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: "Error retrieving driver"
        });
    }
}

// /api/v1/Drivers
const listDrivers = async (req, res) => {
    try {
        const drivers = await DriverModel.getAllDrivers();
        return res.json({
            ok: true,
            drivers
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: "Error retrieving drivers"
        });
    }
}

// /api/v1/driverUpdate/:id
const updateDriver = async (req, res) => {
    try {
        const { id } = req.params;
        const { name_driver, lastname_driver, phone, fkid_municipality, status_driver, license } = req.body;

        // validar name
        const valitedName = /^[A-Za-z]+$/
        if(!valitedName.test(name_driver)){
            return res.status(400).json({ ok: false, msg: "Invalid characters" });
        } 
        if(!valitedName.test(lastname_driver)){
            return res.status(400).json({ ok: false, msg: "Invalid characters" });
        } 

        // Validar status
        if (status_driver && !['activo', 'inactivo'].includes(status_driver)) {
            return res.status(400).json({ ok: false, msg: "Invalid status. Must be 'activo' or 'inactivo'" });
        }
        //validar licencia
        const valitedLicense = ['4ta', '5ta'];
        if(!valitedLicense.includes(license)){
            return res.status(400).json({ ok: false, msg: "Invalid license. Must be '4ta' or '5ta'" });
        }

        const updatedDriver = await DriverModel.updateDriver(id, {
            name_driver,
            lastname_driver,
            phone,
            fkid_municipality,
            status_driver,
            license
        });

        if (!updatedDriver) {
            return res.status(404).json({ ok: false, msg: "Driver not found" });
        }

        return res.json({ ok: true, msg: "Driver updated successfully", driver: updatedDriver });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: "Error updating driver"
        });
    }
}

// /api/v1/driverDelete/:id
const deleteDriver = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedDriver = await DriverModel.deleteDriver(id);
        
        if (!deletedDriver) {
            return res.status(404).json({ ok: false, msg: "Driver not found" });
        }

        return res.json({ ok: true, msg: "Driver deleted successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: "Error deleting driver"
        });
    }
}

const listStates = async (req, res) => {
    try {
        const states = await DriverModel.getAllStates();
        return res.json({
            ok: true,
            states
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: "Error retrieving states"
        });
    }
}

const listMunicipality = async (req, res) => {
    try {
        const municipality = await DriverModel.getAllMunicipality();
        return res.json({
            ok: true,
            municipality
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: "Error retrieving municipality"
        });
    }
}

export const DriverController = {
    createDriver,
    getDriver,
    listDrivers,
    updateDriver,
    deleteDriver,
    listStates,
    listMunicipality
};