import React, { Component } from "react";
import axios from "axios";
import FixedContainer from "../Container"
// import TabPanel from "../Tabs"
import Card from "../RecipeReviewCard"

class MainPage extends Component {
    state = {
        recipes: []
    }

    retrieveInitialRecipes = () => {
        axios.get('https://api.spoonacular.com/recipes/findByIngredients?ingredients=bread,+lettuce,+chicken&apiKey=65fdffe480f1407ea6a4a3b80c3df511')
            .then(res => {
                this.setState({
                    recipes: res.data
                })
                console.log("Recipes", this.state.recipes);
            })
            .catch(err => {
                throw err
            })

    }

    componentDidMount() {
        console.log("Did we get here");
        this.retrieveInitialRecipes();
    }

    render() {
        if (this.state.recipes.length) {

            return (
                <div>
                    
                    <FixedContainer>
                        <Card 
                        name = {this.state.recipes[0].title}
                        image = {this.state.recipes[0].image}
                        missingIngredients = {this.state.recipes[0].missedIngredients}
                        />
                        <Card 
                        name = {this.state.recipes[1].title}
                        image = {this.state.recipes[1].image}
                        missingIngredients = {this.state.recipes[1].missedIngredients}
                        />
                        <Card 
                        name = {this.state.recipes[2].title}
                        image = {this.state.recipes[2].image}
                        missingIngredients = {this.state.recipes[2].missedIngredients}
                        />
                    </FixedContainer>
                </div>
            )
        } else {
            return (
                <div></div>
            );
        }
    }

}

export default MainPage;