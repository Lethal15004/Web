const path= require('path');
const express = require('express');
const morgan = require('morgan'); //Yêu câu thư viện express sau khi cài ngay trên terminal
const { engine } = require("express-handlebars"); //->Template handlebars
const app = express();
const port = 3000;

//HTTP logger
app.use(morgan('combined'))

//Template Engine
app.engine("hbs", engine({
  extname:'.hbs', //->Đặt tên file handlebars ngắn hơn
}));//->Chú ý
app.set('view engine', 'hbs');//->Chú ý
app.set('views',path.join(__dirname, 'resource\\views'));//->Chú ý


app.get('/trang-chu', (req, res) => {
  res.render('home');
})
app.get('/news', (req, res) => {
  res.render('news');
})

// 127.0.0.1 - localhost
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})