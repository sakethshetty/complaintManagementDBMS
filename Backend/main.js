const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors')
const pool = require('./db');
const bcrypt = require('bcrypt')
const saltRounds = 10;

const app = express();
const port = 5000;

app.use(cors({ credentials: true, origin: "http://localhost:3000" }))

// Use session middleware
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
}));

// Use bodyParser middleware to parse JSON requests
app.use(bodyParser.json());

// Dummy user data for demonstration purposes
const users = [
    { id: 1, username: 'user1', password: 'password1' },
    { id: 2, username: 'user2', password: 'password2' },
];

app.post('/login', async (req, res) => {
    // Send a response to the client
    let { email, password } = req.body;
    // Hash the password before inserting it into the database

    console.log("request came");

    // const  {email, password} = req.body.data;
    // Query the database to find the user with the matching username
    pool.query("SELECT uid, passwd, fname, lname FROM userDetails WHERE email = ?", [email], (err, result) => {
        if (err) {
            // Handle errors
            console.log(err);
            return res.status(500).send("Server error");
        }

        if (result.length > 0) {
            // Get the hashed password from the database
            const hash = result[0].passwd;
            console.log(hash, password)

            // Compare the input password with the hashed password using bcrypt.compare function
            bcrypt.compare(password, hash, (err, match) => {
                if (err) {
                    // Handle errors
                    console.log(err);
                    return res.status(500).send("Server error");
                }
                console.log(match)
                if (match) {
                    // Passwords match, authenticate the user and redirect them to the home page
                    console.log("Login successful");
                    req.session.user = {
                        id: result[0].uid,
                        fname : result[0].fname,
                        lname : result[0].lname,
                        role: "user"
                    }
                    res.status(200).send("Success");
                } else {
                    // Passwords do not match, display an error message and ask the user to try again

                    console.log("Invalid password");
                    res.status(400).send("Invalid username")
                }
            });
        } else {
            // No user found with the matching username, display an error message and ask the user to try again
            pool.query("SELECT cid, fname, lname, passwd FROM complaintHandler WHERE email = ?", [email], (err, result) => {
                if (err) {
                    // Handle errors
                    console.log(err);
                    return res.status(500).send("Server error");
                }

                if (result.length > 0) {
                    // Get the hashed password from the database
                    const hash = result[0].passwd;
                    console.log(hash, password)

                    // Compare the input password with the hashed password using bcrypt.compare function
                    // bcrypt.compare(password, hash, (err, match) => {
                        // if (err) {
                        //     // Handle errors
                        //     console.log(err);
                        //     return res.status(500).send("Server error");
                        // }
                        // console.log(match)
                        if (hash == password) {
                            // Passwords match, authenticate the user and redirect them to the home page
                            console.log("Login successful");
                            req.session.user = {
                                id: result[0].cid,
                                fname : result[0].fname,
                                lname : result[0].lname,
                                role: "handler"
                            }
                            res.status(200).send("Success");
                        } else {
                            // Passwords do not match, display an error message and ask the user to try again
                            console.log("Invalid password");
                            res.status(400).send("Invalid username")
                        }
                    // });
                } else {
                    console.log("Invalid User")
                    res.status(400).send("Invalid User")
                }
            });
        }
    });

});

app.post('/signup', (req, res) => {


    // return res.send("Hello!");

    console.log(req.body);
    let { firstName, lastName, email, password, dob } = req.body;

    pool.query("SELECT * FROM ( (SELECT email FROM userDetails) UNION (SELECT email FROM complaintHandler)) AS t WHERE email =?", [email], (err2, res2) => {

        if (err2) {

            console.log(err2)
            res.status(500).send("Internal Server Error!")
            return;
        }
        console.log("hi",res2)
        if (res2.length > 0) {
            res.status(400).send("Email already in use!");
            return;
        } else {

            bcrypt.hash(password, saltRounds, (err, hash) => {
                if (err) {
                    // Handle errors
                    console.log(err)
                    return res.status(400).send("Error Occurred!");
                    // console.error(err);
                } else {
                    // Insert the hashed password into the database
                    pool.query("INSERT INTO userDetails (fname, lname, email, passwd, dob) VALUES (?, ?, ?, ?, ?)", [firstName, lastName, email, hash, dob], (err, result) => {
                        if (err) {
                            // Handle errors
                            console.log(err)
                            return res.status(400).send("Error Occurred!");
                            // return console.error(err);
                        } else {
                            // Handle success
                            // console.log(res)
                            return res.status(200).send("Success!");

                            // return console.log(result);

                        }
                    });
                }
            });
        }
    })

});

