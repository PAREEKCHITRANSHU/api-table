import React, { useEffect, useState } from 'react';
import { fetchTransactions, fetchStatistics, fetchBarChartData, fetchPieChartData, fetchCombinedData } from './api';
import './App.css';

const App = () => {
    const [month, setMonth] = useState('03');
    const [transactions, setTransactions] = useState([]);
    const [statistics, setStatistics] = useState({});
    const [barChartData, setBarChartData] = useState({});
    const [pieChartData, setPieChartData] = useState({});

    useEffect(() => {
        loadCombinedData(month);
    }, [month]);

    const loadCombinedData = async (selectedMonth) => {
        const { data } = await fetchCombinedData(selectedMonth);
        setTransactions(data.transactions);
        setStatistics(data.statistics);
        setBarChartData(data.priceRanges);
        setPieChartData(data.categories);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Transactions</h1>
            <select value={month} onChange={(e) => setMonth(e.target.value)} className="mb-4">
                <option value="01">January</option>
                <option value="02">February</option>
                <option value="03">March</option>
                <option value="04">April</option>
                <option value="05">May</option>
                <option value="06">June</option>
                <option value="07">July</option>
                <option value="08">August</option>
                <option value="09">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
            </select>
            <div className="mb-4">
                <h2 className="text-xl font-semibold">Statistics</h2>
                <p>Total Sale: {statistics.totalSale}</p>
                <p>Total Sold Items: {statistics.totalSold}</p>
                <p>Total Not Sold Items: {statistics.totalNotSold}</p>
            </div>
            <div className="mb-4">
                <h2 className="text-xl font-semibold">Bar Chart</h2>
                <pre>{JSON.stringify(barChartData, null, 2)}</pre>
            </div>
            <div className="mb-4">
                <h2 className="text-xl font-semibold">Pie Chart</h2>
                <pre>{JSON.stringify(pieChartData, null, 2)}</pre>
            </div>
            <div className="mb-4">
                <h2 className="text-xl font-semibold">Transactions Table</h2>
                <table className="table-auto w-full">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Sold</th>
                            <th>Date of Sale</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction, index) => (
                            <tr key={index}>
                                <td>{transaction.title}</td>
                                <td>{transaction.description}</td>
                                <td>{transaction.price}</td>
                                <td>{transaction.sold ? 'Yes' : 'No'}</td>
                                <td>{new Date(transaction.dateOfSale).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default App;
