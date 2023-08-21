function CreateAccount(){
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState('');
  const [isValidName, setIsValidName] = React.useState(false);
  const [isValidEmail, setIsValidEmail] = React.useState(false);
  const [isValidPassword, setIsValidPassword] = React.useState(false);

  const isFormValid = isValidName && isValidEmail && isValidPassword;

  return (
      <Card
          bgcolor="primary"
          header="Create Account"
          status={status}
          body={show ? 
              <CreateForm 
                   setShow={setShow} 
                   setIsValidName={setIsValidName}
                   setIsValidEmail={setIsValidEmail}
                   setIsValidPassword={setIsValidPassword}
                   isValidName={isValidName}
                   isValidEmail={isValidEmail}
                   isValidPassword={isValidPassword}
                   isFormValid={isFormValid}
              /> : 
              <CreateMsg setShow={setShow}/>
          }
      />
  );
}

function CreateMsg(props){
  return (
      <>
          <h5>Success</h5>
          <Link to="/login" className="btn btn-light">Login</Link>
      </>
  );
}


function CreateForm(props){
  const { 
    setIsValidName, 
    setIsValidEmail, 
    setIsValidPassword, 
    isValidName, 
    isValidEmail, 
    isValidPassword, 
    isFormValid, 
    setShow 
} = props;
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function validateName(inputName) {
    const isValid = /\s/.test(inputName) && inputName.trim().split(' ').length === 2;
    setIsValidName(isValid);
    return isValid;
  }

  function validateEmail(inputEmail) {
    const isValid = /\S+@\S+\.\S+/.test(inputEmail);
    setIsValidEmail(isValid);
    return isValid;
  }

  function validatePassword(inputPassword) {
    const isValid = inputPassword.length > 3;
    setIsValidPassword(isValid);
    return isValid;
  }

  function handle(){
      const formattedName = name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
      setName(formattedName);

      const url = `/account/create/${formattedName}/${email}/${password}`;
      (async () => {
          var res = await fetch(url);
          var data = await res.json();    
          console.log(data);        
      })();
      props.setShow(false);
  }

  return (
      <>
          Name<br/>
          <input 
              type="input"
              className={`form-control ${isValidName ? 'is-valid' : 'is-invalid'}`}
              placeholder="Enter name"
              value={name}
              onChange={e => {
                  setName(e.currentTarget.value);
                  validateName(e.currentTarget.value);
              }} 
          /><br/>

          Email address<br/>
          <input 
              type="input"
              className={`form-control ${isValidEmail ? 'is-valid' : 'is-invalid'}`}
              placeholder="Enter email"
              value={email}
              onChange={e => {
                  setEmail(e.currentTarget.value);
                  validateEmail(e.currentTarget.value);
              }} 
          /><br/>

          Password<br/>
          <input 
              type="password"
              className={`form-control ${isValidPassword ? 'is-valid' : 'is-invalid'}`}
              placeholder="Enter password"
              value={password}
              onChange={e => {
                  setPassword(e.currentTarget.value);
                  validatePassword(e.currentTarget.value);
              }}
          /><br/>

          <button 
              type="submit" 
              className="btn btn-light" 
              onClick={handle}
              disabled={!isFormValid}
          >Create Account</button>
      </>
  );
}
