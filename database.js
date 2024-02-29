import mysql from 'mysql2'; 




// const hostname = "n9g.h.filess.io";
// const database = "BlacklightVansh_braverock";
// const port = "3307";
// const username = "BlacklightVansh_braverock";
// const password = "123af7710c4ab025eebea658b8082b2d51f27dd2";

const hostname = "bmfptaw0mgikuyj2ggwb-mysql.services.clever-cloud.com";
const database = "bmfptaw0mgikuyj2ggwb";
const port = "3306";
const username = "uaypybamrxmauqyk";
const password = "sxhibbFZllIktQX89SuY";

var con = mysql.createConnection({
  host: hostname,
  user: username,
  password,
  database,
  port,
}).promise();



export default con;