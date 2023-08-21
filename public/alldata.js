function AllData() {
    const [data, setData] = React.useState([]);

    React.useEffect(() => {

        // fetch all accounts from API
        fetch('/account/all')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                // segregate transaction data so its visible by user
                const filteredData = data.map(account => {
                    const { transactions, ...rest } = account; // extract transactions into its own section
                    return rest; // return everything formatted
                });
                setData(filteredData);
            });

    }, []);

    return (
        <>
            <h5>All Data in Store:</h5>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </>
    );
}
