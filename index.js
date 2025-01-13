import 'dotenv/config'
import express from 'express';
import userRouter from './src/routes/user.route.js'
import TowtruckRouter from './src/routes/towTruck.route.js'
import DriversRouter from './src/routes/drivers.route.js'
import ClientsRouter from './src/routes/client.route.js'
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1', userRouter, TowtruckRouter, DriversRouter, ClientsRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log('Servidor andando en el puerto', PORT));