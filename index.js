function numeric( geojson ) {
  
  function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  var features;
  if (geojson.type === "FeatureCollection")
    features = geojson.features;
  else if (geojson.type === "Feature")
    features = [geojson];
  else
    features = [{type:"Feature", properties: {}, geometry: geojson}];

  features.forEach(function mapFeature(f) {
    for (var key in f.properties) {
      if (isNumeric(f.properties[key]))
        f.properties[key] = parseFloat(f.properties[key]);
    }
  });

  return geojson;
};

module.exports = numeric;
