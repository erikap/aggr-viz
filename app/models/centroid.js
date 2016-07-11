import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  longitude: attr('number'),
  latitude: attr('number'),
  weight: attr(),
  dataset: belongsTo('dataset')
});
