import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Service from './service.js';


// Service.getImageItems(number){

// }


class App extends Component {

  
  state ={
    load: true,
    picnumber: Number,
    textstatus: '',
    colorstatus: '',
    catphoto : [],
  };

  handleChangePicNumber  = event => {
    this.setState({ picnumber: event.target.value });
};
  handleSubmit = event => {
    this.setState({ load:false });
    this.setState({ textstatus: 'LOADING...'})
    this.setState({ colorstatus: 'orange'})

    Service.getImageItems(this.state.picnumber)
    .catch( (error) => {
      this.setState({ load:true });
      this.setState({ textstatus: 'FAILED'})
      this.setState({ colorstatus: 'red'})    
    }).then( (res) => {
      console.log(res)
      this.setState({ catphoto: res})
      this.setState({ load:true });
      this.setState({ textstatus: 'SUCCESS'})
      this.setState({ colorstatus: 'green'})
    })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Welcome to Cat Gallery</h1>
          <br></br>
          <h2>Type amount of image : <input  disabled={!this.state.load} onChange={this.handleChangePicNumber}></input>
          <button type="button" disabled={!this.state.load} onClick={this.handleSubmit}>Submit</button></h2>
          <h3 style={{ color: this.state.colorstatus }}>{this.state.textstatus}</h3>
          <div>
          {this.state.catphoto.map((res) => (
            <div className="card"  key={res.id}>
              <img className="pic"src={res.image} alt="logo" />
              <br></br>
              <h2>{res.label}</h2>
            </div>
            
          ))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
