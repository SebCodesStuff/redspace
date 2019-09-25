import React, { Component } from 'react';
import './App.css';
import DropDown from './components/DropDown'
import TextField from './components/TextField'
import { MoonLoader } from 'react-spinners';

const spinnerCss = { marginTop: '75px' }

class App extends Component {
  constructor () {
    super()
    this.state = {
      person: {},
      loading: false
    }
  }

  render() {
    return (
      <div className="App">
        <div className='nav' >
          <h1>The Star Wars Nerdist</h1>
          <DropDown onChange={(id) => this.chooseCharacter(id)}/>
        </div>
        <h2>The best resource for all things Star Wars</h2>
        <p>Please choose an id between 0 - 32 or choose by name in the input above</p>
        <TextField onChange={(id) => this.chooseCharacter(id)}/>
        <section className='info-section'>
          <MoonLoader
            css={spinnerCss}
            class='spinner'
            sizeUnit={"px"}
            size={150}
            loading={this.state.loading}
          />
          { this.displayPersonInfo() }
        </section>
      </div>
    )
  }

  displayPersonInfo () {
    const {
      name,
      height,
      mass,
      hair_color,
      skin_color,
      gender,
      birth_year,
      homeworld,
      filmsArr,
      speciesInfo
    } = this.state.person
    if (!name) return null
    return (
      <div className='person-container' >
        <h3>{ name }</h3>
        <p><strong>Birth Year: </strong>{birth_year}</p>
        <p><strong>Height: </strong>{`${height} cm`}</p>
        <p><strong>Mass: </strong>{`${mass} kg`}</p>
        <p><strong>Hair Color: </strong>{hair_color}</p>
        <p><strong>Skin Color: </strong>{skin_color}</p>
        <p><strong>Gender: </strong>{gender}</p>
        {this.displaySpeciesInfo(speciesInfo)}
        {this.displayFilmsInfo(filmsArr)}
      </div>
    )
  }

  displaySpeciesInfo (speciesInfo) {
    if (!speciesInfo) return null
    const { average_lifespan, classification, language, name } = speciesInfo
    return (
      <React.Fragment>
        <h3>Species</h3>
        <p><strong>Name: </strong>{name}</p>
        <p><strong>Average Lifespan: </strong>{average_lifespan}</p>
        <p><strong>Classification: </strong>{classification}</p>
        <p><strong>Language: </strong>{language}</p>
      </React.Fragment>
    )    
  }

  displayFilmsInfo (filmArr) {
    if (!filmArr) return null
    return (
      <React.Fragment>
        <h3>Films Appeared In</h3>
        {this.getFilmDetails(filmArr)}
      </React.Fragment>
    )

  }

  getFilmDetails (filmArr) {
    return filmArr.map((film, i) => {
      const {title, director, producer, release_date} = film
      return (
        <div className='film-section' key={i}>
          <h4>{title}</h4>
          <p><strong>Release Date: </strong>${release_date}</p>
          <p><strong>Director: </strong>{director}</p>
          <p><strong>Producer: </strong>{producer}</p>
        </div>
      )    
    })
  }

  chooseCharacter (id) {
    this.setState({ loading: true, person: {} })
    fetch(`http://localhost:4000/people/${id}`)
    .then(res => {

      res.json().then(person => {
        this.setState({ person, loading: false })
      })
    })
  }
}


export default App;
