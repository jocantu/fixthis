const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth')
const profileController = require('../controllers/profile')
const homeController = require('../controllers/home')
const { ensureAuth, ensureGuest } = require('../middleware/auth')



router.get('/', homeController.getIndex)

router.get('/login', authController.getLogin)

router.post('/login', authController.postLogin)


router.get('/profile', profileController.getIndex)
// router.post('/profile', authController.postLogin)

router.get('/logout', authController.logout)

router.get('/signup', authController.getSignup)
router.post('/signup', authController.postSignup)


module.exports = router