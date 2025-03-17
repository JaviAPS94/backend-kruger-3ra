//Este archivo se va a encargar de hacer la conexion a la base de datos
//Para hacer la conexion a la BDD vamos a utilizar mongoose
import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://alexbackend1234:admin1234@clusterbackend3raap.9svnf.mongodb.net/mongoose?retryWrites=true&w=majority&appName=ClusterBackend3raAP")
        console.log("Conectado a Mongodb")
    } catch (error) {
        console.error("Error al conectar a la base de datos", error);
    }
}