# Grocerify - A sample Full-Stack Isomorphic JS web app
## Built using ES6, Babel, Webpack, React, Express, MongoDB and Mongoose

This app is built while following along the Pluralsight.com course _Building a Full-Stack App with React and Express_
from https://app.pluralsight.com/library/courses/react-express-full-stack-app-build

Unfortunately the course is not complete and has many errors that have to be handled in order to get the code working.
On the last module, the video about making the app isomorphic is cut off.

I have fixed all the errors from the course, made some improvements where they were fit and also wrote the whole thing
using ES6 and WebPack instead of ES5 and Gulp + bower as in the course. Also I have used Handlebars instead of EJS for
sever view templating, but that's a personal preference.

### Prerequisites:

Make sure you have the following installed as global npm packages:

1. `npm install -g nodemon eslint webpack gulp gulp-cli`
2. You will also need to have mongo installed or use mongohq for a free test mongodb

### To install and run:

1. Git clone this repo
2. `npm install`
3. `gulp copy-skeleton`
4. `webpack`
5. `npm run dev`

### Running watch and lint tasks

1. `gulp watch` - Will run the linting task using eslint on both app and server .js files
2. `webpack --watch` - Will run the build task using babel to transform ES6 code

The missing part of code that has been cut out of the video is on ./index.js#36 and #37.
