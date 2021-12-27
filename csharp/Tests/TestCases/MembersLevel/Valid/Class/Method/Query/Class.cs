using System;
using System.Collections.Generic;
using System.Linq;

class Class {
	void Method() {
		IEnumerable<Object> query =
			from item in new ElementType[] {}
			where item == null
			orderby item
			select item;
	}
}