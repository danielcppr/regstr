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
  /* 
  ISSUE: COMO POSSO MODULAR A PARTE DE VALIDAÇÃO? 
  */

  const primeironome = req.body.primeironome
  const sobrenome = req.body.sobrenome
  const name = primeironome + sobrenome
  const { emailregister, registerpwd, confirmpwd, celnumber, genreOption, datanascimento } = req.body

  let errors = []

  // VALIDADO NO FORM 
  // if (celnumber.match(/\(\d{2}\)\d{5}-\d{4}/g) === null) {
  //   errors.push({ msg: 'formato inválido' })
  // }

  if (registerpwd !== confirmpwd) {
    errors.push({ pwdmatch: 'A senha não confere' })
  }

  let birthDate = new Date(datanascimento)
  if (birthDate.getFullYear().length > 4 || birthDate.getFullYear() < 1920 || birthDate.getFullYear() > 2020) {
    errors.push({ datemsg: 'Data inválida' })
  }

  const db = require('../config/mysqlConn')

  /*
  ISSUE: errors.push not working inside query callback
  Arrumar essa gambiarra abaixo -> ASYNC? TRATAR ERRO DO SQL ?
  */

  var emailalreadyregistered = db.query('SELECT * FROM Users WHERE email = ?', [emailregister], (err, result) => {
    if (result.length > 0) {
      return true
    }
  })
  emailalreadyregistered ? errors.push({ err_email_msg: 'Email já cadastrado' }) : ''

  var phonealreadyregistered = db.query('SELECT * FROM Users WHERE celnumber = ?', [celnumber], (err, result) => {
    if (result.length > 0) {
      return true
    }
  })
  phonealreadyregistered ? errors.push({ err_phone_msg: 'Número já cadastrado' }) : ''


  if (errors.length == 0) {
    db.query('INSERT INTO Users (`user_id`, `name`, `email`, `password`, `celnumber`, `genre`, `birthdate`) VALUES (null, ?, ?, ?, ?, ?, ?)',
      [name, emailregister, registerpwd, celnumber, genreOption, datanascimento], (err, rows, fields) => {
        if (err)
          res.send(err)
        else
          res.send('Register OK!')
      })
  } else {
    res.render('register', {
      errors,
      primeironome,
      sobrenome,
      emailregister,
      registerpwd,
      confirmpwd,
      celnumber,
      genreOption,
      datanascimento,
      title: 'Registre-se'
    })
  }
})

module.exports = router