import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../model/db.js";

export const register = async (req, res) => {
  const { name, password,  email } = req.body;

  
  if (!name && !password&& !email) {
      return res.status(401).send('Please fill all input fields');
    }
    
    const hashpassword = await bcryptjs.hash(password,10) 
    
    try {
        console.log(name, password,  email );
        
        const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
        const values = [name, email , hashpassword];
        const [result] = await db.execute(sql, values);
        
        console.log(result);
        
    res.status(200).send('User registered successfully');


  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).send('Internal server error');
  }
  
};


export const login = async (req, res) => {
  const { email, password } = req.body;

  // Input validation
  if (!email || !password) {
    return res.status(400).send("Please provide email and password");
  }

  try {
    const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
    if (rows.length === 0) {
      return res.status(404).send("User not found");
    }

    const user = rows[0];

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send("Invalid credentials");
    }

    const token = jwt.sign({ id: user.id, email: user.email }, "secretKey", { expiresIn: "1h" });

    res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send("Internal server error");
  }
};
