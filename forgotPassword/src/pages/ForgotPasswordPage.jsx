import { useState } from "react";
import axios from "axios";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    //En esta funcion vamos a consumir un servicio del backend
    //este servicio debe encargarse de recibir el correo que ingresa el usuario para luego enviar el link
    //de reseteo de password al usuario
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/auth/forgot-password",
        { email }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <>
      <h1>Olvidaste tu contraseña?</h1>
      {/* Este formluario que vamos a crear nos va a servir para que el usuario ingrese su correo
       y luego consumir un servicio del backend para enviarle el link de reseteo de password 
       al cliente. */}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Ingresa tu correo"
          required
        />
        <button type="submit">Enviar link de reseteo de contraseña</button>
      </form>
      {message && <p>{message}</p>}
    </>
  );
};

export default ForgotPasswordPage;
