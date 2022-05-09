const express = require('express')
const router = express.Router()
const { findPetByStatus, updatedPet, deletedPet, createCategoryP, petCreate, findPetById, createTagsP, findPetAll } = require('../controllers/pet.controller')


router.get('/todos', findPetAll) 

router.get('/findByStatus', findPetByStatus)

router.get('/:petId', findPetById)

router.post('/', petCreate)

router.post("/category", createCategoryP)
router.post("/tag", createTagsP)

router.post('/:petId', updatedPet)

router.delete('/:petId', deletedPet)

module.exports = router