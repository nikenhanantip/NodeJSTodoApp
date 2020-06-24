# NodeJSTodoApp
Todo App Project is a simple NodeJS API backend that implement HTTP method and RESTful API to retrieve and put several data from MongoDB using mongoose.

## Demo
Live demo app can be access with this link: https://nodejs-todo-app001.herokuapp.com/

## Description
There's some features of the project:
* Todo has validation
* User can create, list, detail, update, and delete todo

### Request Body
Example of a valid JSON data as request body
```
{
    "title": "NodeJS API",
    "description": "Create a simple NodeJS API for Todo App",
    "deadline": "2020-06-24",
    "done": true
}
```

### Built With
* [Visual Studio Code](https://code.visualstudio.com/) - Tools for development
* [NodeJS](https://nodejs.org/en/) - Basic language of development
* [NPM](https://www.npmjs.com/) - Library for managing dependencies
* [ExpressJS](https://expressjs.com/) - the NodeJS framework used
* [Mongoose](https://mongoosejs.com/) - MongoDB object modeling for NodeJS

## Running the project
Clone this repository with command line
```
$ git clone https://github.com/nikenhanantip/NodeJSTodoApp.git
```

Open the terminal, go to the directory NodeJSTodoApp
```
$ cd NodeJSTodoApp
```

Run the application in the `index.js` file with custom script, server will run in port `3000`
```
$ npm start
Server is up and running on port 3000...
```

## Test with Mocha and Chai
Open the terminal, go to the directory NodeJSTodoApp
```
$ cd NodeJSTodoApp
```

Run the test command
```
$ npm run test
```

## Unit test coverage
Open the terminal, go to the directory NodeJSTodoApp
```
$ cd NodeJSTodoApp
```

Run the test coverage command
```
$ npm run coverage
```