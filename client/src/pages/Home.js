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
        user: '6834'
    }




    componentDidMount() {
        API.getFridge(this.state.user)
            .then(res => {
                const newState = {...this.state}
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
        
        // API.updateFridge(this.state.items)
        //     .then(res => {
        //         this.setState(newState)
        //     })
    }
    
    render() {
        
        return (
            // <Container maxWidth='lg'>
                <div className="home-container" style={homeStyle}>
                <h1 className="title" style={titleStyle}>Welcome to Your Fridge</h1>
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

                </div>
        )
    }
}

export default Home;