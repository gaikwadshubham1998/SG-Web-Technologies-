import mysql from "mysql2/promise";

export default async function handler(req, res) {
    const db = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
    });

    const { name, email, service, message } = req.body;

    await db.execute(
        "INSERT INTO inquiries (name,email,service,message) VALUES (?,?,?,?)",
        [name, email, service, message]
    );

    res.status(200).json({ success: true });
}
