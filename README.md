# FAST FOOD FAST

[![Build Status](https://travis-ci.org/edogbosunny/Fast-Food-Fast-Cycle-36.svg?branch=ft-integrate-continous-integration-160300216)](https://travis-ci.org/edogbosunny/Fast-Food-Fast-Cycle-36) [![Coverage Status](https://coveralls.io/repos/github/edogbosunny/Fast-Food-Fast-Cycle-36/badge.png?branch=develop)](https://coveralls.io/github/edogbosunny/Fast-Food-Fast-Cycle-36?branch=develop)  [![Maintainability](https://api.codeclimate.com/v1/badges/c2e737db3ea32ed0db56/maintainability)](https://codeclimate.com/github/edogbosunny/Fast-Food-Fast-Cycle-36/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/c2e737db3ea32ed0db56/test_coverage)](https://codeclimate.com/github/edogbosunny/Fast-Food-Fast-Cycle-36/test_coverage)

A platform for customers to order good food fast.

## Feature

- user can create a new order
- user can update a new order
- users can delete a new order
- users can get a retrieve a specific order by its ID
- users can retrieve a new order

## Project Management

Project is managed here [using](https://www.pivotaltracker.com/n/projects/2193604) the project management tool, Pivotal Tracker.

## Templates

UI templates are hosted on Github pages [here](https://edogbosunny.github.io/Fast-Food-Fast-Cycle-36/UI/)

## Deployment

- API endpoint is hosted [HERE](https://fast-food-fast-app.herokuapp.com/api/v1) on Heroku https://fast-food-fast-app.herokuapp.com/api/v1

## Technogies Used

- NodeJs - Run time environment.
- ExpressJs - Web framework.
- Babel - Javascript compiler.
- Eslint - Javascript linter. Airbnb style guide was followed.

## Testing tools
* Mocha - A Javascript test framework.
* Chai - Assertion library.
* Istanbul - Javascript code instrumenter.
* nyc - Istanbul's command line interface.

## How to Test using Postman for Order 
- To retrieve all order, enter this url endpoint https://fast-food-fast-app.herokuapp.com/api/v1/order and select GET method
- To retrieve single order, enter this url endpoint https://fast-food-fast-app.herokuapp.com/api/v1/order/:id and select GET method.
- To Update an order, enter this url endpoint https://fast-food-fast-app.herokuapp.com/api/v1/order/:id select the PUT method and pass in to the body {meal:"rice", price:3}
- To Delete an order, enter this url endpoint https://fast-food-fast-app.herokuapp.com/api/v1/order/:id and select the DELETE method
- To create an order, enterthis url endpoint https://fast-food-fast-app.herokuapp.com/api/v1/order and parse into the body
{meal:'rice',price:1} with a POST method


## How to Test For Food Item
- To retrieve all order, enter this url endpoint https://fast-food-fast-app.herokuapp.com/api/v1/food and select GET method
- To retrieve single order, enter this url endpoint https://fast-food-fast-app.herokuapp.com/api/v1/food/:id and select GET method.
- To Update an order, enter this url endpoint https://fast-food-fast-app.herokuapp.com/api/v1/food/:id select the PUT method and pass in to the body {meal:"rice", quantity:3}
- To Delete an order, enter this url endpoint https://fast-food-fast-app.herokuapp.com/api/v1/food/:id and select the DELETE method
- To create an order, enterthis url endpoint https://fast-food-fast-app.herokuapp.com/api/v1/food and parse into the body
{meal:'rice',quantity:1} with a POST method

## Api Endpoints
### Get All Order - GET method
- /api/v1/order
### Create Order - POST method
- /api/v1/order
### Get Order by ID - GET method
- /api/v1/order/:id
### Update a Specific Order - PUT method
- /api/v1/order/:id
### Delete a Specific Order - DELETE method
- /api/v1/order/:id

### Get All Food Item - GET method
- /api/v1/food
### Create Food Item - POST method
- /api/v1/food
### Get Food Item by ID - GET method
- /api/v1/food/:id
### Update a Specific Food Item - PUT method
- /api/v1/food/:id
### Delete a Specific Food - DELETE method
- /api/v1/order/:id
### Authors
* Edogbo Sunny

