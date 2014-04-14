var numerify = require("../");
var test = require("tape");

test('doesn\'t destroy empty feature collection', function (t) {
  var geojson = {
    "type": "FeatureCollection",
    "features": []
  };
  var result = numerify(geojson);
  t.equal(geojson.type, "FeatureCollection");
  t.equal(geojson.features.length, 0);
  t.end();
});

test('doesn\'t alter non-properties', function (t) {
  var geojson = {
    "type": "FeatureCollection",
    "features": [{
      "type": "Feature",
      "id": "123",
      "geometry": {
        "type": "Point",
        "coordinates": [0,0]
      },
      "properties": {},
      "meta": {
        "foobar": "1.0"
      }
    }]
  };
  var before = JSON.stringify(geojson);
  var result = numerify(geojson);
  var after = JSON.stringify(result);
  t.equal(before, after, "non-property elements should be untouched");
  t.end();
});

test('does convert numeric properties', function (t) {
  var geojson = {
    "type": "FeatureCollection",
    "features": [{
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [0,0]
      },
      "properties": {
        "foo": "bar",
        "int": "123",
        "float": "-1.23"
      }
    }]
  };
  var result = numerify(geojson);
  t.equal(geojson.features[0].properties.foo, "bar");
  t.equal(geojson.features[0].properties.int, 123);
  t.equal(geojson.features[0].properties.float, -1.23);
  t.end();
});
