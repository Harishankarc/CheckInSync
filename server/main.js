const express = require('express');
const cors = require('cors');
const sql = require('sqlite3').verbose();

const db = new sql.Database('attendence.db');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS attendence (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        name TEXT, 
        time TEXT, 
        date TEXT,
        por TEXT DEFAULT 'Absent',
        sub TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        name TEXT,
        username TEXT, 
        password TEXT
    )`);
});

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());


app.post('/api/auth/login',(req,res)=>{
    const { username , password } = req.body;
    console.log(username,password)
    query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
    if(username && password){
        db.get(query,(err,row)=>{
            if(err){
                res.json({message:'Error Occured',status:500});
            }else{
                if(row){
                    res.json({message:'Login Successfull',status:200,token:row.username,name : row.name});
                }else{
                    res.json({message:'Invalid Credentials',status:401});
                }
            }
        })
    }else{
        res.status(400).send({message:'Invalid credentials'});
    }
})

app.post('/api/auth/signup',(req,res)=>{
    const { name, username , password } = req.body;
    query = `INSERT INTO users (name, username, password) VALUES ('${name}', '${username}', '${password}')`;
    if(name && username && password){
        db.get(query,(err)=>{
            if(err){
                res.json({message:'Error Occured',status:500});
            }else{
                res.json({message:'Signup Successfull',status:200});
            }
        })
    }else{
        res.status(400).send({message:'Invalid credentials'});
    }
})

app.post('/api/attendence/studentdetails', (req, res) => {
    const { name, date } = req.body;

    if (!name || !date) {
        return res.status(400).json({ "message": "Please provide name and date" });
    }

    const date_parts = date.split(/\s+/); 

    const month_map = {
        'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04',
        'May': '05', 'Jun': '06', 'Jul': '07', 'Aug': '08',
        'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12'
    };

    const day = date_parts[2].padStart(2, '0');
    const month = month_map[date_parts[1]];
    const year = date_parts[4];
    const time = date_parts[3].slice(0, 5); 

    const formatted_date = `${year}-${month}-${day}`;

    let sub = "Unknown";
    if (time >= "09:30" && time <= "10:30") {
        sub = "MP";
    } else if (time > "10:30" && time <= "11:30") {
        sub = "OS";
    } else if (time > "11:30" && time <= "12:30") {
        sub = "MATHS";
    } else if (time > "13:30" && time <= "14:30") {
        sub = "UHV";
    } else if (time > "15:30" && time <= "16:30") {
        sub = "DCN";
    } else if (time > "16:30" && time <= "17:30") {
        sub = "DBMS";
    }
    console.log(`Name: ${name}, Time: ${time}, Date: ${formatted_date}, Subject: ${sub}`);

    const checkingquery = `SELECT * FROM attendence WHERE date = '${formatted_date}' AND name = '${name}' and sub = '${sub}'`;
    const query = `INSERT INTO attendence (name, time, date, por, sub) VALUES (?, ?, ?, ?, ?)`;

    db.get(checkingquery, (err, row) => {
        if (err) {
            return res.status(500).json({ "Database Error": err.message });
        }
        if (row) {
            return res.status(200).json({ "message": "Student already present" });
        } else {
            db.run(query, [name, time, formatted_date, 'Present', sub], (err) => {
                if (err) {
                    return res.status(500).json({ "Database Error": err.message });
                }
                return res.status(200).json({ "message": "Student details added successfully" });
            });
        }
    });
});


app.post('/api/attendence/attendancelist', (req, res) => {
    const { date, sub } = req.body;
    console.log(`Received: date=${date}, sub=${sub}`);

    const selectquery = `SELECT * FROM attendence WHERE date = ? AND sub = ?`;
    if (date && sub) {
        db.all(selectquery, [date, sub], (err, row) => {
            if (err) {
                console.error("Database Error:", err.message);
                return res.status(500).json({ "Database Error": err.message });
            } else {
                console.log("Query Result:", row);
                return res.status(200).json({ "data": row.length ? row : [] });
            }
        });
    } else {
        console.log("No date or subject provided");
        res.status(400).json({ "error": "Missing date or subject" });
    }
});



app.post('/api/attendence/attendancelist/individual', (req, res) => {
    const { sub, name } = req.body;

    if (!sub || !name) {
        return res.status(400).json({ "message": "Please provide date and subject" });
    }

    const selectquery = `SELECT * FROM attendence WHERE sub = ? AND name = ?`;
    db.all(selectquery, [sub, name], (err, rows) => {
        if (err) {
            return res.status(500).json({ "Database Error": err.message });
        }
        res.status(200).json({ "data": rows.length > 0 ? rows : [] });
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
