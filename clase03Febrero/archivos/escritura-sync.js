const fs = require("fs");

try {
  //Esta funcion recibe como parametros:
  //1. La ruta del archivo que queremos escribir
  //2. El contenido que queremos escribir
  fs.writeFileSync(
    "./escritura.txt",
    "Hola mundo estoy escribiendo en un archivo"
  );
} catch (error) {
  console.error(error.message);
}
