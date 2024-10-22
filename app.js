const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");

const databasePath = path.join(__dirname, "sqlite.db");

const app = express();
app.use(express.json());

let database = null;

const initializeDbAndServer = async () => {
  try {
    database = await open({
      filename: databasePath,
      driver: sqlite3.Database,
    });

    await database.exec(`
      CREATE TABLE IF NOT EXISTS transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        type TEXT,
        category TEXT,
        amount REAL,
        date TEXT,
        description TEXT
      );
      
      CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        type TEXT
      );
    `);

    app.listen(3000, () =>
      console.log("Server Running at http://localhost:3000/")
    );
  } catch (error) {
    console.log(`DB Error: ${error.message}`);
    process.exit(1);
  }
};

initializeDbAndServer();


// 1. Adding a new transaction
app.post('/transactions', async (req, res) => {
    const { type, category, amount, date, description } = req.body;
    const addTransactionQuery = `
        INSERT INTO transactions (type, category, amount, date, description)
        VALUES ('${type}', '${category}', ${amount}, '${date}', '${description}');
    `;
    await database.run(addTransactionQuery);
    res.send('Transaction added successfully');
});

// 2. Retrieving all transactions
app.get('/transactions', async (req, res) => {
    const getTransactionsQuery = 'SELECT * FROM transactions;';
    const transactions = await database.all(getTransactionsQuery);
    res.json(transactions);
});

// 3. Retrieving a transaction by ID
app.get('/transactions/:id', async (req, res) => {
    const { id } = req.params;
    const getTransactionQuery = `SELECT * FROM transactions WHERE id = ${id};`;
    const transaction = await database.get(getTransactionQuery);
    if (transaction) {
        res.json(transaction);
    } else {
        res.status(404).send("Transaction not found");
    }
});

// 4. Updating a transaction by ID
app.put('/transactions/:id', async (req, res) => {
    const { id } = req.params;
    const { type, category, amount, date, description } = req.body;
    const updateTransactionQuery = `
        UPDATE transactions
        SET type = '${type}', category = '${category}', amount = ${amount}, date = '${date}', description = '${description}'
        WHERE id = ${id};
    `;
    await database.run(updateTransactionQuery);
    res.send("Transaction updated successfully");
});

// 5.Deleting a transaction by ID
app.delete('/transactions/:id', async (req, res) => {
    const { id } = req.params;

    // Checking if transaction exists
    const checkTransactionQuery = `SELECT * FROM transactions WHERE id = ${id};`;
    const transaction = await database.get(checkTransactionQuery);

    if (!transaction) {
        return res.status(404).send({ error: "Transaction not found" });
    }

    const deleteTransactionQuery = `DELETE FROM transactions WHERE id = ${id};`;
    await database.run(deleteTransactionQuery);
    res.send("Transaction deleted successfully");
});

// 6. Retrieving a summary of transactions
app.get('/summary', async (req, res) => {
    const { start_date, end_date } = req.query;
    let summaryQuery = `
        SELECT
            SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) as total_income,
            SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) as total_expenses,
            SUM(CASE WHEN type = 'income' THEN amount ELSE -amount END) as balance
        FROM transactions
    `;
    
    if (start_date && end_date) {
        summaryQuery += `WHERE date BETWEEN '${start_date}' AND '${end_date}'`;
    }

    const summary = await database.get(summaryQuery);
    res.json(summary);
});

// Generating report by category for a specific month/year 
app.get("/report", async (req, res) => {
    const { month, year } = req.query;
  
    if (!month || !year) {
      return res.status(400).send("Please provide month and year");
    }
  
    const reportQuery = `
      SELECT category, SUM(amount) as total_spent
      FROM transactions
      WHERE type = 'expense'
        AND strftime('%m', date) = '${month}' AND strftime('%Y', date) = '${year}'
      GROUP BY category;
    `;
  
    try {
      const report = await database.all(reportQuery);
      res.json(report);
    } catch (error) {
      res.status(500).send("Error generating report");
    }
  });
  

module.exports = app;

