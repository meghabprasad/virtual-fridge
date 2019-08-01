import React, { Component } from "react";
import ItemCard from "../components/ItemCard"

function Home (){
    return (
        <div> 
            <h1> This is the Home page</h1>
            <ItemCard imageLink="https://images.vexels.com/media/users/3/128847/isolated/preview/0f60c4d492e78879ce6b7f93e501f1da-strawberry-fruit-circle-icon-by-vexels.png"name="Strawberry" quantity="10" expiration="2"/>
            <ItemCard imageLink="https://images.vexels.com/media/users/3/129027/isolated/preview/8b9c2b06ae7b3cc2dfc6ac983df19dd2-watermelon-flat-circle-icon-by-vexels.png"name="Watermelon" quantity="1" expiration="5" />

        </div>
    )
}

export default Home;