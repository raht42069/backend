import mysql from 'mysql2'; 




const hostname = "n9g.h.filess.io";
const database = "BlacklightVansh_braverock";
const port = "3307";
const username = "BlacklightVansh_braverock";
const password = "123af7710c4ab025eebea658b8082b2d51f27dd2";

var con = mysql.createConnection({
  host: hostname,
  user: username,
  password,
  database,
  port,
}).promise();

const connection = await con.connect()

if(connection.connectionId){
  console.log("database connected");
}
else console.log("database connection failed")


export default con;