# Fridge
As young adults, we spend hundreds of dollars eating out when we could 
easily make food with the ingredients at home.

FRIDGE allows users to:

    - Store and keep track of the ingredients in their fridge 
    - Search for recipes based on the ingredients in the fridge 
    - Look for nearby grocery stores to purchase the missing ingredients needed 
      for the recipe

<br>

### Link to delopyed site

https://fathomless-ocean-69359.herokuapp.com/

## To run locally 

    - Clone Repo
    - In the porject repository terminal: 
        - npm install
        - node server.js 
        - npm run client 
    - Run `mongod` in the background

### Author

Author : [Megha](https://github.com/meghabprasad))

Author : [Greyson](https://github.com/greysongy)

Author : [Chris](https://github.com/BAANG)

Author : [Matthew](https://github.com/matthewryanhagarty)

### Site Images

<img src="./client/src/images/Login.png">

<img src="./client/src/images/HomePage.png">

<img src="./client/src/images/RecipePage.png">

<br>


### Tech Used

1. [JavaScript](https://www.javascript.com/)
2. [Node](https://nodejs.org/en/)

- Node.js is an open-source, cross-platform JavaScript run-time environment that executes JavaScript code outside of a browser. 
- Node.js lets developers use JavaScript to write command line tools and for server-side scripting—running scripts server-side to produce dynamic web page content before the page is sent to the user's web browser

3. [MongoDB](https://www.mongodb.com/)

- MongoDB is a general purpose, document-based, distributed database built for modern application developers and for the cloud era. 

4. [Mongoose](https://mongoosejs.com)

- Mongoose provides a straight-forward, schema-based solution to model your application data. It includes built-in type casting, validation, query building, business logic hooks and more, out of the box.

5. [Express](https://expressjs.com/)

- Express is a web application framework for Node.js, released as free and open-source software under the MIT License. It is designed for building web applications and APIs and is the standard server framework for Node.js

6. [Handlebars](https://www.npmjs.com/package/handlebars)

- Handlebars.js is an extension to the Mustache templating language. Handlebars.js and Mustache are both logicless templating languages that keep the view and the code. It's one of the more popular Githib/NPM packages with over 5.3 million downloads within the last month!

7. [Okta](https://www.okta.com/)

- A user authentication service that allows developers to build identity controls into applications, website web services and  devices.
- Create a file called `.env` in the project root and add the following variables, replacing the values with your own from the previous steps.

```
    HOST_URL=http://localhost:3000
    ORG_URL=https://dev-123456.oktapreview.com
    CLIENT_ID=okta-application-client-id
    CLIENT_SECRET=okta-application-client-secret
    REGISTRATION_TOKEN=okta-registration-api-token
    USER_PROFILE_TOKEN=okta-user-profile-api-token
    APP_SECRET=something-random
```

8. [AWS-SDK S3](https://aws.amazon.com/sdk-for-node-js/)

- Amazon S3, or amazon simple storage service allows you to store and retrieve any amount of data at any time, anywhere from the web. 
- Buckets and objects are resources, and Amazon S3 provides APIs for you to manage them. You can create a bucket and upload objects using the Amazon S3 API


## How it Works

#### User Login

User creates an account on the signup page and inputs name, email, password, height, weight, and can upload an image. 

#### Choose Routine

User can pick a routine and add it to their current routines.  It will then show up on their profile and the user can edit or add workouts by day.

#### Update Stats and Post

User can update their weight lost and hours spent on a routine and then make a post about the workout.