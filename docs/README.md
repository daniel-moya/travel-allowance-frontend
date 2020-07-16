# Travel Allowance Sample App - back-end

Front-end: [travel-allowance-frontend](https://github.com/daniel-moya/travel-allowance-frontend)<br>
Back-end: [travel-allowance-backend](https://github.com/daniel-moya/travel-allowance-backend)

# Getting Started

Development section will help you setting up and running on your local machine for development and testing purposes.<br>
Deployment section covers how to deploy the project on a live system.

# Development

## Prerequisites

In order to start the backend locally you need `node.js` and `npm` installed and also `Mysql` at `localhost:27017` for development mode. 


## Installing

Install the dependencies:

```
npm i
```

Run in the development mode:

```
npm run start-dev
```

Run in the production mode:

```
npm run start
```

This backend serves the HTML page and API endpoints for travel allowance frontend frontend, 
described below:


## Backend

- Get version

  `GET /version`

  Response:
  ```
  {
    version: string
  }
  ```

- Get Employees with Allowance Data
  `GET /api/allowance`

  
  Response:
  ```
  [{
    id: int
    employee: string
    transport: string
    distance: int
    workdays: int
  },
  {
    id: int
    employee: string
    transport: string
    distance: int
    workdays: int
  }...]

- Get one Employee by id
  
  Response:
  ```
  {
    [
      {
      id: id
      employee: string
      transport: string
      distance: int
      workdays: int
      }
    ]
  }


# Deployment
* No deployment

# Built With
* [NodeJS](https://nodejs.org/en/) - The Platform.
* [ReactJS](https://reactjs.org/) - A JavaScript library for building user interfaces
* [MobX](https://mobx.js.org/README.html) - MobX is a battle tested library that makes state management simple and scalable by transparently applying functional reactive programming 
* [MaterialUI](https://material-ui.com/) - React components for faster and easier web development. Build your own design system, or start with Material Design.
* [MomentJS](https://momentjs.com/) - The library is a wrapper for the Date object (in the same way that jQuery is a wrapper for JavaScript) making the object a whole lot easier to work with.