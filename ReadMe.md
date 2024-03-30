# Class Technologies Document

This document provides an overview of the application's features, technology stack, usage instructions, testing procedures and potential improvements.

## Table of Contents

- [Introduction](#introduction)
- [Technology Stack](#technology-stack)
- [Clarity of Design Choices](#clarity-of-design-choices)
- [Features](#features)
- [Running](#running-application)
- [Possible Improvements](#possible-improvements)

## Introduction

Interactive Recipe Manager application using React for the frontend and Node.JS for
the backend. This exercise will test your skills in building a full stack web application which
closely resembles the work at Class.

## Technology Stack

**Frontend:**

- MUI
- React
- create-react-app
- Redux
- Cypress

**Backend:**

- Node.js with TypeScript
- Express
- Jest
- Supertest

**Database:**

- Postgres

**Devops**

- Docker

## Clarity of Design Choices

1. ### Backend Server

   - Used Typescript for type safety and better code organization.
   - Used Express for creating API endpoints.
   - Used Postgres as a database to store recipe information.

2. ### Frontend

   - Used React for building the user interface because of scalability
   - Used MUI for styling the web page because of simplicity

3. ### Dockerization

   - Provided Dockerfiles for both backend and frontend, ensuring ease of deployment.

4. ### Testing

   - Used Jest and Cypress for testing
   - Implemented integration testing for add user, get list of users, get one user, add transaction, get specific transactions

## Features

### Recipes

View a brief list of recipes.

### Adding a new recipe

View a single recipe, including all ingredients.

### Update a recipe

Update an existing recipe.

### Delete a recipe

Delete an existing recipe.

### Search & filter functionality

- Provided a search function to look up recipes by their title.
- Provided a filter function to view recipes by ingredients.

## Running Application
To run the application using Docker CLI.

1. Clone the repository and naviaget to the project directory.
2. Set environment files.
  - copy `backend/.env.example` to same directory and rename to `.env`.
  - copy `frontend/.env.example` to same directory and rename to `.env`.
3. Make sure Docker is installed on your system.
4. Open a termical and run the following command:

      ```bash
        docker compose up -d
      ```
  * If you are using Linux, you can use following command.
      ```bash
        sudo docker compose up -d
      ```

4. Access the application by navigating to `http://localhost:3000` in your web browser.

## Possible Improvements

- Implement user authentication and authorization
- Implement real-time updates using web sockets or push api
