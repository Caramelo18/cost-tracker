export interface CTService {
    loadTransactions(): Promise<any>
}

export async function loadTransactions(): Promise<any> {
    const transactionsUrl = "http://localhost:8080/transactions";

    return fetch(transactionsUrl)
        .then(response => response.json())
        .then(data => {
            return data;
        });
}

export async function loadBalance(): Promise<any> {
    const balanceUrl = "http://localhost:8080/balance";

    return fetch(balanceUrl)
        .then(response => response.json())
        .then(data => {
            return data.balance;
        });
}

export async function loadSubscriptions(): Promise<any> {
    const url = "http://localhost:8080/subscriptions";

    return fetch(url).then(response => response.json()).then(response => {
        return response;
    });
}

export async function loadSalaries(): Promise<any> {
    const url = "http://localhost:8080/salaries";

    return fetch(url)
        .then(response => response.json())
        .then(response => {
            return response;
        });
}

export async function addTransaction(data: any): Promise<any> {
    const url = "http://localhost:8080/transactions/";

    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => response.json())
        .then(response => {
            return response;
        });
}

export async function editTransaction(id: string, data: any): Promise<any> {
    const url = "http://localhost:8080/transactions/" + id;

    return fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => response.json())
        .then(response => {
            return response;
        });
}

export async function deleteTransaction(id: string): Promise<any> {
    const url = "http://localhost:8080/transactions/" + id;

    return fetch(url, {
        method: 'DELETE',
    }).then(() => {
        return id;
    });
}

export default { loadTransactions, loadBalance, loadSubscriptions } as CTService;