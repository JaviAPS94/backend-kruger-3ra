//Funcion para dividir dos numeros
const dividir = (numerador, denominador) => {
  try {
    //Bloque de codigo a ejecutar
    //Vamos a validar que el denomiador no sea 0
    if (denominador === 0) {
      throw new Error("No se puede dividir para 0");
    }

    const resultado = numerador / denominador;
    console.log(`El resultado de la division es: ${resultado}`);
  } catch (error) {
    //Bloque de codigo a ejecutar en caso de error
    //Cuando pasa algo (error) en el codigo dentro del try
    console.error(`Error: ${error.message}`);
  } finally {
    //Bloque de codigo que se ejecuta siempre
    //No importa si hay error o no
    console.log("Operacion finalizada");
  }
};

dividir(10, 0);
