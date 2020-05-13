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

router.post('/register', async (req, res) => {

  var primeironome = req.body.primeironome
  var sobrenome = req.body.sobrenome
  var name = `${primeironome} ${sobrenome}`
  var { emailregister, registerpwd, confirmpwd, celnumber, genreOption, datanascimento } = req.body

  var errors = []

  //VALIDAÇÃO
  if (registerpwd !== confirmpwd) {
    errors.push({ pwdmatch: 'A senha não confere' })
  }

  var birthDate = new Date(datanascimento)
  if (birthDate.getFullYear().length > 4 || birthDate.getFullYear() < 1920 || birthDate.getFullYear() > 2020) {
    errors.push({ datemsg: 'Data inválida' })
  }


  const db = require('../config/mysqlConn')


  try {
    var userResult = await db.promise().query('SELECT * FROM Users WHERE email = ?', [emailregister])
    if (userResult[0].length) {
      errors.push({ err_email_msg: 'Email já cadastrado' })
    }


    var pwdResult = await db.promise().query('SELECT * FROM Users WHERE celnumber = ?', [celnumber])
    if (pwdResult[0].length) {
      errors.push({ err_phone_msg: 'Número já cadastrado' })
    }

    //     console.log(errors)

    if (errors.length == 0) {
      var insertQuery = await db.promise().query('INSERT INTO Users (`user_id`, `name`, `email`, `password`, `celnumber`, `genre`, `birthdate`) VALUES (null, ?, ?, ?, ?, ?, ?)',
        [name, emailregister, registerpwd, celnumber, genreOption, datanascimento])
      if (insertQuery)
        res.send('Register OK!')

    } else {
      res.render('register', {
        errors,
        primeironome,
        sobrenome,
        emailregister,
        celnumber,
        genreOption,
        datanascimento,
        title: 'Registre-se'
      })
    }

  } catch (error) {
    res.send(error)
    console.error(error)
  }

})

module.exports = router