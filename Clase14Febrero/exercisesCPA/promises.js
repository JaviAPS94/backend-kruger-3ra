//Una promesa es algo pendiente que se puede llegar a cumplir o no
const doSomething = () => {
  //A retornar una promesa
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = false;
      if (success) {
        resolve("Tarea completada con exito");
      } else {
        reject("Tarea fallida");
      }
    }, 1000);
  });
};

//Es una promesa
doSomething()
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });
