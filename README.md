## Personal Expense Tracker

### A simple RESTful API for managing financial transactions (income and expenses) built with Node.js, Express, and SQLite.

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


### Postman screenshots demonstrating each API call

![Screenshot (13)](https://github.com/user-attachments/assets/73e0f866-9150-49d7-bea4-f784d5e0916f)


![Screenshot (14)](https://github.com/user-attachments/assets/1605d895-e877-4ba2-ad7c-328e47d1bec4)


![Screenshot (15)](https://github.com/user-attachments/assets/f0793652-21f4-4ee0-8d31-689d592ee2f7)


![Screenshot (16)](https://github.com/user-attachments/assets/92b8edd0-3a0d-456e-85b7-9c9ac8a37f0c)


![Screenshot (17)](https://github.com/user-attachments/assets/5c6a2381-b799-4d85-bc28-005922fc73a6)


![Screenshot (18)](https://github.com/user-attachments/assets/e5b76585-5e48-418c-bbd6-c59d516f138f)


![Screenshot (19)](https://github.com/user-attachments/assets/ff48490e-e7f5-4889-87d9-48b820d198d6)


![Screenshot (20)](https://github.com/user-attachments/assets/1179c13a-c373-4506-81d4-27547bd46db1)


![Screenshot 2024-10-23 010909](https://github.com/user-attachments/assets/dbbe1114-55b3-46e7-a249-7b536571e882)

