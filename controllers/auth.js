const passport = require('passport')
const validator = require('validator')
const User = require('../models/User')

exports.getLogin = (req, res) => {
  if (req.user) {
    return res.redirect('/profile')
  }
  res.render('login',{
    title: 'Login'
  })
}

exports.postLogin = (req, res, next) => {
  console.log(req.body)
  const validationErrors = []
  if (!validator.isEmail(req.body.email)) {
    validationErrors.push({ msg: 'Please check if the email is valid.'})
  }
  if (validator.isEmpty(req.body.password)) {
    validationErrors.push({ msg: 'Password field cannot be empty.' })
  }

  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.redirect("/login");
  }

  req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false})
  
  passport.authenticate('local', (err, user, info) => {
    if (err) { return next(err) }
    if (!user) {
      console.log('not user')
      req.flash('errors',info)
      return res.redirect('/login')
    }
    req.logIn(user, (err) => {
      console.log(err)
      console.log('We got user')
      if (err) { return next(err) }
      req.flash('success', { msg: 'You are logged in.'})
     //  res.redirect(req.session.returnTo || '/profile')
      res.redirect('/profile')
    }) 
  }) (req, res, next)
}

exports.logout = (req, res) => {
  req.logout()
  req.session.destroy(err => {
    if (err) {
      console.log('Error: Failed to destroy the session during logout', err)
    }
    req.user = null
    res.redirect('/')
  })
}

exports.getSignup = (req, res) => {
  if (req.user) {
    return res.redirect('/profile')
  }
  res.render('signup', {
    title: 'Create an Account'
  })
}

exports.postSignup = (req, res, next) => {
  const validationErrors = []
  if (!validator.isEmail(req.body.email)) {
    validationErrors.push({ msg: 'Please enter a valid email address.' })
  }
  if (!validator.isLength(req.body.password, { min: 8 })) {
    validationError.push({ msg: 'Password must be at least 8 characters long.' })
  }
  if (req.body.password !== req.body.confirmPassword) {
    validationErrors.push({ msg: 'Passwords do not match' })
  }

  if (validationErrors.length) {
    req.flash('errors', validationErrors)
    return res.redirect('/signup')
  }

  req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  })

  User.findOne({ email: req.body.email }, (err, existingUser) => {
    if (err) { return next(err) }
    if (existingUser) {
      req.flash('errors', { msg: 'Account with that email address already exists.' })
      return res.redirect("../signup");
    }

    user.save(err => {
      if (err) { return next(err) }
      req.logIn(user, (err) => {
        if (err) {
          return next(err)
        }
        res.redirect('/')
      })
    })
  })
}
