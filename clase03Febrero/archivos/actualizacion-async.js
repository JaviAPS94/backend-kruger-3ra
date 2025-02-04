const fs = require("fs").promises;

const updateContent = async (newContent) => {
  try {
    //Vamos tomar un archivo EXISTENTE y vamos a actualizar su contenido
    //appendFile, nos permite agregar contenido al final del archivo
    //Parametros:
    // 1. Ruta del archivo
    // 2. Contenido a agregar
    await fs.appendFile("./escritura-async.txt", newContent + "\n");
  } catch (error) {
    console.error(error.message);
  }
};

updateContent("actualizando el archivo");
