const axios = require('axios');

const USER_API = 'http://localhost:5000/api';

async function checkRoutes() {
    try {
        console.log('Checking /api/creators/5 ...');
        // We expect a JSON response or 404 JSON, not HTML
        const res = await axios.get(`${USER_API}/creators/5`);
        console.log('Response Status:', res.status);
        console.log('Response Data:', res.data);
    } catch (error) {
        if (error.response) {
            console.log('Error Status:', error.response.status);
            console.log('Error Data Type:', typeof error.response.data);
            if (typeof error.response.data === 'string') {
                console.log('Error Body (First 500 chars):');
                console.log(error.response.data.substring(0, 500));
            } else {
                console.log('Error Body:', error.response.data);
            }
        } else {
            console.log('Network Error:', error.message);
        }
    }
}

checkRoutes();
