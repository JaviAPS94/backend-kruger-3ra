const crudModule = require("./crud.js");

const main = async () => {
  //esta funcion principal se va a encargar de ejecutar nuestras funciones del CRUD
  //   await crudModule.writeData([{ id: 1, name: "Alex" }]);
  //   const data = await crudModule.readData();
  //   console.log(data);
  //   await crudModule.createSale({
  //     date: "2021-02-07",
  //     product: "Laptop",
  //     price: 1500,
  //     quantity: 1,
  //   });

  //   console.log(await crudModule.readSales(10));
  //   await crudModule.updateSale(90, {
  //     data: "2025-02-08",
  //     product: "Tablet",
  //     price: 500,
  //     quantity: 1,
  //   });
  await crudModule.deleteSale(7);
};

main();
