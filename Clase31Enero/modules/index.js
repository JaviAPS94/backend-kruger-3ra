//Para poder importar las funcionalidades de otro modulo, usamos el require
const computeModule = require("./compute.js");

const resultadoSuma = computeModule.suma(5, 5);

console.log(resultadoSuma);
