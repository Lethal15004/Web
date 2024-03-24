const express = require('express') //Yêu câu thư viện express sau khi cài ngay trên terminal
const app = express()
const port = 3000

app.get('/trang-chu', (req, res) => {
  let a=1,b=2;
  let c=a+b;
  return res.send('Hello World!')
})
// 127.0.0.1 - localhost
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})