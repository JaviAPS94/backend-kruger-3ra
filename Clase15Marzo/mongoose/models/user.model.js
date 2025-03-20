// Vamos a definir la estructura de la coleccion de usuarios
//En este modelo vamos a aplicar VARIOS MIDDLEWARES
//MIDDLEWARE: es una accion que yo puedo ejecutar antes o despues de hacer una operacion
//en nuestra BDD
//uN USUARIO PUEDE TENER UN PASSWORD
//Como buena practica de seguridad el password nunca se debe almacenar en texto plano
//Aplicando un middleware vamos a hashear el password ANTES de guardar en nuestra BDD
//Para poder hashear el password ocupamos una dependencia externa BCRYPT
import mongoose from "mongoose";
import bcrypt from "bcrypt";

//Definimos el schema(estructura, atributos)del usuario
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//Vamos a definir un middleware de tipo PRE-> ANTES
//Antes de guardar el usuario en la BDD vamos a hashear el password
userSchema.pre("save", async function (next) {
  //Accedemos al documento actual
  const user = this; //El this indica que estoy accediendo al documento actual (usuario)

  //Vamos a validar si el password del usuario se ha modificado
  //Solamente si es asi vamos a hashear el password
  if (user.isModified("password")) {
    //Ejecutamos la logica
    try {
      //Para encriptar la contraseña usando bcrypt ocupamos 2 pasos
      //Generar una cadena aleatoria que se va a encargar de hashear la contraseña
      const salt = await bcrypt.genSalt(10);
      //Hashear la contraseña
      const hashPassword = await bcrypt.hash(user.password, salt);

      user.password = hashPassword;

      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

userSchema.post("save", function (user, next) {
  console.log("Usuario guardado", user);
  next();
});

//Vamos a definir un middleware DE TIPO POST -> DESPUES
//Despues de hacer un find vamos a quitar el password porque es un dato sensible
userSchema.post("find", function (users, next) {
  //Por cada usuario debo quitar el password
  users.forEach((user) => {
    user.password = undefined;
  });
  next();
});

export const User = mongoose.model("users", userSchema);
