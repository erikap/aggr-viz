import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    // 'eb1e0864-4dbb-464a-b783-751ef73349f8'
    return this.get('store').findRecord('dataset', params.dataset_id)
      .then(dataset => {
        return dataset.get('centroids').then(centroids => {
          return {
            data: centroids.map(
              centroid => {
                return {
                  x: centroid.get('latitude'),
                  y: centroid.get('longitude'),
                  value: centroid.get('weight')
                };
              }
            )
          };
        });
      });
  }
});
