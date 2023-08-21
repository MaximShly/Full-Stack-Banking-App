function Login(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');    
  const [loading, setLoading] = React.useState(false);

  return (
    <Card
      bgcolor="secondary"
      header="Login"
      status={status}
      body={loading ? <LoadingIndicator /> : (show ? 
        <LoginForm setShow={setShow} setStatus={setStatus} setLoading={setLoading}/> :
        <LoginMsg setShow={setShow} setStatus={setStatus}/>)}
    />
  ) 
}

function LoadingIndicator() { 
  return <div>Loading...</div>;
}

function LoginMsg(props) {
  const context = React.useContext(window.UserContext);
  const user = context.user;

  return (
    <div style={{ backgroundColor: 'orange', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <h1 style={{ color: 'black' }}>Welcome, {user.name}!</h1>
      <div className="embed-responsive embed-responsive-16by9" style={{ width: '70%', marginTop: '20px' }}>
        <iframe 
          className="embed-responsive-item" 
          src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
          title="Welcome"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}


function LoginForm(props){
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');

  const context = React.useContext(window.UserContext);  // Access the UserContext from the window.

  function handle() {
    props.setLoading(true);  // <-- Start loading here
    fetch(`/account/login/${email}/${password}`)
      .then(response => response.text())
      .then(text => {
        try {
          const data = JSON.parse(text);
          props.setStatus('');
          props.setShow(false);
          console.log('JSON:', data);

          context.setUser(data);
        } catch (err) {
          props.setStatus(text);
          console.log('err:', text);
        }
      })
      .finally(() => {
        props.setLoading(false);  
      });
  }


  return (<>

    Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/>

    Password<br/>
    <input type="password" 
      className="form-control" 
      placeholder="Enter password" 
      value={password} 
      onChange={e => setPassword(e.currentTarget.value)}/><br/>

    <button type="submit" className="btn btn-light" onClick={handle}>Login</button>
   
  </>);
}