import express from "express";
import con from "./database.js";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cors());
app.use(express.static('client'));

// Function to ping the server
function pingServer() {
    console.log('Pinging server...');
    // Add your ping logic here, for example:
    // You can ping the root endpoint of your server itself
    fetch('https://blacklightvanshbackend.onrender.com')
        .then(response => {
            console.log('Server pinged successfully');
        })
        .catch(error => {
            console.log('Error pinging server:', error);
        });
}

// Ping the server immediately when it starts
pingServer();

// Schedule ping to run every 5 minutes (300,000 milliseconds)
setInterval(pingServer, 300000);

app.get("/weeklyLeaderBoard", async (req, res) => {
    try {
        console.log("weekl");
        const currentDate = new Date();
        const data = await con.query(`SELECT * FROM scoreData WHERE DATEDIFF(Date('${currentDate.toISOString()}'), Date(timeStamp)) < 7 order by score DESC LIMIT 200`)
        res.send(data[0]);
    }
    catch (err) {
        console.log("error: ", err);
        res.send(err);
    }
})

app.post("/leaderboardByCountry", async (req, res) => {
    console.log(req.body.CountryCode);
    try {
        const currentDate = new Date();
        const data = await con.query(`SELECT * FROM scoreData WHERE DATEDIFF(Date('${currentDate.toISOString()}'), Date(timeStamp)) >= 7 AND DATEDIFF(Date('${currentDate.toISOString()}'), Date(timeStamp)) < 14 AND CountryCode = "${req.body.CountryCode}" ORDER BY score DESC LIMIT 200`)
        res.send(data[0]);
    }
    catch (err) {
        console.log("error: ", err);
        res.send(err);
    }
})

app.post("/rank", async (req, res) => {
    try{
        const data = await con.query(`SELECT COUNT(*) + 1 AS user_rank FROM scoreData WHERE Score > (SELECT Score FROM scoreData WHERE UID = ${req.body.UID})`)
        res.send(data[0]);
    }
    catch(err){
        console.log(err);
        res.send(err);
    }
})

app.listen(PORT, (err) => {
    if (!err) {
        console.log(`server running at ${PORT}`);
    } else {
        console.log(err);
    }
})
