export const groupTransactionsByMonth = (transactions: any[]) => {
    return transactions.reduce((acc, transaction) => {
        let date = new Date(transaction["date"]);
        let month: any = date.getMonth() + 1;
        month = month < 10 ? "0" + month : month;
        const year = date.getFullYear();
        const dateKey = year + "/" + month;

        if (!acc[dateKey]) {
            acc[dateKey] = [];
        }
        acc[dateKey].push(transaction);

        return acc;
    }, {});
 };