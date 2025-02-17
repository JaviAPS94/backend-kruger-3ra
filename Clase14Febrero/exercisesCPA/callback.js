//Callback es una funcion pasada como parametro a otra funcion
//Vamos a usar un setTimeout (asincrona)
const doSomething = (callback) => {
  //Vamos a llamar al setTimeout que se encargue de imprimir un mensaje en la consola
  //Luego de 1000ms (1 segundo)
  //Recibi dos parametros: una funcion y un numero (tiempo de espera)
  setTimeout(() => {
    console.log("Tarea completada");
    callback();
  }, 1000);
};

doSomething(() => {
  console.log("Callback ejecutado");
});
