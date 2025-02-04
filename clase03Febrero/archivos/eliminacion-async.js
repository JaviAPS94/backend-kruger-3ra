const fs = require("fs").promises;

const deleteFile = async (fileToDelete) => {
  try {
    //Recibe como parametro la ruta con el archivo a eliminar
    await fs.unlink(fileToDelete);
  } catch (error) {
    console.error(error.message);
  }
};

deleteFile("./prueba.txt");
