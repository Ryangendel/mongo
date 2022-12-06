const express = require("express")
const app = express()
const PORT = process.env.PORT || 3000
const { MongoClient } = require('mongodb');
const path= require("path")
// Connection URL
const url = process.env.MONGO_URI || 'mongodb://localhost:27017' ;
const client = new MongoClient(url);

app.use(express.json())
app.use(express.urlencoded({extended:true}));

// Database Name
const dbName = 'dogs_db';

app.get("/", (req, res)=>{
  res.sendFile(path.join(__dirname, './public', 'index.html'))
})

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('dogs');
  
 
  // the following code examples can be pasted here...



app.get("/api/getdata", async (req, res)=>{
    await client.connect();
    const findResult = await collection.find({}).toArray();
    const data = JSON.stringify(findResult)
    res.send(data)
    client.close()
})

app.post("/api/adddata", async (req, res)=>{
    await client.connect();
    console.log("==============")
    console.log(req.body)
    console.log("==============")
    const insertResult = await collection.insertOne(req.body);
    console.log('Inserted documents =>', insertResult);
    res.send("successfuly updated")
    client.close()
})

  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());

app.listen(PORT, ()=>{
    console.log("LISTEN ON PORT"+ PORT)
})