const fs = require("fs").promises;

const writeContent = async () => {
  try {
    await fs.writeFile("./escritura-async.txt", "Hola escritura async");
    //quiero leer el archivo que acabo de escribir
  } catch (error) {
    console.log(error.message);
  }
};

writeContent();
