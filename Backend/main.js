const express = require('express')
const cors = require('cors')

const app = express();
app.use(cors())
app.use(express.json())

app.get('/dep', (req, res) => {

    const dep = [
        "Department of Agriculture",
        "Department of Commerce",
        "Department of Defense",
        "Department of Education",
        "Department of Energy",
        "Department of Health and Human Services",
        "Department of Homeland Security",
        "Department of Housing and Urban Development",
        "Department of Interior",
        "Department of Justice",
        "Department of Labor",
        "Department of State",
        "Department of Transportation",
        "Department of Treasury",
        "Department of Veterans Affairs"
      ];

    res.status(200).json(dep)
})

app.get('/user', (req, res) => {

    res.status(200).json([
        
    ])
})


app.post('/signup', (req, res) => {

    console.log(req.body)
})

app.post('/login', (req, res) => {

    console.log(req.body)
})

app.listen(5000, () => {
    console.log('Backend is listening!');
})

module.exports = app;

