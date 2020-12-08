import './App.css'
import React from 'react'



class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      value: '',
      isLoaded: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }

handleChange(event) {
  this.setState({value: event.target.value})
}

handleSubmit(event) {
  this.getUser(this.state.value);
  event.preventDefault();
}
  
getUser(name) {
  fetch('http://localhost:4242/users/' + name , {
  method: "GET",
  headers: {
    'Content-type': 'application/json'
  },
})
.then((result) => result.json()) 
.then((result) => { 
  this.setState({
    value: result,
    isLoaded: true
  })
    return result
  })
}

tabValue(value) {
  if(value){
    if (value['message'] === "Not Found")
      return <p> User not found </p>
    else if (value['0'])
      return null
    else {
  var keys = Object.keys(value)
  var values = Object.values(value)
  const listkeys = keys.map((key) => 
    <tr> { key } </tr>
  )
  const listvalues = values.map((valeur) => 
      <tr> &nbsp; { valeur } </tr>
  )
  return <div className = "values"><table><td> { listkeys } </td> <td> { listvalues } </td> </table></div>
    }
  }
else 
    return <p> no value </p>
}



  render(){
    const { isLoaded, value } = this.state;

    if (!isLoaded){
    return(
      <div className="App">
        <form onSubmit={this.handleSubmit}>
        <label>
        Cherchez un utilisateur github : 
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Envoyer" />
      </form>
      </div>
    )
  }
else {
  return(
    <div className="App">
      <form onSubmit={this.handleSubmit}>
      <label>
        Cherchez un utilisateur github : 
        <input type="text" value={value['login']} onChange={this.handleChange} />
      </label>
      <input type="submit" value="Envoyer" />
    </form>
      { this.tabValue(value) }

    </div>
  )
}
}
}

export default App;

// Object.keys(value).map((valeur, index) => {
//   return value[index]
// })