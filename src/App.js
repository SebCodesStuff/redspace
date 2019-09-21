import React, { Component } from 'react';
import './App.css';
import InfiniteScroll from './InfiniteScroll'
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { Input, Select } from '@material-ui/core';

// make a scroll bar that as you scroll it gets
// the next page

const people = [
  { id: 1, name: 'Luke SkyWalker' },
  { id: 2, name: 'Han Solo'}
]

class App extends Component {
  constructor () {
    super()
    this.state = {
      data: {
        restaurants: [],
        dropDownOpen: false

      }
    }
  }

  componentDidMount () {
    fetch('https://swapi.co/api/people?page=2')
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
          <h1>The Star Wars Nerdist</h1>
          {this.peopleDropdown(people)}
        </div>
        <h2>The best resource for all things Star Wars</h2>
        <div className='restaurant-container'>
          { this.displayRestaurants() }
        </div>
      </div>
    )
  }

  peopleDropdown (people) {
    return (
      <FormControl>
        <InputLabel>Choose Your Character</InputLabel>
        <Select value={"hans"}>
          {this.displayNames(people)}
        </Select>
      </FormControl>
    )
  }

  // peopleDropdown (people) {
  //   const { dropDownOpen } = this.state
  //   return (
  //     <div>
  //       <h3 onClick={() => this.dropdownClicked()} >Choose Your Character</h3>
  //       {dropDownOpen && this.displayNames(people)}
  //     </div>

  //   )
  // }

  dropdownClicked () {
    this.setState({ dropDownOpen: !this.state.dropDownOpen })
  }

  displayNames (people) {
    return people.map(person => {
      const { id, name } = person
      return (
        <MenuItem onClick={() => this.chooseCharacter(id)}>{name}</MenuItem>
      )
    })
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

  chooseCharacter (id) {
    fetch(`http://localhost:4000/people/${id}`)
    .then(res => {

      res.json().then(data => {
        console.log(data)
      })
    })
  }
}


export default App;
