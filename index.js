import express from "express"
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

app.get("/weeklyLeaderBoard", async (req, res) => {
    try {
        console.log("weekl");
        const currentDate = new Date();
        const data = await con.query(`SELECT * FROM scoreData WHERE DATEDIFF(Date('${currentDate.toISOString()}'), Date(timeStamp)) < 7 order by score DESC LIMIT 200`)
        //console.log(data[0]);
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
        console.log(data[0]);
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
    }
    else console.log(err);
})