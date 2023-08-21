function Withdraw() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState('');
  const context = React.useContext(window.UserContext); 
  const [balance, setBalance] = React.useState(context.user.balance);

  React.useEffect(() => {
    setBalance(context.user.balance);
  }, [context.user.balance]);

  return (
    <Card
      bgcolor="success"
      header={`Withdraw - Current Balance: $${balance}`}
      status={status}
      body={show ? 
        <WithdrawForm setShow={setShow} setStatus={setStatus} balance={balance} setBalance={setBalance}/> :
        <WithdrawMsg setShow={setShow} setStatus={setStatus}/>}
    />
  );
}

function WithdrawMsg(props) {
  return (
    <>
      <h5>Success</h5>
      <button type="submit" 
        className="btn btn-light" 
        onClick={() => {
          props.setShow(true);
          props.setStatus('');
        }}>
          Withdraw again
      </button>
    </>
  );
}

function WithdrawForm(props) {
  const [amount, setAmount] = React.useState('');
  const context = React.useContext(window.UserContext); 

  async function handle() {
    if (parseFloat(amount) <= 0) {
      props.setStatus('Invalid withdrawal amount. Please enter a positive value greater than 0.');
      return;
    }

    if (parseFloat(amount) > props.balance) {
      props.setStatus('Insufficient funds. Please enter an amount less than or equal to your current balance.');
      return;
    }

    try {
      const response = await fetch(`/account/update/${context.user.email}/-${amount}`);
      const data = await response.json();

      if (data.value && data.value.transactions) {
        const lastTransaction = data.value.transactions[data.value.transactions.length - 1];
        if (lastTransaction && lastTransaction.type === 'withdraw') {
          props.setStatus(`Withdrew $${amount}. Remaining Balance: $${data.value.balance}`);
        }
      } else {
        props.setStatus(`Withdrew $${amount}. Remaining Balance: $${data.value.balance}`);
      }

      context.updateUserBalance(data.value.balance); //updates globally so that when you switch tabs it actually shows properly
      context.updateUserTransactions(data.value.transactions);
      props.setBalance(data.value.balance);  // Update the balance state

      props.setShow(false);
    } catch(err) {
      props.setStatus('Withdrawal failed');
      console.error('Error:', err);
    }
  }

  return(
    <>
      Amount<br/>
      <input type="number" 
        className="form-control" 
        placeholder="Enter amount" 
        value={amount} 
        onChange={e => setAmount(e.currentTarget.value)}/>
      <br/>

      <button type="submit" 
        className="btn btn-light" 
        onClick={handle}>Withdraw</button>
    </>
  );
}
