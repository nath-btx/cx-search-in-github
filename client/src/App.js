import './App.css'
import React from 'react'

class App extends React.Component {


  constructor(props) {
    super(props)
    this.state = {
      name: null
    }
  }


  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = (e) => {
    console.log(e)
    e.preventDefault();
    // get form data out of state
    const { name } = this.state.name;

   fetch('http://localhost:4242/users/' + name , {
  method: "GET",
  headers: {
    'Content-type': 'application/json'
  },
  body: JSON.stringify(this.state.name)
})
.then((result) => result.json())
.then((info) => { console.log(info); })
}



    render(){
      return(
      <div className="App">
        <label for="name">Name (4 to 8 characters):</label>
        <form action="/users/" method="post">
  
        <input type="text" id="name" name="name" size="10"/>
         <input type="submit" value="Envoyer le formulaire"/>
        </form>
  
  
      </div>
    )
  }
}


  

export default App;
