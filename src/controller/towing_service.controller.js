import { TowingServiceModel } from '../models/towingService.model.js';
import { ForeignValidations } from '../models/ForeignValidations.js';

// api/v1/towingServiceCreate
const createTowingService = async (req, res) => {
    try {
        const { client_id, driver_id, towTruck_id, date, cost, typeOfVehicle_id, status_service, description } = req.body;

        if (!client_id || !driver_id || !towTruck_id || !date || !cost || !typeOfVehicle_id || !status_service) {
            return res.status(400).json({ ok: false, msg: "Missing required fields: client_id, driver_id, towTruck_id, date, cost, typeOfVehicle_id, status_service" });
        }

        const clientExists = await ForeignValidations.clientExists(client_id);
        if (!clientExists) {
            return res.status(400).json({ ok: false, msg: "The client does not exist" });
        }

        const driverExists = await ForeignValidations.driverExists(driver_id);
        if (!driverExists) {
            return res.status(400).json({ ok: false, msg: "The driver does not exist" });
        }

        const towTruckExists = await ForeignValidations.towTruckExists(towTruck_id);
        if (!towTruckExists) {
            return res.status(400).json({ ok: false, msg: "The tow truck does not exist" });
        }

        const typeOfVehicleExists = await ForeignValidations.typeOfVehicleExists(typeOfVehicle_id);
        if (!typeOfVehicleExists) {
            return res.status(400).json({ ok: false, msg: "The type of vehicle does not exist" });
        }
        const validStatuses = ['Pendiente', 'En proceso', 'Completado'];
        if (!validStatuses.includes(status_service)) {
            return res.status(400).json({ ok: false, msg: "invalid status values( Pendiente, En proceso, Completado)" });
        }
    
        const newService = await TowingServiceModel.createTowingService({
            client_id,
            driver_id,
            towTruck_id,
            date,
            cost,
            typeOfVehicle_id,
            status_service,
            description
        });

        return res.status(201).json({ ok: true, msg: "Towing service registered successfully", service: newService });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: "Error registering towing service",
            error
        });
    }
};

// api/v1/towingService/:id
const getTowingService = async (req, res) => {
    try {
        const { id } = req.params;
        const service = await TowingServiceModel.findTowingServiceById(id);

        if (!service) {
            return res.status(404).json({ ok: false, msg: "Towing service not found" });
        }

        return res.json({
            ok: true,
            service
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: "Error retrieving towing service"
        });
    }
};

// /api/v1/towingServices
const listTowingServices = async (req, res) => {
    try {
        const services = await TowingServiceModel.getAllTowingServices();
        return res.json({
            ok: true,
            services
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: "Error retrieving towing services"
        });
    }
};

// /api/v1/towingServiceUpdate/:id
const updateTowingService = async (req, res) => {
    try {
        const { id } = req.params;
        const { status_service } = req.body;

        if (!status_service) {
            return res.status(400).json({ ok: false, msg: "Missing required field: status_service" });
        }

        const validStatuses = ['Pendiente', 'En proceso', 'Completado'];
        if (!validStatuses.includes(status_service)) {
            return res.status(400).json({ ok: false, msg: "Invalid status_service. Allowed values are: 'Pendiente', 'En proceso', 'Completado'"});
        }

        const updatedService = await TowingServiceModel.updateTowingServiceStatus(id, {
            status_service
        });

        if (!updatedService) {
            return res.status(404).json({ ok: false, msg: "Towing service not found" });
        }

        return res.json({ ok: true, msg: "Towing service status updated successfully", service: updatedService });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: "Error updating towing service status"
        });
    }
};

// /api/v1/towingServiceDelete/:id
const deleteTowingService = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedService = await TowingServiceModel.deleteTowingService(id);
        
        if (!deletedService) {
            return res.status(404).json({ ok: false, msg: "Towing service not found" });
        }

        return res.json({ ok: true, msg: "Towing service deleted successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: "Error deleting towing service"
        });
    }
};

export const TowingServiceController = {
    createTowingService,
    getTowingService,
    listTowingServices,
    updateTowingService,
    deleteTowingService
};