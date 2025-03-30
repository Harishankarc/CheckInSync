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

    const date_formatted = date.split(' ');
    switch(date_formatted[1]){
        case 'Jan' : date_formatted[1] = '01'; break;
        case 'Feb' : date_formatted[1] = '02'; break;
        case 'Mar' : date_formatted[1] = '03'; break;
        case 'Apr' : date_formatted[1] = '04'; break;
        case 'May' : date_formatted[1] = '05'; break;
        case 'Jun' : date_formatted[1] = '06'; break;
        case 'Jul' : date_formatted[1] = '07'; break;
        case 'Aug' : date_formatted[1] = '08'; break;
        case 'Sep' : date_formatted[1] = '09'; break;
        case 'Oct' : date_formatted[1] = '10'; break;
        case 'Nov' : date_formatted[1] = '11'; break;
        case 'Dec' : date_formatted[1] = '12'; break;
    }
    const time = date_formatted[3].slice(0,5)
    let sub=''
    if (time >= "09:30" && time <= "10:30") {
        sub = "MP";
    } else if (time > "10:30" && time <= "11:30") {
        sub = "OS";
    } else if (time > "11:30" && time <= "12:30") {
        sub = "MATHS"; 
    }else if (time > "13:30" && time <= "14:30"){
        sub = "UHV";
    }else if (time > "15:30" && time <= "16:30"){
        sub = "DCN";
    }else if (time > "16:30" && time <= "17:30"){
        sub = "DBMS";
    }   else {
        sub = "Unknown"; 
    }
    console.log(sub)

    const formatted_date = `${date_formatted[4]}-${date_formatted[1]}-${date_formatted[2]}`;
    const checkingquery = `SELECT * FROM attendence WHERE date = '${formatted_date}' AND name = '${name}' and sub = '${sub}'`;
    const query = `INSERT INTO attendence (name, time, date, por, sub) VALUES (?, ?, ?, ?, ?)`;

    db.get(checkingquery,(err,row)=>{
        if (err) {
            res.status(500).json({ "Database Error": err.message });
        }else{
            if(row){
                res.status(200).json({ "message": "Student already present" });
            }else{
                db.run(query, [name, date_formatted[3], formatted_date, 'Present',sub], (err) => {
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
app.post('/api/attendence/attendancelist',(req,res)=>{
    const { date, sub } = req.body;
    console.log(date)
    const selectquery = `SELECT * FROM attendence WHERE date = '${date}' and sub = '${sub}'`;
    if(date){
        db.all(selectquery,(err,row)=>{
            if(err){
                res.status(500).json({ "Database Error": err.message });
            }else{
                if(row){
                    res.status(200).json({ "data": row });
                }else{
                    res.status(200).json({ "data": [] });
                }
            }
        })
    }else{
        console.log("No date provided");
    }
})

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
