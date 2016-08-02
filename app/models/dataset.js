import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';

export default Model.extend({
  title: attr('string'),

  // Relations
  aggregations: hasMany('aggregation'),

  // Computed
  sortedAggregations: Ember.computed.sort('aggregations', 'sortDefinition'),
  sortDefinition: ['duration:desc', 'start', 'end', 'gridsize', 'numcentroids', 'iterations', 'id']
});
