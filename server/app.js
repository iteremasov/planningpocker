let { PORT } = require('./config');
const app = require('express')();
const Main = require('./app/main');
const main = new Main(app);

main.init(err => {
	if (err) throw `Ошибка инициализации микросервиса: ${err.toString()}`;
});

app.listen(PORT, err => {
  if (err) throw `Ошибка запуска микросервиса: ${err.toString()}`;
  else console.log('start')
});
