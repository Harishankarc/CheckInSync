const express = require('express');
const cors = require('cors');
const sql = require('sqlite3').verbose();

const db = new sql.Database('attendence.db');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS attendence (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        name TEXT, 
        time TEXT, 
        date TEXT
    )`);
});

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.post('/api/attendence/studentdetails', (req, res) => {
    const { name, date } = req.body;

    if (!name || !date) {
        return res.status(400).json({ "message": "Please provide name and date" });
    }

    const date_formatted = date.split(' ');
    const formatted_date = `${date_formatted[2]}-${date_formatted[1]}-${date_formatted[4]}`;
    const checkingquery = `SELECT * FROM attendence WHERE date = '${formatted_date}' AND name = '${name}'`;
    const query = `INSERT INTO attendence (name, time, date) VALUES (?, ?, ?)`;

    db.get(checkingquery,(err,row)=>{
        if (err) {
            res.status(500).json({ "Database Error": err.message });
        }else{
            if(row){
                res.status(200).json({ "message": "Student already present" });
            }else{
                db.run(query, [name, date_formatted[3], formatted_date], (err) => {
                    if (err) {
                        res.status(500).json({ "Database Error": err.message });
                        console.log(err);
                    } else {
                        res.status(200).json({ "message": "Student details added successfully" });
                    }
                });
            }
        }
    })
    
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
