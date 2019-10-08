let { PORT } = require('./config');
const app = require('express')();
const Main = require('./app/main');
const main = new Main(app);

main.init(err => {
	if (err) throw `error init service: ${err.toString()}`;
});

app.listen(PORT, err => {
	if (err) throw `error start service: ${err.toString()}`;
	else console.log('start');
});