app.post('/complaints', async (req, res) => {

    console.log(req.body)

    if (!req.session.user) {
        console.log("Not a user")
        res.status(400).json({ error: "Login first!" });
        return;
    }

    var did = 1;
    pool.query("select did from dept where dname=?", [req.body.dep], (err1, res1) => {

        if (err1) {

            console.log(err1)
            res.status(500).json({ error: "Something went wrong!" })
            return;
        }
        did = res1[0].did
    })

    var today = new Date(); // get the current date
    var year = today.getFullYear(); // get the year (four digits)
    var month = today.getMonth() + 1; // get the month (zero-based, so add one)
    var day = today.getDate(); // get the day of the month
    // add leading zeros to month and day if needed
    if (month < 10) month = '0' + month;
    if (day < 10) day = '0' + day;
    // concatenate the components into a date string
    var date = year + '-' + month + '-' + day;

    pool.query("INSERT INTO complaint (cdate, title, cdesc, did, cid, uid, state) VALUES (?,?,?,?,?,?,?)", [date, req.body.heading, req.body.description, Math.floor(Math.random() * 3), req.session.user.id, did, "Pending"], (err2, res2) => {

        console.log(err2)

        console.log(res2)
    })


    res.status(200).send("hi");
})

// Logout endpoint
app.get('/logout', (req, res) => {
    // Destroy the session to log the user out
    req.session.destroy(err => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error logging out' });
        } else {
            res.status(200).json({ message: 'Logout successful' });
        }
    });
    console.log(req.sessionStore)
});

app.get('/auth', (req, res) => {

    if (req.session.user) {
        res.status(200).json({
            isLogged: true,
            user : req.session.user
        })
    } else {
        res.status(400).json({
            isLogged: false
        })
    }
})

// Example protected route
app.get('/dashboard', (req, res) => {
    // Check if the user is authenticated (replace with your authorization logic)
    // console.log(req.session.user)
    if (!req.session.user) {

        res.status(401).json({ message: 'Unauthorized. Please login.' });
        return;
    }

    if (req.session.user.role == "user") {
        pool.query("select title, cdesc, state from complaint C, userDetails U where C.uid=U.uid and U.uid=?", [req.session.user.id], (err1, res1) => {

            if (err1) {
                console.log(err1)

                res.status(500).json({ error: "Something went wrong!" })

                return;
            }

            console.log(res1)

            res.status(200).json({ complaints: res1 })
        })
    } else {
        pool.query("select title, cdesc, state from complaint C, complaintHandler CH where CH.cid=C.cid and CH.cid=?", [req.session.user.id], (err1, res1) => {

            if (err1) {
                console.log(err1)

                res.status(500).json({ error: "Something went wrong!" })

                return;
            }

            console.log(res1)

            res.status(200).json({ complaints: res1 })
        })
    }
});


app.get('/userdp', (req, res) => {

    res.send("jpg file");
})

app.get('/departments', (req, res) => {

    pool.query("select dname from dept", (err1, res1) => {

        if (err1) {
            console.log(err1);
            res.status(500).json({ error: "Something went Wrong!" });
            return;
        }

        console.log(res1)
        let dep = []
        dep = res1.map((value) => value.dname);

        res.status(200).json(dep)

    })
})

app.get('/dep/:depName', (req, res) => {

    console.log(req.params.depName)

    pool.query("select title, cdesc, state from complaint C, dept D where C.did=D.did and D.dname=?", [req.params.depName], (err1, res1) => {

        if (err1) {
            console.log(err1)

            res.status(500).json({ error: "Something went wrong!" })

            return;
        }

        console.log(res1)

        res.status(200).json({ complaints: res1 })
    })
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
