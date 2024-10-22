## Personal Expense Tracker

    A simple RESTful API for managing financial transactions (income and expenses) built with Node.js, Express, and SQLite.

## Features
* Add new transactions (income/expense).
* Retrieve all transactions.
* Retrieve a specific transaction by ID.
* Update a transaction by ID.
* Delete a transaction by ID.
* Retrieve a summary of transactions (total income, expenses, and balance).
* Optionally, filter the summary by date range.

## Endpoints
    1. Adding a New Transaction
    URL: /transactions
    Method: POST
    Body Parameters:
    {
    "type": "income",           
    "category": "salary",       
    "amount": 5000.00,          
    "date": "2024-10-10",       
    "description": "October salary"
    }
    Response: 201 Created on success, with a message "Transaction added successfully"


    2. Retrieving All Transactions
    URL: /transactions
    Method: GET
    Response: JSON array of all transactions

    3. Retrieving a Specific Transaction by ID
    URL: /transactions/:id
    Method: GET
    Response:
    Success: JSON object of the transaction.
    Failure: 404 Not Found with the message {"error": "Transaction not found"}

    4. Updating a Transaction by ID
    URL: /transactions/:id
    Method: PUT
    Body Parameters:
    {
    "type": "expense",
    "category": "groceries",
    "amount": 150.50,
    "date": "2024-10-11",
    "description": "Bought groceries"
    }
    Response:
    Success: 200 OK with the message "Transaction updated successfully".
    Failure: 404 Not Found with the message {"error": "Transaction not found"}.

    5. Deleting a Transaction by ID
    URL: /transactions/:id
    Method: DELETE
    Response:
    Success: 200 OK with the message "Transaction deleted successfully".
    Failure: 404 Not Found with the message {"error": "Transaction not found"}.

    6. Retrieving a Summary of Transactions
    URL: /summary
    Method: GET
    Query Parameters (Optional):
    start_date: Filter by start date.
    end_date: Filter by end date.
    Response
    {
    "total_income": 5000.00,
    "total_expenses": 2000.00,
    "balance": 3000.00
    }
    7. Generating report by category for a specific month
    URL: /report?month=value&year=value
    METHOD: GET
    Response
    Success:
    {
        "category": "Groceries",
        "total_spent": 200
    }
    Failure: Please provide month and year or Error generating report

## Database
    The project uses SQLite as the database.
    The database is stored in the sqlite.db file.
    Tables
    transactions: Stores transaction details such as id, type, category, amount, date, and description.
    categories: Stores predefined categories with id, name, and type.



## Project Setup
    1. Clone the Repository
        git clone 
        cd 

    2.Install Dependencies
        npm install

    3.Run the Server
        npm run dev

The server will run on http://localhost:3000.
