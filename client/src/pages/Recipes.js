import React, { Component } from "react";
import ingredients from "../utils/json/rawingredientslist"
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
// import CheckBoxIcon from '@material-ui/icons/CheckBox';
import axios from "axios";

//something about how the children don't all have a unique key


const ingredientsStyle = {
    width: '80vw',
    height: '50vh',
    margin: '0 auto',
    marginTop: "20px",
    marginBottom: "20px",
    borderStyle: "solid",
    borderWidth: "1px",
    overflow: "scroll",
    color: "black",
    padding: "20px",
    fontSize: "15px"

}

const titleStyle = {
    fontSize: "40px",
    color: "black",
    margin: "0auto",
    textAlign: "center",
    marginBottom: "40px",
    marginTop: "40px"
}

const buttonHolder = {
    textAlign: "center",
    margin: "0auto",
    marginBottom: "20px"
}

const buttonStyle = {
    margin: "20px",
    variant: "contained",
    color: "primary"
}



class Recipes extends Component {
    state = {
        ingredients: [],
        displayResults: false,
        results: [], 
        queryURL: ""
    }


    handleCheckBox = event => {
        const newState = { ...this.state } // Instantiates a holding area for state mutations.
        const newItem = event.target.value // Grabs value of checkbox item
        if (this.state.ingredients.includes(newItem)) {
            // console.log(newState.ingredients.indexOf(newItem))
            const itemIndex = newState.ingredients.indexOf(newItem)
            newState.ingredients.splice(itemIndex, 1)
            console.log(`You removed ${newItem}`, this.state.ingredients)

            console.log('QueryURL', this.createQuery())
        } else {
            newState.ingredients.push(newItem)
            this.setState(newState)
            console.log(`You've added ${newItem} to your search query.`, this.state.ingredients)

            //console.log('QueryURL', this.createQuery())
            this.createQuery()
        }
    };

    createQuery = () => {
        const apiKey = '&apiKey=65fdffe480f1407ea6a4a3b80c3df511'; // TODO: Hide with dotenv
        const queryParams = this.state.ingredients.join('+,')
        const queryURL = ('https://api.spoonacular.com/recipes/findByIngredients?ingredients=' + queryParams + apiKey).split(' ').join('+')

        this.setState({
            queryURL: queryURL
        })
    }

    handleSubmit = event => {
        //:? do we need the event.preventDefault part
        console.log("The handle submit function ran");
        axios.get(this.state.queryURL)
            .then(res => {
                console.log("Our response was", res);
                this.setState({
                    results: res.data, 
                    displayResults: true
                })
                console.log("The current recipes are " + this.state.results);
            })
            .catch(err => {
                throw err
            })
    }

    render() {
        return (
            <div>
            <h1 className="title" style={titleStyle}>Recipes for You</h1>
            <div className='ingredients-container' style={ingredientsStyle}>
                <FormGroup row>
                    {ingredients.map(ingredient => {
                        return (
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        key={ingredient.n}
                                        onClick={(event) => this.handleCheckBox(event)}
                                        value={ingredient}
                                        color="primary"
                                    />
                                }
                                label={ingredient}
                            />
                        );
                    })
                    }
                </FormGroup>
            </div>
            <div className="button-holder" style={buttonHolder}>
            <button onClick={this.handleSubmit} style={buttonStyle}>Submit</button>
                {this.state.displayResults ? <div>{this.state.results.map(result => {
                    return (
                        <p>{result.title}</p>
                    )
                })}</div> : <div>Nothing to display yet</div>}
            </div>
            </div>
        )
    }
}

export default Recipes;