# ExpresJS/MongoDB API

## Description

This project was built using Node.js, Express.js and MySQL. This is the backend of a job posting website.

## Technologies and liberies

* Node.js
* Express.js
* Sequelize and Sequelize-cli
* Joi
* Multer
* MySQL

## Features

* User registration and login
* Authentication via JWT
* CRUD for users, companies and statments
* Validation via Joi libary
* MySQL database

### Installing

```
git clone https://github.com/NarekQolozyan/Master_Project/tree/main/backend
cd Master_Project
npm install
```

## Getting Started

To test the application

* Download MySQL in your pc.
* Create your free shared database and choose a username and password for it
* Add your username and password to the .env file (you need to create your .env file in the root of the project)
* Choose a random string as JWT secret or generate it in your terminal
```
node
console.log(crypto.randomBytes(64).toString('hex'));
```
* Copy it and place in in your .env file
* Example
TOKEN_SECRET="yourrandomlygeneratedsecret"
* Start the application
```
nodemon server.js
```
* Register as user via http://localhost:3005/register with firstName, lastName, and password in the body as JSON format via Postman or any alternatives
* If successful, you should see a massage
* Login as user via http://localhost:3005/login with the same firstName,lastName and password
* If everything was successul, you should see a message

* Register as comany via http://localhost:3005/register_company with name,email,image and password in the form-data via Postman or any alternatives
* If successful, you should see a massage
* Login as company via http://localhost:3005/login_company with the same name,email and password in the body as JSON format vis Postman or any alternatives
* If everything was successul, you should see a message

* Create a statemant via  http://localhost:3005/create_statemant with category,description,skills,salary,photo,jobType,experience,location,companyId and profession in the body as JSON format via Postman or any alternatives
* For looking all statemants use http://localhost:3005/all_statemant url via Postman or any alternatives
* If you wanted to update any statemant use http://localhost:3005/update_statemant url and that's statemant id which is want to update via Postman or any alternatives
* For deleting any statemant use http://localhost:3005/delete_statemant url and that's statemant id via Postman or any alternatives