const fs = require("fs").promises;

//Vamos a definir una funcion asincrona
async function readContent() {
  try {
    //Este metodo readFile retorna una promesa
    //Los parametros que recibi son los mismos que la funcion sincronica
    const content = await fs.readFile("./prueba.txt", "utf-8");
    console.log(content);
  } catch (error) {
    console.error(error.message);
  }
}

readContent();
