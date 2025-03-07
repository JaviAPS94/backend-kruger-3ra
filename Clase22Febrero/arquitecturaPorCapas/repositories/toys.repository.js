//esta capa se encarga de manaejar el acceso a nuestra fuenta datos (Archivos)
import fs from "fs/promises";

const getToysFromDB = async () => {
  const toys = await fs.readFile("./db/toys.json");
  return JSON.parse(toys);
};

const saveToysToDB = async (toys) => {
  await fs.writeFile("./db/toys.json", JSON.stringify(toys, null, 2));
};

export { getToysFromDB, saveToysToDB };
