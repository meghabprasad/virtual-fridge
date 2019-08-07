import React, { Component } from "react";
import ItemCard from "../components/ItemCard";
import SearchItems from "../components/SearchItems";
import Container from '@material-ui/core/Container';
import API from '../utils/api';
import { withAuth } from '@okta/okta-react';
import NotSignedIn from "../components/NotSignedIn";
import "./style.css";
import { fontFamily } from "@material-ui/system";
import Button from '@material-ui/core/Button';
import SearchForm from '../components/SearchForm'
import Autocomplete from "../components/Autocomplete";
import Autosuggest from 'react-autosuggest';
import RawIngredientsList from "../utils/json/rawingredientslist.json"


const dictionary = RawIngredientsList;

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : dictionary.filter(item =>
        item.toLowerCase().slice(0, inputLength) === inputValue
    );
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = dictionary;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
    <div>
        {suggestion}
    </div>
);

// const background = "fridge-background.png"

const homeStyle = {

    width: '80vw',
    height: '100%',
    margin: '0 auto',
    marginTop: "20px",
    marginBottom: "20px",
    borderStyle: "solid",
    borderWidth: "1px",
    overflow: "scroll",
    color: "black",
    padding: "20px",
    fontSize: "15px",
    textAlign: "center",
    backgroundColor: "white",
    // boxShadow: '0px 0px 1px 1px gray',
    // border: '10px',

}

const homeStyle2 = {
    
    width: '80vw',
    height: '100%',
    margin: '0 auto',
    marginTop: "10px",
    marginBottom: "20px",
    borderStyle: "solid",
    borderWidth: "1px",
    overflow: "scroll",
    color: "black",
    paddingTop: "15px",
    paddingBottom: "20px",
    fontSize: "15px",
    textAlign: "center",
    // backgroundColor: "white",
    // boxShadow: '0px 0px 1px 1px gray',
    // border: '10px',

}

