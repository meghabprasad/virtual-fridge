import React, { Component } from "react";
import axios from "axios";
import FixedContainer from "../Container"
// import TabPanel from "../Tabs"
import Card from "../RecipeReviewCard"

class MainPage extends Component {
    state = {

    }

    // retrieveInitialRecipes = () => {
    //     axios.get('https://api.spoonacular.com/recipes/findByIngredients?ingredients=bread,+lettuce,+chicken&apiKey=65fdffe480f1407ea6a4a3b80c3df511')
    //         .then(res => console.log(res))
    //         .catch(err => {
    //             throw err
    //         })

    // }

    // componentDidMount() {
    //     this.retrieveInitialRecipes();
    // }

    render() {
        return (
            <div>
                
                <FixedContainer>
                    <Card />
                    <Card />
                    <Card />
                    <Card />


                </FixedContainer>
            </div>
        )
    }

}

export default MainPage;