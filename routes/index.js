const router = require('express').Router();


router.get('/', (req, res) => {
  res.redirect('/login')
})

router.get('/login', (req, res) => {
  res.render('login', { title: 'Login' })
})

router.get('/register', (req, res) => {
  res.render('register', { title: 'Registre-se' })
})

router.post('/register', (req, res) => {
  const name = `${req.body.primeironome} ${req.body.sobrenome}`
  const { emailregister, registerpwd, celnumber, genreOption } = req.body

  //TO DO: ADD DATA DE NASCIMENTO COM MES + 1 NO BANCO E CRIPTOGRAFIA DE SENHA;
  const db = require('../config/mysqlConn')

  db.query('INSERT INTO Users (`user_id`, `name`, `email`, `password`, `celnumber`, `genre`) VALUES (null, ?, ?, ?, ?, ?)', [name, emailregister, registerpwd, celnumber, genreOption], (err, rows, fields) => {
    if (err)
      res.send(err)
    else
      res.send('Register OK!')
  })
})

module.exports = router