var inputs = [
    [{'level':'Senior','lang':'Java','tweets':'no','phd':'no'},   false],
    [{'level':'Senior','lang':'Java','tweets':'no','phd':'yes'},  false],
    [{'level':'Mid','lang':'Python','tweets':'no','phd':'no'},     true],
    [{'level':'Junior','lang':'Python','tweets':'no','phd':'no'},  true],
    [{'level':'Junior','lang':'R','tweets':'yes','phd':'no'},      true],
    [{'level':'Junior','lang':'R','tweets':'yes','phd':'yes'},    false]
]

/* Note: re-implement this to use correct entropy formula */
var entropy = function(classProbabilities) {
	return classProbabilities.map((x) => -x * Math.pow(x, 2)).reduce((memo, val) => memo + val);
}

var classProbabilities = function(labels) {
	var totalCount = labels.length;
	var countObj = {};
    
	labels.forEach((key) => {
		countObj[key] = countObj[key] || 0; //anytime we want to either create a non-existing item or add to that item depending on if it is there or not
        countObj[key]++; //use this pattern
	})

	return Object.keys(countObj).map((key) => countObj[key]).map((count) => count / totalCount )
}

var dataEntropy = function(labeledData) {
	var labels = labeledData.map(([_, label]) => label)
	var probabilities = classProbabilities(labels); //[0.4, 0.6]
	return entropy(probabilities);
}

var getAllPartitionsEntropy = function(subsets) {
	var totalCount = subsets.map(function(subset){
		return subset.length
	}).reduce(function(memo, val) {
		memo = memo + val;
		return memo;
	},0);

	return subsets.map((subset) => {
		return (dataEntropy(subset) * subset.length) / totalCount
	}).reduce(function(memo, val) {
		memo = memo + val;
		return memo;
	},0);
}

var groupBy = function(inputs, cb) {
	var groups = {};

	inputs.forEach((item) => {
		var key = cb(item);
		groups[key] = groups[key] || []; //same pattern I used within zip
		groups[key].push(item);
	})

	return groups
}

var partitionBy = function(inputs, attribute) {
	return groupBy(inputs, (x) => x[0][attribute]);
}

var partitionEntropyBy = function(inputs, attribute) {
	var partitions = partitionBy(inputs, attribute); //returns obj with keys = ["yes", "no"] and key's values are array of all [{item}, target] that have matching value for that key
    var keys = Object.keys(partitions);
    var newPartitions = keys.map((key) => partitions[key]);
    return getAllPartitionsEntropy(newPartitions);
}

function curry(fn) {  
  return function curried() {                           
    var args = [].slice.call(arguments);
    return args.length >= fn.length ?
      fn.apply(null, args) :
      function () {
        var rest = [].slice.call(arguments);
        return curried.apply(null, args.concat(rest));
      };
  };
}

var curriedPartitionEntropyByWithInputs = curry(partitionEntropyBy)(inputs);
console.log(curriedPartitionEntropyByWithInputs('phd'))