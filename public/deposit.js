
function Deposit() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState('');
  const context = React.useContext(window.UserContext); 
  const [balance, setBalance] = React.useState(context.user.balance);

  return (
    <Card
      bgcolor="warning"
      header={`Deposit - Current Balance: $${balance}`}
      status={status}
      body={show ? 
        <DepositForm setShow={setShow} setStatus={setStatus} setBalance={setBalance}/> :
        <DepositMsg setShow={setShow} setStatus={setStatus}/>}
    />
  );
}

function DepositMsg(props) {
  return (
    <>
      <h5>Success</h5>
      <button type="submit" 
        className="btn btn-light" 
        onClick={() => {
          props.setShow(true);
          props.setStatus('');
        }}>
          Deposit again
      </button>
    </>
  );
} 

function DepositForm(props) {
  const [amount, setAmount] = React.useState('');
  const context = React.useContext(window.UserContext);

  function handle() {
    if (parseFloat(amount) <= 0) {
      props.setStatus('Invalid deposit amount. Please enter a positive value greater than 0.');
      return;
    }

    fetch(`/account/update/${context.user.email}/${amount}`)
      .then(response => response.text())
      .then(text => {
        try {
          const data = JSON.parse(text);

          if(data.value && data.value.transactions) {
            const lastTransaction = data.value.transactions[data.value.transactions.length - 1];
            if(lastTransaction && lastTransaction.type === 'deposit') {
              props.setStatus(`Deposited $${amount}. New Balance: $${data.value.balance}`);
            } else {
              props.setStatus('Error in recording transaction.');
            }
          } else {
            props.setStatus(`Deposited $${amount}. New Balance: $${data.value.balance}`);
          }
          
          context.updateUserBalance(data.value.balance);
          context.updateUserTransactions(data.value.transactions);

          props.setBalance(data.value.balance);
          props.setShow(false);
          console.log('JSON:', data);
        } catch(err) {
          props.setStatus('Deposit failed');
          console.log('err:', text);
        }
      });
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
        onClick={handle}>Deposit</button>
    </>
  );
}
