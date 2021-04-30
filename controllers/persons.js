const Person = require('../models/Person')

module.exports = {

  getAllPersons: async (req, res)=>{
    console.log(req.user)//to check if we have user
    try {
      //Find function without any argument will return all
      //the records from the 'Person' collection.
      const PersonAllItems = await Person.find()
      res.render('index.ejs', {persons: PersonAllItems, user: req.user})
    }catch(err){
      console.log(err)
    }
  },

  getPersons: async (req, res)=>{//filtering records
    console.log(req.user)
    try {
      const PersonItems = await Person.find({userId:req.user.id})
      res.render('profile.ejs', {persons: PersonItems, user: req.user})
    }catch(err){
      console.log(err)
    }
  },

  createPerson: async(req, res)=>{//creating new record in db
  console.log(req.file) // Testing multer
    try {
      await Person.create({
        name: req.body.name,
        picture: req.body.picture,
        description: req.body.description,
        status: req.body.status, 
        hairColor: req.body.hairColor,
        lastSeenDate: req.body.lastSeenDate, 
        lat: req.body.lat, 
        lon: req.body.lon,
        sex: req.body.sex, 
        height: req.body.height, 
        dateOfBirth: req.body.dateOfBirth,
        eyeColor: req.body.eyeColor,
        placeOfBirth: req.body.placeOfBirth,
        weight: req.body.weight, 
        race: req.body.race, 
        user: req.body.user
      })
    }catch(err){
      console.log(err)
    }
  },
  
  getPersonById: async (req, res) => {
    const { id } = req.params
    try {
      const person = await Person.findById(id)
      res.json(person)
    } catch(e) {
      console.error(e)
    }
  },

  deletePerson: async (req, res) => {
    try {
      await Person.remove({_id: req.params.id})
      console.log('Removed person')
      res.redirect('/profile')
    }
    catch(err) {
      res.redirect('/profile')
    }
  }
}
