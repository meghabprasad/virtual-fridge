import React, { Component } from "react";
import ItemCard from "../components/ItemCard";
import SearchItems from "../components/SearchItems";
import Container from '@material-ui/core/Container';
import API from '../utils/api'


const homeStyle = {
    
    width: '80vw',
    height: '100%',
    margin: '0 auto',
    marginTop: "20px",
    marginBottom: "20px",
    // borderStyle: "solid",
    // borderWidth: "1px",
    overflow: "scroll",
    color: "black",
    padding: "20px",
    fontSize: "15px",
    textAlign: "center"

}

const titleStyle = {
    fontSize: "40px",
    color: "black",
    margin: "0auto",
    textAlign: "center",
    marginBottom: "20px",
    marginTop: "10px"
}


class Home extends Component{
    state = {
        items: [],
        user: '6834' //TODO: Will need to dynamically generate the user according to the okta login/auth
    }




    componentDidMount() {
        API.getFridge(this.state.user)
            .then(res => {
                // const newState = {...this.state}
                console.log('Succesfully accessed fridge data.\n', res.data)
                this.setState({ items: res.data[0].items }, () => console.log('This is the updated fridge', this.state.items))
                //TODO: Find out why 
                
            })
            .catch(err => {
                throw err
            })
    }

    handleAddItem = event => {
        const itemID = event.target.getAttribute('data-id')
        const newState = {...this.state}
        const temp = [];

        newState.items.map(item => {
            if (item.name == itemID) {
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
        // console.log('this is the itemid', itemID)
        const newState = {...this.state}
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
            return console.log('Completed remove function.')
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
        const newState = {...this.state}
        const temp = newState.items.filter(item => item.name !== itemID)
        console.log('This is the filtered list\n', temp)
        newState.items = temp
        this.setState(newState)
        console.log('Updated State\n', this.state.items)

        API.updateFridge(this.state.user, this.state.items)
            .then(res => {
                console.log(res.status)
            })
            .catch(err => {
                throw err
            })
    }

    handleAddToFridge = event => { //Similar to handleFromSubmit in gbooks.
        const itemID = event.target.getAttribute('data-id') // TODO: Grab itemID from form input/autocomplete bar.
        const newState = {...this.state}
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

    render() {
        return (
            // <Container maxWidth='lg'>
                <div className="home-container" style={homeStyle}>
                <h1 className="title" style={titleStyle}>Welcome to Your Fridge</h1>
                <br />
                <SearchItems onChange={this.handleInputChange}/>
                <div id="fridge-container">
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
}

export default Home;