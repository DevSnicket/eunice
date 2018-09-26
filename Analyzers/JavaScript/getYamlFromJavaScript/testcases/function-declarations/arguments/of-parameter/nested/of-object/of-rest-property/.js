function caller({ ...parameter }) { 
	function nested() { 
		called(parameter); 
	} 
}