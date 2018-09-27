# FAST FOOD FAST

[![Build Status](https://travis-ci.org/edogbosunny/Fast-Food-Fast-Cycle-36.svg?branch=ft-integrate-continous-integration-160300216)](https://travis-ci.org/edogbosunny/Fast-Food-Fast-Cycle-36) [![Coverage Status](https://coveralls.io/repos/github/edogbosunny/Fast-Food-Fast-Cycle-36/badge.png?branch=ft-integrate-continous-integration-160300216)](https://coveralls.io/github/edogbosunny/Fast-Food-Fast-Cycle-36?branch=ft-integrate-continous-integration-160300216) [![Maintainability](https://api.codeclimate.com/v1/badges/c2e737db3ea32ed0db56/maintainability)](https://codeclimate.com/github/edogbosunny/Fast-Food-Fast-Cycle-36/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/c2e737db3ea32ed0db56/test_coverage)](https://codeclimate.com/github/edogbosunny/Fast-Food-Fast-Cycle-36/test_coverage)

A platform for customers to order good food fast.

## Feature

- user can create a new order
- user can update a new order
- users can delete a new order
- users can get a retrieve a specific order by its ID
- users can retrieve a new order

## Project Management

Project is managed here [using](https://www.pivotaltracker.com/n/projects/2195975) the project management tool, Pivotal Tracker.

## Templates

UI templates are hosted on Github pages [here](https://edogbosunny.github.io/Fast-Food-Fast-Cycle-36/UI/)

## Deployment

- API endpoint is hosted [HERE](https://fast-food-fast-app.herokuapp.com/) on Heroku https://fast-food-fast-app.herokuapp.com/

## Technogies Used

- NodeJs - Run time environment.
- ExpressJs - Web framework.
- PostgreSQL - Object relational database.
- Babel - Javascript compiler.
- Eslint - Javascript linter. Airbnb style guide was followed.

## Testing tools
* Mocha - A Javascript test framework.
* Chai - Assertion library.
* Istanbul - Javascript code instrumenter.
* nyc - Istanbul's command line interface.

## How to Test using Postman
- To retrieve all order, enter this url endpoint https://fast-food-fast-app.herokuapp.com/api/v1/getorder and select GET method
- To retrieve single order, enter this url endpoint https://fast-food-fast-app.herokuapp.com/api/v1/getorder/:id and select GET method.
- To Update an order, enter this url endpoint https://fast-food-fast-app.herokuapp.com/api/v1/getorder/:id select the PUT method and pass in to the body {meal:"rice", quantity:3}
- To Delete an order, enter this url endpoint https://fast-food-fast-app.herokuapp.com/api/v1/delorder/:id and select the DELETE method
- To create an order, enterthis url endpoint https://fast-food-fast-app.herokuapp.com/api/v1/createorder and parse into the body
{meal:'rice',quantity:1} with a POST method

## Api Endpoints
### Get All Order - GET method
- /api/v1/getorder
### Create Order - POST method
- /api/v1/createorder
### Get Order by ID - GET method
- /api/v1/getorder/:id
### Update a Specific Order - PUT method
- /api/v1/getorder/:id
### Delete a Specific Order - DELETE method
- /api/v1/delorder/:id

### Authors
* Edogbo Sunny
