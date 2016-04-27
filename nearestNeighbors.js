var cities = [[-86.75,33.5666666666667,'Python'],[-88.25,30.6833333333333,'Python'],[-112.016666666667,33.4333333333333,'Java']];

cities = cities.map(([x,y,z]) => [[x,y], z]);

for (var [x, y] of cities) {
  var otherCities = cities.filter(city => {
    return city != [x, y]
  });
  
  var predictedLanguage = knnClassify(1, otherCities, x)
}

function distance(v, w) {
  return Math.sqrt(squaredDistance(v, w))
}

function squaredDistance(v, w) {
  return sumOfSquares(vectorSubtract(v, w))
}

function vectorSubtract(v, w) {
  return zip(v,w).map(([v_i, w_i]) => v_i - w_i)
}

function zip(){
	var args = Array.prototype.slice.call(arguments, 0);
	var result = [];
	var max = Math.max.apply(null, pluck(args, 'length'));

	args.forEach(function(array){
		for (var i = 0; i < max; i++){
			result[i] = result[i] || [];
			result[i].push(array[i])
		}
	})

	return result;
};

function pluck(collection, key){
	return collection.map(function(item){
		return item[key];
	})
};