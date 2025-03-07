//Esta capa se encarga de manejar toda la logica de negocio de nuestra aplicacion
//Es la capa mas importante de nuestra aplicacion
import { v4 as uuidv4 } from "uuid";
import {
  getToysFromDB,
  saveToysToDB,
} from "../repositories/toys.repository.js";

const getToys = async () => {
  const toys = await getToysFromDB();
  return toys;
};

const saveToy = async (toyToSave) => {
  //Logica de negocio
  const uuid = uuidv4();
  //Llamado a la capa de repositorio
  const toys = await getToysFromDB();
  //Logica de negocio
  toys.push({ id: uuid, ...toyToSave });
  //Llamado a la capa de repositorio
  await saveToysToDB(toys);
};

const updateToy = async (id, data) => {
  //Llamada a la capa de repositorios
  const toys = await getToysFromDB();
  //Logica de negocio (capa de servicios)
  const toyIndex = toys.findIndex((toy) => toy.id === id);

  if (toyIndex === -1) return null;

  //Logica de negocio (capa de servicios)
  const toyToUpdate = toys[toyIndex];
  Object.assign(toyToUpdate, data);
  toys[toyIndex] = toyToUpdate;

  //Capa de repositorios
  await saveToysToDB(toys);
  return toyToUpdate;
};

const deleteToy = async () => {
  //Capa de servicios (llamado a la capa de repositorios)
  const toys = await getToysFromDB();
  //Logica de negocio (capa de servicios)
  const toyIndex = toys.findIndex((el) => el.id === id);

  if (toyIndex === -1) return false;
  //Logica de negocio (capa de servicios)
  toys.splice(toyIndex, 1);

  //Capa de repositorios
  await saveToysToDB(toys);
  return true;
};

export { getToys, saveToy, updateToy, deleteToy };
