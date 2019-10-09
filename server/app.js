let { PORT } = require('./config');
const app = require('express')();
const Main = require('./app/main');
const main = new Main(app);

main.init(err => {
	if (err) console.log('error init');
});

app.listen(PORT, err => {
	if (err) console.log('error start');
	else console.log('start');
});
