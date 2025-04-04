import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const { token } = useParams(); //http://localhost:5174/reset-password/1234567890

  //Vamos a trabajar la función del formulario que se va a ejecutar cada vez que presione el boton
  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");

    //Primero vamos a validar que las contraseñas sean iguales
    if (password !== confirmPassword) {
      setMessage("Las contraseñas no coinciden");
      return;
    }

    //Vamos a consumir un servicio del backend que debe encargarse de actualizar la contraseña
    //Como sabe el backend que usuario es el que quiere cambiar la contraseña?
    //Lo sabe porque el frontend tiene que enviarle el identificador(token) que esta asociado al usuario que
    //quiere cambiar la contraseña
    try {
      //Consumimos el servicio usando axios
      const response = await axios.put(
        `http://localhost:8080/auth/reset-password/${token}`,
        { password }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <>
      <h1>Reseteo de contraseña</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          required
          placeholder="Ingresa tu nueva contraseña"
        />
        <input
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          type="password"
          required
          placeholder="Confirma tu contraseña"
        />
        <button type="submit">Actualizar contraseña</button>
      </form>
      {message && <p>{message}</p>}
    </>
  );
};

export default ResetPasswordPage;
