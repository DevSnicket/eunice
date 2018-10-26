const argument = function() {}

const caller1 = function() {
	called(argument);
}

const caller2 = function() {
	called(argument);
}