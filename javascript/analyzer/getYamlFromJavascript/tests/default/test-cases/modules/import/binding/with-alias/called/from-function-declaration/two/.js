import { 
	imported1 as alias1,
	imported2 as alias2,
} from "module";

function caller() {
	alias1();
	alias2();
}