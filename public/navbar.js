function NavBar() {
  const context = React.useContext(window.UserContext);
  const user = context.user;

  // For logging out and setting user to null
  const handleLogout = () => {
      context.setUser(null);
      window.location.href = "/#";  // Navigate to homepage

  };

  return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
              {/* Always Visible Brand Logo and Name */}
              <a className="navbar-brand" href="#/">
                  <img src="bank.png" alt="BadBank Logo" width="30" height="30" className="d-inline-block align-top"/>
                  BadBank
              </a>

              {/* If user is not logged in */}
              {!user && 
                  <div className="navbar-nav ml-auto">
                      <a className="nav-item nav-link" href="#/CreateAccount/">Create Account</a>
                      <a className="nav-item nav-link" href="#/login/">Login</a>
                  </div>
              }

              {/* If user is logged in and is not an admin */}
              {user && !user.isAdmin &&
                  <>
                      <div className="navbar-nav mx-auto">
                          <a className="nav-item nav-link" href="#/deposit/">Deposit</a>
                          <a className="nav-item nav-link" href="#/withdraw/">Withdraw</a>
                          <a className="nav-item nav-link" href="#/balance/">Balance</a>
                      </div>
                      <div className="navbar-nav ml-auto">
                          <span className="navbar-text">{user.email}</span>
                          <button className="btn btn-secondary ml-2" onClick={handleLogout}>Logout</button>
                      </div>
                  </>
              }

              {/* If user is logged in and is an admin */}
              {user && user.isAdmin &&
                  <>
                      <div className="navbar-nav mx-auto">
                          <a className="nav-item nav-link" href="#/alldata/">AllData</a>
                      </div>
                      <div className="navbar-nav ml-auto">
                          <span className="navbar-text">{user.email}</span>
                          <button className="btn btn-secondary ml-2" onClick={handleLogout}>Logout</button>
                      </div>
                  </>
              }
          </div>
      </nav>
  );
}