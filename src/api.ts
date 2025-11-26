const BASE_URL = 'https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api';

export const fetchCustomers = () => {
    return fetch(`${BASE_URL}/customers`)
        .then(res => {
            if (!res.ok) throw new Error('Error fetching customers: ' + res.statusText);
            return res.json();
        });
};

export const fetchTrainings = () => {
    return fetch(`${BASE_URL}/gettrainings`)
        .then(res => {
            if (!res.ok) throw new Error('Error fetching trainings: ' + res.statusText);
            return res.json();
        })
        .then(data => {
            console.log('API returned:', data);
            return data;
        });
};

export const addCustomer = (customer: any) => {
    return fetch(`${BASE_URL}/customers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customer)
    }).then(res => {
        if (!res.ok) throw new Error('Error adding customer: ' + res.statusText);
        return res.json();
    });
};

export const deleteCustomer = (url: string) => {
    return fetch(url, { method: 'DELETE' })
        .then(res => {
            if (!res.ok) throw new Error('Error deleting customer: ' + res.statusText);
            return res.json();
        });
};

export const addTraining = (training: any) => {
    return fetch(`${BASE_URL}/trainings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(training)
    }).then(res => {
        if (!res.ok) throw new Error('Error adding training: ' + res.statusText);
        return res.json();
    });
};

export const deleteTraining = (url: string) => {
    return fetch(url, { method: 'DELETE' })
        .then(res => {
            if (!res.ok) throw new Error('Error deleting training: ' + res.statusText);
            return res.json();
        });
};
