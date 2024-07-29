import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const fetchTransactions = (month, page = 1, perPage = 10, search = '') =>
    axios.get(`${API_URL}/transactions`, { params: { month, page, perPage, search } });

export const fetchStatistics = (month) =>
    axios.get(`${API_URL}/statistics`, { params: { month } });

export const fetchBarChartData = (month) =>
    axios.get(`${API_URL}/barchart`, { params: { month } });

export const fetchPieChartData = (month) =>
    axios.get(`${API_URL}/piechart`, { params: { month } });

export const fetchCombinedData = (month) =>
    axios.get(`${API_URL}/combined`, { params: { month } });
