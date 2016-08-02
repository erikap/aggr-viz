import Ember from 'ember';

export default Ember.Controller.extend({
  selected_dataset_id: null,
  aggregations: null,
  selected_dataset: null,
  selected_aggregation_id: null,
  selected_aggregation: null,
  markers: null,
  properties: ['iterations', 'numcentroids', 'start', 'end', 'gridsize'],

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
