import Ember from 'ember';
import _ from 'lodash';
import moment from 'moment';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';

export default Model.extend({
  // Global
  type: attr('string'),
  location: attr('string'),
  created: attr('date'),

  // k-Means
  iterations: attr('number'),
  numCentroids: attr('number'),

  // Time
  start: attr('date'),
  end: attr('date'),

  // Grid
  gridSize: attr('number'),

  // Average
  components: attr('string'),
  amount: attr('number'),

  // Diff
  subtrahend: attr('string'),

  // Average & Diff
  aggregationKey: attr('string'),

  // Relations
  measurements: hasMany('measurement'),

  // Computed properties
  title: Ember.computed('type', 'location', function () {
    let baseUrl = "http://www.caspervg.net/test/class#";
    var title;

    switch (this.get('type')) {
      case baseUrl+"KMeansAggregation":
        title = `k-Means (n = ${this.get('iterations')}, k = ${this.get('numCentroids')})`;
        break;
      case baseUrl+"TimeAggregation":
        return `Time (${this.get('start_str')} - ${this.get('end_str')}; ${this.get('duration_str')})`;
      case baseUrl+"GridAggregation":
        title = `Grid (epsilon = ${this.get('gridSize')})`;
        break;
      case baseUrl+"DiffAggregation":
        return `DiffAggregation (from ${this.getAggName(this.get('subtrahend'))} by ${this.get('aggregationKey')})`;
      case baseUrl+"AverageAggregation":
        title = `AvgAggregation (${this.get('amount')} components by ${this.get('aggregationKey')})`;
        break;
      case baseUrl+"BasicAggregation":
        title = `BasicAggregation`;
        break;
    }
    return `${this.get('id')}: ${title}`;
  }),

  duration: Ember.computed('start', 'end', function () {
    return moment.duration(this.get('end')-this.get('start'));
  }),

  start_str: Ember.computed('start', function () {
    return moment(this.get('start')).format('LLL');
  }),

  end_str: Ember.computed('end', function () {
    return moment(this.get('end')).format('LLL');
  }),

  duration_str: Ember.computed('duration', function () {
    return this.get('duration').humanize();
  }),

  components_str : Ember.computed('components', function () {
    return this.getAggNamesString(this.get('components'));
  }),

  subtrahend_str : Ember.computed('subtrahend', function () {
    return this.getAggName(this.get('subtrahend'));
  }),

  getAggName: function (subtrahendString) {
    let fileName = subtrahendString.substr(subtrahendString.lastIndexOf("/")+1);
    return fileName.split(".")[0];
  },

  getAggNames: function (othersString) {
    let othersStr = othersString.split(",");
    return _.map(othersStr, this.getAggName);
  },

  getAggNamesString: function (othersString) {
    let fileNames = this.getAggNames(othersString);
    return `[${fileNames.join(", ")}]`;
  }
});
