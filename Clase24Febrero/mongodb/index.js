const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri =
  "mongodb+srv://alexbackend1234:admin1234@clusterbackend3raap.9svnf.mongodb.net/?retryWrites=true&w=majority&appName=ClusterBackend3raAP";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // DATABASE -> COLLECTIONS -> DOCUMENTS
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    //Vamos a crear nuestra base de datos (kruger)
    const db = client.db("kruger")
    //Vamos a definir nuestra coleccion
    const collection = db.collection("people")
    //Vamos a insertar nuestro primer documento (persona)
    const person = {
      name: {
        first: "Alan",
        last: "Turing",
      },
      birth: new Date(1900, 5, 21),
      death: new Date(1960, 5, 5),
      contribs: ["Turing machine", "Turing test", "Turingery"],
      views: 1300000,
    }
    //Vamos a ver la forma de insertar la persona en la coleccion llamada people
    //Insercion de un solo documento -> insertOne -> {}
    //insercion de varios documentos -> insertMany -> [{}]
    //await collection.insertOne(person)

    // const person2 = {
    //   name: {
    //     first: "Mike",
    //     last: "Lewis",
    //   },
    //   birth: new Date(1902, 6, 25),
    //   death: new Date(1950, 5, 5),
    //   contribs: ["Contrib 1", "Contrib 2", "Contrib 3"],
    //   views: 150000,
    // }

    // const person3 = {
    //   name: {
    //     first: "Lisa",
    //     last: "Mine",
    //   },
    //   birth: new Date(1850, 5, 21),
    //   death: new Date(1900, 5, 5),
    //   contribs: ["Contrib 1", "Contrib 2", "Contrib 3"],
    //   views: 200000,
    // }

    // await collection.insertMany([person2, person3])

    //Lectura de datos
    //find -> cursor, toArray
    //De la coleccion de personas (people) vamos a buscar a todas las personas
    // const peopleCursor = collection.find({});
    
    // while(await peopleCursor.hasNext()) {
    //   //Accediendo al documento persona como tal
    //   const person = await peopleCursor.next();
    //   console.log(person)
    // }

    // FIND usando toArray
    const people = await collection.find({}).toArray();
    //console.log(people)

    //Busqueda de personsas que cumplan con una condicion
    //Quiero obtener las personas que tengan una cantidad de vistas igual a 150000
    // const peopleWith150000Views = await collection.find({ views: 150000 }).toArray();
    // console.log(peopleWith150000Views)

    //Vamos a buscar las personas donde las vistas sean mayores a 100000 -> $gt
    // const peopleFiltered = await collection.find({
    //   views: {
    //     $gte: 200000
    //   }
    // }).toArray();

    //Buscar las personas que tenga las vistas menores o iguales a 200000
  // const peopleFiltered = await collection.find({
  //     views: {
  //       $lte: 200000
  //     }
  //   }).toArray();
    
    //Vamos a buscar las personas donde las vistas sean mayores a 100000 y menores a 200000
    //Tenemos que usar 2 operadores
    // const peopleFiltered = await collection.find({
    //   views: {
    //     $gte: 100000,
    //     $lte: 200000
    //   }
    // }).toArray();

    //Vamos a buscar todas las personas donde las vistas sean mayores a 100000 y que la fecha de nacimiento sea mayor
    //1900-01-01
    // const peopleFiltered = await collection.find({
    //   views: {
    //     $gt: 100000
    //   },
    //   birth: {
    //     $gt: new Date(1905, 1, 1)
    //   }
    // }).toArray();

    //Busqueda para trabajar con objetos
    //Usando documentos incorporados
    // const peopleFiltered = await collection.find({
    //   name: { last: "Lewis", first: "Mike" }
    // }).toArray();

    //Busqueda usando DOCUMENTOS INCRUSTADOS
    // const peopleFiltered = await collection.find({
    //   "name.last": "Lewis"
    // }).toArray();

    //Vamos a hacer una busqueda donde una contribucion sea igual a X valor
    // const peopleFiltered = await collection.find({
    //   contribs: "Contrib 3"
    // }).toArray();

    //Vamos a hacer busqueda donde una contribucion sea Contrib 3 O Turing machine
    // const peopleFiltered = await collection.find({
    //   contribs: {
    //     //Operador para trabajar con arreglos y definir varios elementos de busqueda
    //     $in: ["Contrib 3", "Contrib 1"]
    //   }
    // }).toArray();

    //Vamos a hacer una busqueda donde la contribuciones sea igual a dos valores (que contenga ambos valores AND)
    // const peopleFiltered = await collection.find({
    //   contribs: {
    //     $all: ["Contrib 1", "Turing machine"]
    //   }
    // }).toArray();

    //Vamos a buscar las personas que tengan dos o mas contribuciones
    //$gte
    // const peopleFiltered = await collection.find({
    //   contribs: {
    //     //Vamos a usar un operador que nos permite saber el tamaño de un arreglo
    //     $size: 3
    //   }
    // }).toArray();

    //Vamos a revisar el ordenamiento
    //sort -> nos permite ordenar nuestros documentos de acuerdo al campos que definamos
    //si quiero ordenar de manera ascendente -> 1
    //si quiero ordenar de manera descendente -> -1
    //Vamos a ordenar las personas de acuerdo a la cantidad de vistas de manera descendente (de mayor a menor)
    // const peopleFiltered = await collection.find().sort({ views: 1 }).toArray();

    //Vamos a ordenar todas las personas de acuerdo a la fecha de nacimiento de manera ascendente

    //Vamos a ordenar todas las personas de acuerdo a su nombre de manera descendente

    //Vamos a obtener un numero limitado de documentos -> paginacion
    //Por cada pagina vamos a mostrar 1 documento
    // const peopleFiltered = await collection.find().skip(0).limit(2).toArray();
    //console.log(peopleFiltered)
    //Eliminar documentos
    //Vamos a borrar un documento por su identificador
    //Para borrar un documento es importante definir el criterio de eliminacion
    // const deleteResult = await collection.deleteOne({
    //   _id: new ObjectId("67cb7b7287b1c8643085cf82")
    // });
    // console.log(deleteResult)

    //Actualizacion de documentos
    //Dos cosas: 1)Criterio de busqueda 2)Valores a actualizar
    //Vamos a actualizar un documento por su identificador
    const updateResult = await collection.updateOne(
      { _id: new ObjectId("67cb81f792693f0c566158e5") },
      //Para actualizar un documento vamos a usar un operador de actualizacion
      { 
        $set: { 
          name: {
            first: "Lisa Updated"
          }
        }
      }
    );
    console.log(updateResult)

    //Ejercicio
    //Vamos a obtener la persona mas joven (un solo documento)
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
