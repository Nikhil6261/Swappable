import express, { response } from "express";
import db from "../model/db.js";
import jwt from "jsonwebtoken";

export const create = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  const newtoken = jwt.verify(token, process.env.SECRET);
  console.log(newtoken);

  const { title, date, start_time, end_time, status } = req.body;

  try {
    const sql = ` INSERT INTO swappable (user_id, title, date, start_time, end_time, status)  VALUES (?, ?, ?, ?, ?, ?) `;

    const [result] = await db.query(sql, [ newtoken.id, title, date, start_time, end_time,status, ]);

    res.status(200).json({
      message: "Slot added successfully",
      id: result.insertId,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const readALL = async (req, res) => {
  
    
  try {
    const sql = "SELECT * FROM swappable ORDER BY created_at DESC";
    const [rows] = await db.query(sql);

    if (rows.length === 0) {
      return res.status(404).json({ message: "No swaps found" });
    }

    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const readonly = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    const newtoken = jwt.verify(token, process.env.SECRET);
    

    const sql = "SELECT * FROM swappable WHERE user_id = ?";

 const response = await db.query(sql, [newtoken.id])
console.log(response);
res.status(200).json({success: true, data: response,   userId: newtoken.id });


  } catch (error) {
    console.error("Token verification failed:", error.message);
    res.status(403).json({ message: "Invalid or expired token" });
  }
};

export const update = async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  try {
    console.log("Updating slot:", { id, status });

    const sql = `UPDATE swappable SET status = ? WHERE id = ?`;

    const result = await db.query(sql, [status, id])
    

    res.status(200).json({ message: "Status updated successfully"+ result });
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};



