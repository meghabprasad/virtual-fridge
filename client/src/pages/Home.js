import React, { Component } from "react";
import ItemCard from "../components/ItemCard";
import SearchItems from "../components/SearchItems";
import Container from '@material-ui/core/Container';
import API from '../utils/api'


class Home extends Component{
    state = {
        items: [],
        user: '6834'
    }

    componentDidMount() {
        API.getFridge(this.state.user)
            .then(res => {
                console.log('Succesfully accessed fridge data.\n', res.data)
                this.setState({ items: res.data.items }) // Double-check resulting data
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
                <ItemCard name="Strawberry" quantity="10" expiration="2"/>
                <ItemCard name="Watermelon" quantity="1" expiration="5" />
                <div id="fridge-container">
                    
                </div>
            </Container>
        )
    }
}

export default Home;