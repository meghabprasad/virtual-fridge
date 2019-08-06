import React, { Component } from "react";
import ItemCard from "../components/ItemCard";
import SearchItems from "../components/SearchItems";
import Container from '@material-ui/core/Container';
import API from '../utils/api'

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

    handleRemoveItem = event => {
        console.log(this.state.items)
        const itemID = event.target.getAttribute('data-id')
        console.log('this is the itemid', itemID)
        const newState = {...this.state}
        const temp = [];
        newState.items.map(item => {
            if (item.name == itemID) {
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
    
    render() {
        
        return (
            <Container maxWidth='lg'>
                {/* TODO: Create a header/jumbotron */}
                <h1>My Fridge</h1>
                <br />
                <SearchItems />
                <div id="fridge-container">
                    {this.state.items.map(item => {
                        return (
                            <ItemCard 
                            id={item.name} 
                            key={item.name} 
                            name={item.name.charAt(0).toUpperCase() + item.name.slice(1)} 
                            quantity={item.quantity} expiration="1"
                            handleRemove={this.handleRemoveItem}
                            />
                        )
                    })}
                </div>
            </Container>
        )
    }
}

export default Home;