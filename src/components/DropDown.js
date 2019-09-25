import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { Select } from '@material-ui/core';
import React from 'react';


  const people = [
    { id: 1, name: 'Luke SkyWalker' },
    { id: 14, name: 'Han Solo'},
    { id: 11, name: 'Anakin Skywalker'},
    { id: 13, name: 'Chewbacca'},
    { id: 5, name: 'Leia Organa'}
  ]
  
  export default function DropDown(props) {
    if (!props) return null  
    const { onChange, selected = 'luke' } = props
    const [values, setValues] = React.useState({
        person: '',
      });
    
    return (
        <form >
            <FormControl id={'formControl'}>
                <InputLabel htmlFor='person-id'>Choose Your Character</InputLabel>
                <Select
                    onChange={(e) => onChange(e.target.value)}
                    value={values}
                    inputProps={{
                        name:'person',
                        id: 'persons-id'
                    }}
                >
                    { displayNames(people) }
                </Select>
            </FormControl>
        </form>
    )
  }


  function displayNames (people) {
    return people.map(person => {
      const { id, name } = person
      return (
        <MenuItem key={id} value={id} >{name}</MenuItem>
      )
    })
  }
