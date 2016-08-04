# Aggr-Viz

## Description

Ember (2.5+) application that allows the user to select datasets and aggregations and to visualise them on a map, using Leaflet.

Implemented by Casper Van Gheluwe (UGent) during the summer of 2016, as part of an internship at TenForce.

## Note
A library that this application depends on, [ember-leaflet-heatmap](https://github.com/willviles/ember-leaflet-heatmap), currently does not support any Ember versions higher than 2.5. There is an [open issue](https://github.com/willviles/ember-leaflet-heatmap/issues/1) about this.

## Usage
* Start the (development) server with the following command: `ember serve --proxy http://localhost:8881`
* Visit the Aggr-Viz application at [http://localhost:4200/map](http://localhost:4200/map).

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

* `git clone <repository-url>` this repository
* change into the new directory
* `npm install`
* `bower install`

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

* Execute the command `docker-compose up` in the `Aggr` project

## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](http://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)

