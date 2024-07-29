# API Table

This project is a full-stack application designed to manage and visualize product transaction data. It includes functionalities such as listing transactions, generating statistics, and visualizing data through charts. The application is built using Node.js, Express.js, MongoDB for the backend, and React.js for the frontend.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
  - [Seed Database](#seed-database)
  - [List Transactions](#list-transactions)
  - [Statistics](#statistics)
  - [Bar Chart Data](#bar-chart-data)
  - [Pie Chart Data](#pie-chart-data)
  - [Combined Data](#combined-data)
- [Frontend Components](#frontend-components)
- [Technologies Used](#technologies-used)
- [License](#license)

## Project Overview

The API Table is a comprehensive application that allows users to manage and analyze product transaction data. It fetches data from a third-party API, stores it in a MongoDB database, and provides various APIs for data retrieval and analysis. The frontend interface is built with React.js, offering features such as searching, pagination, and data visualization through charts.

## Features

### Backend

- **Seed Database**: Fetch and store transaction data from a third-party API.
- **List Transactions**: Retrieve transactions with support for search and pagination.
- **Statistics**: Generate monthly sales statistics.
- **Bar Chart**: Visualize data in price ranges.
- **Pie Chart**: Display distribution of items across categories.
- **Combined Data**: Fetch aggregated data from multiple endpoints.

### Frontend

- **Transaction Table**: Display transactions with search and pagination.
- **Statistics Overview**: Show total sales, sold items, and unsold items.
- **Bar Chart Visualization**: Display transaction counts across price ranges.
- **Pie Chart Visualization**: Show item distribution by category.
- **Responsive Design**: Works on both desktop and mobile devices.

## Installation

Follow these steps to set up the project locally:

### Prerequisites

- Node.js and npm installed on your machine.
- MongoDB installed and running.

### Backend Setup

1. **Clone the repository:**
   
   git clone https://github.com/PAREEKCHITRANSHU/api-table.git
   cd api-table/backend

2. **Install backend dependencies:**
    
   npm install

3.**Start the backend server:**
  npm start

### Frontend Setup

1. **Navigate to the frontend directory:**
   cd ../frontend/my-frontend
   
2. **Install frontend dependencies**
   npm install
   
3. **Start the frontend development server:**
   npm start
4. Open your browser and go to http://localhost:5173 to view the application.


## Usage
- Month Selection: Use the month dropdown to select a month for transaction data filtering.
- Search Functionality: Use the search box to find specific transactions by title, description, or price.
- Pagination: Navigate through paginated transaction data using the Next and Previous buttons.
- Statistics Overview: View monthly sales statistics, including total sales, sold items, and unsold items.
- Data Visualization: Analyze transaction data through bar and pie charts.

## API Endpoints

**Seed Database**
- Endpoint: /seed
- Method: GET
- Description: Fetches transaction data from a third-party API and seeds the MongoDB database with the data.

**List Transactions**
- Endpoint: /transactions
- Method: GET
- Parameters:
- month: (required) The month for filtering transactions (e.g., "March").
- page: (optional) Page number for pagination (default is 1).
- perPage: (optional) Number of items per page (default is 10).
- search: (optional) Search query for filtering transactions by title, description, or price.
- Description: Lists transactions for the specified month with optional search and pagination capabilities.

**Statistics**
- Endpoint: /statistics
- Method: GET
- Parameters:
- month: (required) The month for generating statistics.
- Description: Returns statistics for the specified month, including total sales amount, total sold items, and total unsold items.

**Bar Chart Data**
- Endpoint: /barchart
- Method: GET
- Parameters:
- month: (required) The month for retrieving bar chart data.
- Description: Provides data for the bar chart, showing item counts in predefined price ranges.

**Pie Chart Data**
- Endpoint: /piechart
- Method: GET
- Parameters:
- month: (required) The month for retrieving pie chart data.
- Description: Returns data for the pie chart, showing the distribution of items across categories for the specified month.

**Combined Data**
- Endpoint: /combined
- Method: GET
- Parameters:
- month: (required) The month for retrieving combined data.
- Description: Fetches and combines data from the statistics, bar chart, and pie chart APIs for the specified month.

## Frontend Components
- TransactionTable: Displays transaction data by searching and pagination.
- TransactionStatistics: Shows monthly sales statistics.
- TransactionsBarChart: Visualizes transaction data using a bar chart.
- TransactionsPieChart: Displays item distribution using a pie chart.

## Technologies Used
- Backend: Node.js, Express.js, MongoDB
- Frontend: React.js, Axios, Chart.js
- Styling: CSS3

## License
This project is open-source and available under the MIT License.
 Let me know if you have any other questions or need further adjustments!
