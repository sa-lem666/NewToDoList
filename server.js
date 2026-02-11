//I used AI to help me with this part, as it is a little complicated
//I still reviewed the code and made sure it was correct and understand it to a level


const express = require('express');
const cors = require('cors');

const app = express(); 


app.use(cors());
app.use(express.json());

app.use(cors()); // Allows Vite to talk to this server
app.use(express.json()); // Allows server to read the JSON you send from React

const users = []; 

//Register Route
app.post('/api/register', (req, res) => {
    const { username, password } = req.body;

    // 1. Validation
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required." });
    }

    // 2. Check for existing users
    const userExists = users.find(u => u.username === username);
    if (userExists) {
        return res.status(400).json({ message: "User already exists." });
    }

    // 3. Create User (Storing password exactly as it was typed)
    const newUser = {
        id: Date.now(),
        username: username,
        password: password // No hashing, just plain text
    };

    // 4. "Save" to array
    users.push(newUser);
    console.log("New user added:", newUser);

    // 5. Success Response
    res.status(201).json({
        message: "Registration successful!",
        token: `simple_token_${newUser.id}`
    });
});

//Start server and give conformation in console
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`✅ Simple Server running at http://localhost:${PORT}`);
});

//Login Route
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    // Search the 'users' array for a match
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        console.log("Login successful for:", username);
        // Send back a token (JSON)
        res.json({ 
            message: "Login successful!", 
            token: `secret_token_${username}` 
        });
    } else {
        console.log("Login failed for:", username);
        // Send back an error (JSON)
        res.status(401).json({ message: "Invalid username or password." });
    }
});