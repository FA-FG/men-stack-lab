const { model } = require('mongoose')
const Fruit = require('../module/animal')
const Animal = require('../module/animal')

// invoke the router functionality from hte express framework
const router = require('express').Router()

router.get('/animals/new', (req, res) => {
  res.render('animals/new.ejs')
})

router.post('/animals', async (req, res) => {
  if (!req.body.name || req.body.name === '') {
    res.redirect('/animals')
  }else {
    if (req.body.isDangerous === 'on') {
      req.body.isDangerous = true
    } else {
      req.body.isDangerous = false
    }
    await Animal.create(req.body)
    res.redirect('/animals')
}
})


router.get('/animals', async (req, res) => {
  const animals = await Animal.find()
  res.render('animals/index.ejs', { animals })
})

router.get('/animals/:animalId', async (req, res) => {
  const foundAnimal = await Animal.findById(req.params.animalId)
  res.render('animals/show.ejs', { animal: foundAnimal })
})

router.delete('/animals/:animalId', async (req, res) => {
  await Animal.findByIdAndDelete(req.params.animalId)
  res.redirect('/animals')
})

router.get('/animals/:animalId/edit', async (req, res) => {
  const foundAnimal = await Animal.findById(req.params.animalId)
  res.render('animals/edit.ejs', { animal: foundAnimal })
})

router.put('/animals/:animalId', async (req, res) => {
  if (req.body.isDangerous === 'on') {
    req.body.isDangerous = true
  } else {
    req.body.isDangerous = false
  }

  // Update the fruit in the database
  await Animal.findByIdAndUpdate(req.params.animalId, req.body)

  // Redirect to the fruit's show page to see the updates
  res.redirect(`/animals/${req.params.animalId}`)
})

router.get('/', (req, res) => {
  res.render('index.ejs')
})

// export to use it in other files
module.exports = router
