# Web Technologies - Coursework 1 & 2

## Up and Running

Steps for getting started with development and building for release

Checkout the repository from github:
    
    git clone https://github.com/zl14917/letsplaychess
    cd letsplaychess


Install javascript packages

    npm install

Start the development server

    npm run start-client

Or, alternatively build a release bundle

    npm run build-client

All front end assets (JavaScript, images, fonts, CSS) will be packaged up and saved in `build` folder which can be deployed onto a server.

## Coursework 1

Goals:

* Dynamic pages can be both server- or client- side rendered
* Database need to be an embedded SQL database like SQLite.
* JavaScript client-side library or framework for animation, interaction. 
* Use of static graphics and SVG.
* CSS, high level of confidence.
* HTML: valid, well-structured, 


## Software Prerequisite 

* Code editor, recommend: Visual Studio Code, Bracket.
* Node.js (https://nodejs.org/en/)
* NPM (comes with Node.JS)
* Browser

## Frameworks
* React.JS
* CSS/SCSS/LESS
* Express.js (server-side)

## Chess Game Features

Client side:
* Playing in realtime against humans.
* Instant messaging with opponent when in game
* Game should be timed: 5min, 10min, 15min.
* CSS-Animations for good visual effects.

Server side:
* Match making
* Account system
* review past games, games replay.
* saving data to a local Sqlite database. 

Roles:
* Web page design: mockup, wireframe, colour scheme, user-experience
* front-end: implementing the look and feel, 
* back-end: handle realtime connections, manage database.


## Server Architecture

The server needs to be responsive to players, for this purpose, we are using javascript library https://socket.io/ to provide realtime communication between players. A latency is important in good chess gaming experience.

For API, we use ExpressJS because it simplifies work needed in implementing concerns such authentication, parsing, static files, etc.

* Socket.IO
* ExpressJS

### Resources

* https://socket.io/
* https://expressjs.com/
