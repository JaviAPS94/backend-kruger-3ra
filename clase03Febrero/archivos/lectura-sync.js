//Utilizar el modulo de fs (file system)
//Es un modulo nativo de nodejs -> que ya se encuentra instalado por defecto
const fs = require("fs");

//Utilizando el modulo de fs vamos a leer un archivo de texto de manera sincronica
try {
  //Vamos a trabajar la implementacion
  //Esta funcion recibe dos parametros
  //1. La ruta del archivo que queremos leer
  //2. El formato de lectura del archivo
  // Esto retorna el contenido del archivo
  const data = fs.readFileSync("./prueba.txt", "utf-8");
  console.log(data);
} catch (error) {
  console.error(error.message);
}
