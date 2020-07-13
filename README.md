# Product Requirements

Your task is to build a front end for a URL shortening web service. The deliverable is the source code, written in React, using whichever libraries, frameworks, tools, and development methodologies you choose.

The front end should be a single page app that allows the user to:

- Input any URL to get a shortened version of it
- See a list of previously shortened URLs
- Expire/delete any previous URLs

The user should optionally be able to provide a custom slug to be used as the path in the shortened URL.

## Project Requirements

* The project should include an automated test suite.
* The project should include a README file with instructions for running the web service and its tests. You should also use the README to provide context on choices made during development.
* The project should be packaged as a zip file or submitted via a hosted git platform (Github, Gitlab, etc).

## About this Project

The only directive for this project was to use React, everything else was up to me. I chose to also use CSS Modules + Sass. I'd never used CSS Modules before but I've been itching to and I know it goes with React like hot honey goes with pizza. I also chose to use Jest + Enzyme for testing.

## Todo:

* Store API key on server
* Custom form validation 
* Better, more desciptive error handling
* Better testing. Maybe create a mock file to mock API requests.
* Prop Types (or Typescript?)
* Handle no results in list vs. handling too many (pagination)
* Objects returned from GET /links should have unique id

## Running the local server

### System Requirments

* node v8.10.0+
* npm v5.0.0+

### To install and run

```sh
$ git clone <url>
$ cd to repo
$ npm install
$ yarn watch
# or 
$ npm run watch
$ open another terminal tab
$ yarn runserver
# or
$ npm run runserver

Server will be available at http://localhost:3000/ and the ./app directory will be mounted to '/'.
```

