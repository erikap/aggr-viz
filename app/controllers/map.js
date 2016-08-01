import Ember from 'ember';
import Point from 'ember-leaflet/helpers/point';
import $ from 'jquery';

export default Ember.Controller.extend({
  selected_dataset_id: null,
  aggregations: null,
  selected_dataset: null,
  selected_aggregation_id: null,
  selected_aggregation: null,
  markers: null,

  opacity: 0.85,
  no_dataset: function () {
    return this.get('selected_dataset') === null;
  }.property('selected_dataset'),

  datasetIdObserver: Ember.observer('selected_dataset_id', function () {
    let dataset =
      this
        .get('store')
        .peekRecord('dataset', this.get('selected_dataset_id'));
    this.set('selected_dataset', dataset);
    Ember.run.later(function() {
      $('select').material_select();
    });
  }),

  aggregationIdObserver: Ember.observer('selected_aggregation_id', function () {
    let aggr =
      this
        .get('store')
        .peekRecord('aggregation', this.get('selected_aggregation_id'));
    this.set('selected_aggregation', aggr);

    var self = this;
    aggr.get('measurements')
      .then(centroids => {
        let data = centroids.map(
          centroid => {
            return {
             'location': {
               'lat': centroid.get('latitude'),
               'lng': centroid.get('longitude')
             },
              'title': centroid.get('weight')
             };
          });

        self.set('markers', data);
      });
  }),

  actions: {
    clear: function () {
      this.set('selected_dataset', null);
      this.set('selected_aggregation', null);
      this.set('selected_measurements', null);
    }
  }
});
