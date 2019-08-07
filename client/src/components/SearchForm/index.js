import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Container from '@material-ui/core/Container';

function SearchForm(props) {

    return (
        <Container maxWidth='lg'>
            <FormControl fullWidth={true}>
                <InputLabel htmlFor='search-input'>
                    Add Ingredients to Fridge
            </InputLabel>
                <Input
                    onChange={props.handleInputChange}
                    id='search-input'
                    aria-describedby='my-helper-text'
                    name='search'
                />
                <FormHelperText id='my-helper-text'>e.g. kaswal nuts</FormHelperText>
                {props.children}
                {/* <div id='search-form' className='text-center'>
            <input className='form-control' name='search'
                placeholder='Search for an ingredient...'
                type='text'
                onChange={props.handleInputChange}></input>
                <br />
                <button
                className='btn btn-block btn-primary'
                onClick={props.handleFormSubmit}
                type='submit'
                >   Search
            </button>
        </div> */}
            </FormControl>
        </Container>
    )
}

export default SearchForm