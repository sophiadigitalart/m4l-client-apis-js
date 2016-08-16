
String.prototype.splitOnce = function(separator) {
	var i = this.indexOf(separator)
	if(i == -1) return []
	return [this.slice(0, i), this.slice(i + 1)]
}

String.prototype.splitKeepTrail = function(separator, limit) {
	var ret = []
	var cursor = 0
	for(var x=0;x<limit;++x) {
		var index = this.indexOf(separator, cursor)
		if(index == -1) break
		ret.push(this.slice(cursor, index))
		cursor = index + 1
	}
	return ret
}
