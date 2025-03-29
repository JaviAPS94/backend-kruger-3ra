import configs from "../configs/configs.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  try {
    //Vamos a obtener los campos del usuario que esta enviando el cliente
    //username, password, email -> en el cuerpo de la peticion
    const { username, password, email } = req.body;
    const user = new User({ username, password, email });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    //username, password
    //EL PRIMER PASO ES VALIDAR QUE EL USUARIO EXISTE EN LA BDD
    //vamos a buscar el usuario de acuerdo a su username
    //Obtenemos las credenciales del cuerpo de la peticion
    const { username, password } = req.body;
    //BUSCAMOS EL USUARIO POR USERNAME
    const user = await User.findOne({ username });
    if (!user) {
      //Error de autenticacion -> 401
      return res.status(401).json({ message: "Invalid credentials" });
    }

    //Comparamos las contraseñas
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    //Vamos a generar un token de acceso JWT (Json Web Token)
    //Este token es como la cedula de identidad del usuario
    //Para generar el JWT vamos a usar una dependencia llamada jsonwebtoken
    //El metodo sign recibe los siguientes parametros:
    //1.- Recibe el payload (datos que quiero guardar en el jwt)
    //En nuestro caso el payload va a ser un objeto con los datos del usuario (id del usuario)
    //2.- La clave secreta para firmar nuestro token
    //La firma es util para poder garantizar que nuestro token no ha sido alterado
    //jwt -> HEADER.PAYLOAD.SIGNATURE -> jkdnfkasd%&.jndfkvndjnfgsf.sadfasdf
    //HEADER: { alg: "HS256", typ: "JWT" } -> BASE64
    //PAYLOAD: { userId: "1234567890" } -> BASE64
    //SIGNATURE: HMACSHA256(HEADER + "." + PAYLOAD, SECRET)
    //3.- es pasar el tiempo de expiracion del token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      configs.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { register, login };
