//Usar async await, try catch
const doSomething = async () => {
  try {
    const result = await new Promise((resolve, reject) => {
      setTimeout(() => {
        reject("Tarea con error");
      }, 1000);
    });
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};

doSomething();
