function Balance(){
  const context = React.useContext(UserContext);

    // Check if user exists and if balance attribute exists, else default to 0
    const userBalance = (context && context.user && context.user.balance) ? context.user.balance : 0;

  return (
    <Card
      bgcolor="info"
      header="Balance"
      status={`Balance: $${context.user.balance}`} // Directly use context to display balance in status.
      body={<BalanceDisplay />} // Directly render BalanceDisplay for transaction history.
    />
  );
}

function BalanceDisplay() {
    const context = React.useContext(window.UserContext);
    const { balance = 0, transactions = [] } = (context && context.user) ? context.user : {};

    return (
      <div>
        {/* Displaying balance */}
        <h1 style={{ fontWeight: 'bold' }}>Balance: ${balance}</h1>
  
        {/* Check if there are any transactions to display */}
        {transactions.length > 0 ? (
          <>
            <h3>Transaction History:</h3>
            <ul>
              {transactions.map((transaction, index) => (
                <li key={index}>
                  {transaction.type} -- ${transaction.amount} -- {transaction.date}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p>No transaction history available.</p>
        )}
      </div>
    );
  }

// Removed BalanceMsg and the useEffect in Balance since they seem redundant for this use case.
