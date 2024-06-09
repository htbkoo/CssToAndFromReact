# css-to-and-from-react #

[![NPM](https://img.shields.io/npm/v/css-to-and-from-react.svg)](https://www.npmjs.com/package/css-to-and-from-react)
[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/htbkoo/CssToAndFromReact/nodejs.yml?branch=master)](https://github.com/htbkoo/CssToAndFromReact/actions/workflows/nodejs.yml?query=workflow%3A%22Node+CI%22)
[![Known Vulnerabilities](https://snyk.io/test/github/htbkoo/CssToAndFromReact/badge.svg?targetFile=package.json)](https://snyk.io/test/github/htbkoo/CssToAndFromReact?targetFile=package.json)

## README ##

### TL;DR ###

CSS <-> React (in-line style) here: https://htbkoo.github.io/CssToAndFromReact/ 

### What is this repository for? ###

* This repo is a fork of [staxmanade/CssToReact](https://github.com/staxmanade/CssToReact)
* The idea is great but I believe transformation from React Style back to CSS would also be useful
* So this repo is an attempt to add bi-directional transformation between React Styles <-> CSS
* In short these changes are added on top of the original repo
    - [x] updated .gitignore (because IntelliJ IDEA is used so some of the config files should be ignored as well)
    - [x] (Just personal preference) migrated to yarn / npm
    - [x] (Just personal preference) migrated to TypeScript
    - [x] Added automated test coverage
    - [x] Added functionality to transform from React back to CSS
        - using the [postcss](https://github.com/postcss/postcss) + [postcss-js](https://github.com/postcss/postcss-js) libraries
    - [x] Update description in the page
    - [ ] Full (at least enough) automated test coverage
    - [ ] More refactoring (more related to personal style)
* An instance would be deployed to GitHub Page: https://htbkoo.github.io/CssToAndFromReact/

### How do I get set up? ###

* Summary of set up: ```yarn``` / ```npm install``` to download dependencies and the project is good to go.
* Configuration: N/A 
* Dependencies: Listed at **package.json**
* Database configuration: N/A
* How to run tests: ```yarn run test``` / ```npm run test```
    * run unit tests only: ```yarn run test:unit``` / ```npm run test:unit```
* Deployment instructions: 
    * Currently the application is only deployed to GitHub page, with the source sitting in the **docs/** folder under **master** branch
    * To update the GitHub page, do the following:
        1. update the source code under **src/** or **public/**
        2. ```yarn run ghpages:publish``` / ```npm run ghpages:publish```
        3. ```git add``` everything under **docs/**
        4. ```git commit```
        5. ```git push```
* How to start server: ```yarn run start``` / ```npm run start```

### Contribution guidelines ###

* Writing tests:
    * All tests are currently placed under **src/test/**
        * A small naming convention to 1) make it easier to run only unit tests and 2) allow tests navigation in IntelliJ: 
            * Unit tests name pattern: *src*.test.ts(x)
            * Other tests (e.g. integration, acceptance) name pattern: *src*.*test-type*.spec.ts(x)
    * Libraries / Frameworks used: [jest](https://facebook.github.io/jest/) (bundled in [react-scripts-ts](https://github.com/wmonk/create-react-app-typescript)) + [chai](http://www.chaijs.com/) + [enzyme](http://airbnb.io/enzyme/)
    * All the tests are currently written in [TypeScript](https://www.typescriptlang.org/) but adding JavaScript tests should also work fine  
* Code review: N/A
* Other guidelines: N/A

### Who do I talk to? ###

* Repo owner or admin: me ([htbkoo](https://bitbucket.org/htbkoo/))
* Other community or team contact: N/A

# Acknowledgement
* This repo is a fork of [staxmanade/CssToReact](https://github.com/staxmanade/CssToReact), so definitely kudos to [staxmanade](https://github.com/staxmanade)
* The reverse transformation from React -> CSS is handled by [postcss](https://github.com/postcss/postcss) + [postcss-js](https://github.com/postcss/postcss-js) 
