function Home(){
  return (
    <Card
      txtcolor="black"
      header="BadBank Landing Module"
      title="WELCOME! PLEASE READ INSTRUCTIONS BELOW:"
      text="This refactor features a special Admin user, to see how it works log in with these credentials: MIT@mit.edu, MIT123"
      body={(<img src="bank.png" className="img-fluid" alt="Responsive image"/>)}
    />
  );  
}
