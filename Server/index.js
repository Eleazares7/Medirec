import express from "express";
import cors from "cors";

import { setUpRoutes } from "./Routes.js";
import { dbMedirec } from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());


//Configurate routes
setUpRoutes(app, dbMedirec);

app.listen(3001, ()=>{
    console.log("Server running succesfully in port 3001");    
})

