import express from "express";
import morgan from "morgan";
const cors = require('cors'); 

//Routes
import alimentosroutes from "./routes/alimentos-routes"
import gruposroutes from "./routes/grupos-routes"


const app = express();
// settings

app.set("port", 3000)

//Middlewares
app.use(morgan("dev"));
app.use(express.json());

// PARA API
app.use(cors({
    origin: 'http://localhost:4200'  
}));


//routes
app.use("/api/alimentos", alimentosroutes);
app.use("/api/grupos", gruposroutes);

export default app;