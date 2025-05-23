//Aca vamos a tener el envio de correos electronicos
//Integrandonos con mailtrap haciendo uso de nodemailer
import nodemailer from "nodemailer";
import configs from "../configs/configs.js";

//La idea es que esta funcion sea generica
//En options vamos a pasar el destinatario, asunto, cuerpo del correo
const sendEmail = async (options) => {
  console.log("llamdno a metodo de envio de correo");
  //Primer paso es conectarno a mailtrap usando nodemailer
  const transporter = nodemailer.createTransport({
    host: configs.MAILTRAP_HOST,
    port: configs.MAILTRAP_PORT,
    auth: {
      user: configs.MAILTRAP_USER,
      pass: configs.MAILTRAP_PASSWORD,
    },
  });
  //Usando la conexion que hemos creado vamos a enviar el correo
  const mailOptions = {
    from: '"Proyecto ordenes" <no-reply@demomailtrap.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  const test = await transporter.sendMail(mailOptions);
  console.log(test);
};

export default sendEmail;
