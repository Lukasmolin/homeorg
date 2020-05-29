# homeorg
Simple system for splitting and organizing bills between 2 or more persons

# Quick Start

in root folder execute docker compose to start PostgreSQL and PGAdmin:

`docker-compose up`

Walk to node-api folder and start it
```
cd node-api/
npm start
```

Walk to react-app folder and start it
```
cd react-app/
npm start
```
# Project Structure
Since this projects share code files between them, create-react-app doesn't let you import code from outside src and Docker has problems dealing with symlinks in Windows the shared files are located inside the react src/shared folder and are imported from node in src/model.js

### Shared Files Location

[./react-app/src/shared](https://github.com/Lukasmolin/homeorg/tree/master/react-app/src/shared) - Source files

[./node-api/src/model.js](https://github.com/Lukasmolin/homeorg/blob/master/node-api/src/model.js) - imports from shared folder

### Project
./
    Docker
    /node-api/
        (All Api files, Modules and depedencies)
    /react-app/
        (All App Files, Modules and depedencies)

# Guidelines
This project (tries very hard to) follow [JSON API](https://jsonapi.org/) conventions.

# To-Do
- [ ] Add react-app and node-api services to Docker Compose
- [ ] Generate JSDocs documentation
- [ ] Add JWT


