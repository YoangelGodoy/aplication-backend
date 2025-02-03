import 'dotenv/config'
import express from 'express';
import userRouter from './src/routes/user.route.js'
import TowtruckRouter from './src/routes/towTruck.route.js'
import DriversRouter from './src/routes/drivers.route.js'
import ClientsRouter from './src/routes/client.route.js'
import DriverPayment from './src/routes/driver_payment.route.js'
import TowingService from './src/routes/towingService.route.js'
import ClientPayment from './src/routes/clientPayment.route.js'
import invoice from './src/routes/invoice.route.js'

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1', userRouter, TowtruckRouter, DriversRouter, ClientsRouter, DriverPayment, TowingService, ClientPayment, invoice);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log('Servidor andando en el puerto', PORT));