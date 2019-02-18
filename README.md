# SMS-API
SMS-API is a collection of APIs for the SMS Management System.

## Hosted Application
https://larrystone-sma.herokuapp.com

## API Documentation
- [v1](https://documenter.getpostman.com/view/616731/S11BzNKe)


## Installation 
1. Install [`node`](https://nodejs.org/en/download/), version 5 or greater

2. Install [`postgres`](https://www.postgresql.org/download/) or `brew install postgres` for mac users

3. Clone the repo and cd into it

    ```
    git clone https://github.com/larrystone/SMA.git"
    cd sms-api
    ```

4. Install all dependencies

    ```
    npm install
    ```

5. Configure Postgres

    ```
    configure your environment variables in
    `./api/v1/config/index.js` using .env.example file template
    ```

6.  Run database migrations

    ```
    $ sequelize db:migrate
    ```

7. Start the app

    ```
    npm start
    ```

8. Test the application with POSTMAN or with curl

    ```
    http://localhost:3002/
    ```    

## Testing

The app uses `Mocha`, `Chai` and `Chai-Http` for testing, 
Run `npm run test` to run tests


## Built With
* [NodeJS](https://nodejs.org/en/) - A Javascript runtime built on chrome V8 engine that uses an event-driven non-blocking I/O model that makes it lightweight and efficient.
* [ExpressJs](https://expressjs.com/) - A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
* [Sequelize](http://docs.sequelizejs.com/) - An ORM for Node.js that supports the dialects of PostgreSQL and features solid transaction support an relations.
* [Postgres](https://www.postgresql.org/) - A powerful, open source object-relational database system.

## Author

* **Louisdante** - Opensourcer.