import React, { Component } from "react";
import ItemCard from "../components/ItemCard";
import SearchItems from "../components/SearchItems";
import API from '../utils/api';
import { withAuth } from '@okta/okta-react';
import NotSignedIn from "../components/NotSignedIn";
import "./style.css";
import Button from '@material-ui/core/Button';


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
            user: null,
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
            if (this.state.authenticated) {
                this.setState({ user: userinfo.email })
            }
            console.log(this.state)

            console.log('This is the state.user', this.state.user)
            API.createFridge(this.state.user)
                .then(res => {
                    console.log(res, 'create fridge')
                })
            API.getFridge(this.state.user)
                .then(res => {
                    console.log(res, 'res')
                    console.log('Succesfully accessed fridge data.\n', res.data)
                    this.setState({ items: res.data[0].items }, () => console.log('This is the updated fridge', this.state.items))
                })
                .catch(err => {
                    throw err
                })
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


    handleAddItem = event => {
        console.log(event.target.getAttribute('data-id'), 'is the event target')
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

        API.updateFridge(this.state.user, temp)
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

        API.updateFridge(this.state.user, temp)
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
        // console.log(event.target, 'this is the event target')
        if (event.target) {
            const wholeWord = event.target.innerText
            console.log(wholeWord)

            this.setState({
                search: wholeWord
            })
        } else {
            console.log(event)
        }
    }

    render() {
        if (this.state.authenticated) {
            return (
                <div className="home-container" style={homeStyle}>
                    <h1 className="title" style={titleStyle}>Welcome to Your Fridge, {this.state.userinfo.given_name}</h1>
                    <h2>Signed in as: {this.state.userinfo.email}</h2>
                    <br />
                    <span>
                        <SearchItems grabWord={this.handleSuggestionSelect} />
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
            return (
                <NotSignedIn item="fridge" img="http://www.locker14.com/wp-content/uploads/2014/11/Orange.LF_.2-.jpg" />
            )
        }
    }

});


