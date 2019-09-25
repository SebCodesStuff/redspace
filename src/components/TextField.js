import Input from '@material-ui/core/Input';
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

class TextField extends Component {
    constructor () {
      super()
      this.state = {
        id: 'Choose an Id',
        error: false
      }
    }
  
  // Need to implement a search bar that fetches people
  
    render() {
        const { id, error } = this.state
        return (
            <React.Fragment>
                <Input
                  error={error}
                  label='Id'
                  onClick={() => this.clearText()}
                  onChange={(e) => this.validate(e.target.value)}
                  onKeyDown={(e) => this.isEnter(e.key)}
                  value={id}
                  className='id-input'
                />
                <Button variant="contained" onClick={() => this.onSubmit()} >Submit</Button>     
             </React.Fragment>
        )
    }

    clearText () {
        this.setState({ id: '' })
    }

    validate (id) {
        const validated = id >= 1 && id <= 32 || id === ''
        this.setState({ error: !validated, id })

    }

    onSubmit () {
        const { id, error } = this.state
        const { onChange } = this.props
        if (error) return
        onChange(id)
    }

    isEnter (key) {
        if (key === 'Enter') this.onSubmit()
    }
  
}
  
  
  export default TextField;
  