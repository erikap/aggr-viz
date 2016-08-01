import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  longitude: attr(),
  latitude: attr(),
  weight: attr(),
  dataset: belongsTo('aggregation')
});
