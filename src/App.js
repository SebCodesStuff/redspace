import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor () {
    super()
    this.state = {
      data: {
        restaurants: []
      }
    }
  }

  componentDidMount () {
    fetch('https://swapi.co/api/people?page=1')
    .then(res => {
      if (res.status !== 200) {
        console.log('There was an issue fetching the data')
        return
      }

      res.json().then(data => {
        console.log(data)
        // this.setState({ data })
      })
    })
    .catch(err => {
      console.error(err)
    })
  }

  render() {
    return (
      <div className="App">
        <div className='nav' >
          <h1 onClick={() => this.chooseCharacter()} >The Star Wars Nerdist</h1>
        </div>
        <h2>The best resource for all things Star Wars</h2>
        <div className='restaurant-container'>
          { this.displayRestaurants() }
        </div>
      </div>
    )
  }

  displayRestaurants () {
    const { restaurants } = this.state.data
    if (!restaurants.length) return null
    return restaurants.map((restaurant, index) => {
      const { name, price, image_url, address } = restaurant
      return (
        <div className='restaurants' key={index}>
          <h3>{ name }</h3>
          <img src={image_url} alt={`image for ${name}`} />
          <p>{ address }</p>
        </div>
      )
    })
  }

  chooseCharacter () {
    fetch('http://localhost:4000/people/1')
    .then(res => {

      res.json().then(data => {
        console.log(data)
      })
    })
  }
}


export default App;
