import {connect, connection} from 'mongoose'

const conn = {
    isConnected: false,
}

export async function dbConnect(){
    console.log("vesdca")
    if (conn.isConnected) return;
    


   const db = await connect('mongodb://localhost:27017/dibohn');

   conn.isConnected = db.connections[0].readyState;

   console.log(db.connection.db.databaseName);
}

connection.on("connected", () =>{
    console.log("Mongodb is connected")
});

connection.on("error", (err) => {
    console.log(err)
});
