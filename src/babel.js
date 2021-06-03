async function start(){
	return 'async is working';
}
start().then(console.log);

class Util {
	static id = Date.now();
}
console.log(Util.id);