const titleStyle = {
    fontSize: "40px",
    color: "black",
    margin: "0auto",
    textAlign: "center",
    marginBottom: "20px",
    marginTop: "10px",
    fontFamily: 'Beth Ellen',
    // fontFamily: 'Libre Caslon Text',
    // fontFamily: 'Playfair Display',
    // fontFamily: 'Source Serif Pro',
    // fontFamily: 'Domine',
    // fontFamily: 'Old Standard TT',
}
export default withAuth(class Home extends Component {
    
    constructor(props) {
      super(props);
      this.state = { 
          authenticated: null,
          items: [],
          user: '6834',
          userinfo: {},
          search: ""
      };
      this.checkAuthentication = this.checkAuthentication.bind(this);
      this.checkAuthentication();
      this.login = this.login.bind(this);
      this.logout = this.logout.bind(this);
    }
  
    async checkAuthentication() {
      const authenticated = await this.props.auth.isAuthenticated();
      if (authenticated !== this.state.authenticated) {
        const userinfo = await this.props.auth.getUser();
        this.setState({ userinfo }); 
        console.log(this.state.userinfo);
        this.setState({ authenticated });
      }
    }
  
    componentDidUpdate() {
      this.checkAuthentication();
    }
  
    async login() {
      // Redirect to '/' after login
      this.props.auth.login('/');
    }
  
    async logout() {
      // Redirect to '/' after logout
      this.props.auth.logout('/');
    }



    // onChange = (event, { newValue }) => {
    //     this.setState({
    //         value: newValue
    //     });
    // };

    // // Autosuggest will call this function every time you need to update suggestions.
    // // You already implemented this logic above, so just use it.
    // onSuggestionsFetchRequested = ({ value }) => {
    //     this.setState({
    //         suggestions: getSuggestions(value)
    //     });
    // };

    // // Autosuggest will call this function every time you need to clear suggestions.
    // onSuggestionsClearRequested = () => {
    //     this.setState({
    //         suggestions: []
    //     });
    // };


    componentDidMount() {
        API.getFridge(this.state.user)
            .then(res => {
                // const newState = {...this.state}
                console.log('Succesfully accessed fridge data.\n', res.data)
                this.setState({ items: res.data[0].items }, () => console.log('This is the updated fridge', this.state.items))

            })
            .catch(err => {
                throw err
            })
    }

    handleAddItem = event => {
        const itemID = event.target.getAttribute('data-id')
        const newState = { ...this.state }
        const temp = [];

        newState.items.map(item => {
            if (item.name === itemID) {
                item.quantity++;
                temp.push(item)
                console.log(`Add 1 to quantity of ${item.name}`)
            } else {
                temp.push(item)
            }
        })
        newState.items = temp
        this.setState(newState)

        API.updateFridge(this.state.user, this.state.items)
            .then(res => {
                console.log(res.status)
            })
            .catch(err => {
                throw err
            })
    }

    handleRemoveItem = event => {
        console.log(this.state.items)
        const itemID = event.target.getAttribute('data-id')
        console.log('this is the itemid', itemID)
        const newState = { ...this.state }
        const temp = [];
        newState.items.map(item => {
            if (item.name === itemID) {
                console.log(item, 'this is the item')
                item.quantity--;
                temp.push(item)
                console.log(`Remove 1 from quantity of ${item.name}`)
            } else {
                temp.push(item)
            }
        })
        newState.items = temp
        this.setState(newState)
        console.log(this.state, 'This is the state after updating and setting state.')

        API.updateFridge(this.state.user, this.state.items)
            .then(res => {
                console.log(res.status)
            })
            .catch(err => {
                throw err
            })
    }

    handleDeleteCard = event => { //TODO: Create delete card button
        const itemID = event.target.getAttribute('data-id')
        console.log(itemID)
        const newState = { ...this.state }
        const temp = newState.items.filter(item => item.name !== itemID)
        console.log('This is the filtered list\n', temp)
        newState.items = temp
        this.setState(newState)
        console.log('Updated State\n', temp)

        API.updateFridge(this.state.user, temp)
            .then(res => {
                console.log(res.status)
            })
            .catch(err => {
                throw err
            })
    }

    handleAddToFridge = event => {
        const itemID = this.state.search
        const newState = { ...this.state }
        newState.items.push({
            name: itemID,
            quantity: 1
        })

        this.setState(newState)
        console.log(this.state, 'This is the state after updating and setting state.')

        API.updateFridge(this.state.user, this.state.items)
            .then(res => {
                console.log(res.status)
            })
            .catch(err => {
                throw err
            })
    }

    handleInputChange = event => { //TODO: Go to SearchItems and adjust to grab form input values.
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }

    handleSuggestionSelect = (event) => {
        // console.log(event.target)
        const part1 = event.target.getElementsByTagName('span')[0].innerHTML
        const part2 = event.target.getElementsByTagName('span')[1].innerHTML
        const wholeWord = part1 + part2
        console.log(wholeWord)
    
        this.setState({
            search: wholeWord
        })
      }

    render() {
        if (this.state.authenticated){
            return (
              // <Container maxWidth='lg'>

           <div className="home-container" style={homeStyle}>
                    <h1 className="title" style={titleStyle}>Welcome to Your Fridge, {this.state.userinfo.given_name}</h1>
                    <h2>Signed in as: {this.state.userinfo.email}</h2>
                    <br />
                <span>
                    {/* <SearchForm
                        fullWidth={true}
                        handleInputChange={this.handleInputChange}
                    /> */}
                    <SearchItems grabWord={this.handleSuggestionSelect} />
                    {/* <Autosuggest
                        suggestions={suggestions}
                        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                        getSuggestionValue={getSuggestionValue}
                        renderSuggestion={renderSuggestion}
                        inputProps={inputProps}
                        alwaysRenderSuggestions={true}
                    /> */}
                    <Button
                        type='submit'
                        onClick={this.handleAddToFridge}>
                        + Add to Fridge
                    </Button>
                </span>
                <div id="fridge-container" className="home-container" style={homeStyle2}>
          
                    {this.state.items.map(item => {
                        return (
                            <ItemCard
                                id={item.name}
                                key={item.name}
                                name={item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                                quantity={item.quantity} expiration="1"
                                handleRemove={this.handleRemoveItem}
                                handleAdd={this.handleAddItem}
                                handleDelete={this.handleDeleteCard}
                            />
                        )
                    })}

                </div>
                </div>

            )
        }
        else {
            return(
                <NotSignedIn item="fridge" img="http://www.locker14.com/wp-content/uploads/2014/11/Orange.LF_.2-.jpg"/>
            )
        }
    }

  });


