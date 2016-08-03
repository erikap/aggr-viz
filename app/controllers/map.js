import Ember from 'ember';
import _ from 'lodash';

export default Ember.Controller.extend({
  selected_dataset_id: null,
  aggregations: null,
  selected_dataset: null,
  selected_aggregation_id: null,
  selected_aggregation: null,
  markers: null,
  properties: ['iterations', 'numCentroids', 'start', 'end', 'gridSize'],

  avg_lat: 0,
  avg_lon: 0,
  opacity: 0.5,
  radius: 0.025,
  maxRadius: Ember.computed('scaleRadius', function () {
    if (this.get('scaleRadius')) {
      return 1;
    } else {
      return 200;
    }
  }),
  blur: 0.9,
  scaleRadius: true,
  localExtrema: true,
  showMarkers: false,

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

        let latitudes = centroids.map(centroid => centroid.get('latitude'));
        let longitudes = centroids.map(centroid => centroid.get('longitude'));

        self.set('avg_lat', _(latitudes).sum() / latitudes.length);
        self.set('avg_lon', _(longitudes).sum() / longitudes.length);
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
