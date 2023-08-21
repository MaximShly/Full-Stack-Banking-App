function ProtectedRoute({ component: Component, ...rest }) {
  const context = React.useContext(UserContext);
  const user = context.user;

  return (
    <Route
      {...rest}
      render={props =>
        user && user.isAdmin ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}



function Spa() {
  const [user, setUser] = React.useState(null);

  const updateUserBalance = (newBalance) => {
    setUser(prevUser => ({ ...prevUser, balance: newBalance }));
  };
  const updateUserTransactions = (newTransactions) => {
    setUser(prevUser => ({ ...prevUser, transactions: newTransactions }));
  };

  return (
    <HashRouter>
      <div>
        <UserContext.Provider value={{ user, setUser, updateUserBalance, updateUserTransactions }}>
          <NavBar/>        
          <div className="container" style={{padding: "20px"}}>
            <Route path="/" exact component={Home} />
            <Route path="/CreateAccount/" component={CreateAccount} />
            <Route path="/login/" component={Login} />
            <Route path="/deposit/" component={Deposit} />
            <Route path="/withdraw/" component={Withdraw} />
            {/* <Route path="/transactions/" component={Transactions} /> */}
            <Route path="/balance/" component={Balance} />
            <ProtectedRoute path="/alldata/" component={AllData} />
          </div>
        </UserContext.Provider>
      </div>
    </HashRouter>
  );
}

ReactDOM.render(
  <Spa/>,
  document.getElementById('root')
);
