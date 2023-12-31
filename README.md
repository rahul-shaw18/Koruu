# Koru Assignment

    This project is an assignment for Koru, built with Angular 16, Angular Material 16, and JSON Server 0.17.4. It features a responsive login page with validations and a table of records that displays data from a JSON file. The table supports sorting, dragging, and deletion of records.

## Requirements

    - Node.js
    - Angular CLI
    - JSON Server

## Installation

    1. Install Node.js and Angular CLI on your machine.

    2. Clone this repository to your local machine.

    3. Navigate to the project directory and install the required npm packages:

    npm install

    Install JSON Server:
    npm i --save json-server

    Start JSON Server:
    npx json-server --watch db.json

    In a new terminal window, start the project:
    ng s

    Open your web browser and navigate to http://localhost:4200.


## Login
    Use the following credentials to log in:

    Username: Koru
    Password: Koru@1234

    The login field has below validations
    The username must be at least 3 characters long and should not contain numbers or symbols. 
    The password must be at least 8 characters long and should contain at least one number, one symbol, one uppercase letter, and one lowercase letter.

## Features
    This project uses various features of Angular 16, including components, routing, services, and interfaces, as well as features of Angular Material, such as Snackbar, Dialog, and Drag and Drop.
