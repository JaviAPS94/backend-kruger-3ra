const { MongoClient, ServerApiVersion } = require("mongodb");
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
    await collection.insertOne(person)
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
