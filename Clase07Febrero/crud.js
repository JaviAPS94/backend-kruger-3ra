//Este modulo va a tener operaciones CRUD para nuestros datos
//Ventas
// C -> Create
// R -> Read
// U -> Update
// D -> Delete
//vAMOS USAR UN ARCHIVO EN FORMATO JSON PARA GUARDAR LOS DATOS
const fs = require("fs").promises;

const filePath = "./data.json";

const readData = async () => {
  try {
    const data = await fs.readFile(filePath);
    //Vamos a parsear el contenido del archivo JSON a un objeto de JavaScript
    // para poder maniipular los datos
    return JSON.parse(data);
  } catch (error) {
    console.error(error.message);
  }
};

const writeData = async (data) => {
  // {
  //     id: 1,
  //     campo1: "valor1",
  //     campo2: "valor2",
  // }
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
};

//CREATE sale -> Crear una nueva venta
const createSale = async (sale) => {
  // {
  //     date: "2021-02-07",
  //     product: "Laptop",
  //     price: 1500,
  //     quantity: 1,
  // }
  //1.- Necesito leer todos los datos del archivo json
  const data = await readData();
  //2.- Vamos a generar nuestro id de manera secuencial
  //   [1,2,3,4,5] -> data[0] -> 1
  //   [1,2,3,4,5] -> data[1] -> 2
  //   [1,2,3,4,5,6] -> data[4] -> 5
  //   data.length -> 6 -1 -> 5
  const id = data.length ? data[data.length - 1].id + 1 : 1;
  sale.id = id;
  //En este punto ya tenemos lista la venta que vamos a insertar
  data.push(sale);
  await writeData(data);
  console.log("Venta creada exitosamente", sale);
};

const readSales = async (id = null) => {
  //En el caso de que el id sea diferente a null vamos a hacer la busqueda por id
  let result;
  const data = await readData();
  if (id) {
    result = data.find((sale) => sale.id === id);
    if (!result) {
      console.log("No se encontro la venta con el id", id);
    }
  } else {
    result = data;
  }
  return result;
};

//UPDATE
//Primero ocupamos el id de la venta que queremos actualizar
//Ocupamos los nuevos datos de la venta (PUT porque vamos a actualizar todos los campos)
const updateSale = async (id, updatedSale) => {
  //Vamos a leer todos los datos (ventas)
  const data = await readData();
  //Vamos a buscar la venta que queremos actualizar
  //para esto vamos a buscar el indice o la posicion donde se encuentra la venta
  //El metodo findIndex, retorna la posicion donde se encuentra el elemento que buscamos
  //Si no encuentra el elemento, retorna -1
  const saleIndex = data.findIndex((sale) => sale.id === id);
  // 1 === 1 -> no se cumple, === compara el valor y el tipo de dato
  //En el caso de que encontremos el elemento, vamos a actualizar
  //saleIndex = 0
  if (saleIndex !== -1) {
    data[saleIndex] = { id, ...updatedSale };
    await writeData(data);
  } else {
    console.log("Venta no encontrada");
  }
};

//DELETE
//Esta funcion debe recibir omo parametro el id de la venta que queremos eliminar
const deleteSale = async (id) => {
  const data = await readData();
  //Vamos a filtrar todos los elementos del arreglo que sean diferente al id de la venta
  const updatedData = data.filter((sale) => sale.id !== id);
  if (data.length !== updatedData.length) {
    await writeData(updatedData);
  } else {
    console.log("Venta no encontrada");
  }
};

//Como tenemos varias funciones que exportar, vamos a exportar un objeto
module.exports = {
  createSale,
  readSales,
  updateSale,
  deleteSale,
};
