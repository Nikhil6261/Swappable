import express from "express";
import db from "../model/db.js";

/** 🔹 CREATE a new swappable slot */
export const create = async (req, res) => {
  const { user_id, title, date, start_time, end_time, status } = req.body;

  console.log(user_id, title, date, start_time, end_time, status);

  try {
    const sql = ` INSERT INTO swappable (user_id, title, date, start_time, end_time, status)  VALUES (?, ?, ?, ?, ?, ?) `;

    const [result] = await db.query(sql, [user_id,  title, date, start_time, end_time, status, ]);

    res.status(200).json({
      message: "Slot added successfully",
      id: result.insertId,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


/** 🔹 READ all slots */
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


/** 🔹 READ single slot by ID */
export const swap = (req, res) => {
  const sql = "SELECT * FROM swappable WHERE id = ?";
  db.query(sql, [req.params.id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    if (rows.length === 0)
      return res.status(404).json({ message: "Slot not found" });
    res.json(rows[0]);
  });
};

/** 🔹 UPDATE a slot */
export const update = (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  const sql = `UPDATE swappable SET status = ? WHERE id = ?`;

  db.query(sql, [status, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Slot not found" });
    }

    res.json({ message: "Status updated successfully" });
  });
};

/**  DELETE a slot----- /:id */
export const deleteswap = (req, res) => {
  const sql = "DELETE FROM swappable WHERE id = ?";
  db.query(sql, [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Slot deleted successfully" });
  });
};
