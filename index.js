const express = require('express')
const app = express();
const path = require('path')
app.use(express.static('public'));

app.get('/cdn/*', (req, res)=>{
  res.redirect(`https://glcdn.githack.com/3kh0/3kh0-assets/-/raw/main/${req.params[0]}`);
});

app.get('/game/:root', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'game.html'));
});


app.listen(8000);