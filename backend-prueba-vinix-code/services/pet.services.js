const modelPets = require('../models').Pets
const modelCategory = require('../models').Category
const modelTags = require('../models').Tags

const petOptions = {
    async createCategory(category){
        
        try {
            console.log("entra", category)    
            const categoryNew = await modelCategory.create({name: category})
            
            console.log("entra", categoryNew)
            return categoryNew
        } catch (error) {
            return error
        }
        
    },
    async createTags(tags){
        
        try {
            const tagsNew = await modelTags.create({name: tags})
            console.log("entra", tagsNew)
            return tagsNew
        } catch (error) {
            return error
        }
        
    },
    async createPet(pet){
        
        try {
            console.log(pet)
            const { name, category, status } = pet
            const petNew = await modelPets.create(pet)
            
            console.log("entra")
            return petNew
        } catch (error) {
            return error
        }
        
    },
    async findPetAll(){
        try {
            console.log("entraall")
            const pets = await modelPets.findAll(
                {
                    include: [
                        { model: modelCategory},
                        { model: modelTags}
                    ]
                })
            return pets
        } catch (error) {
            return error
        }
    },
    async findByStatus(status){
        console.log("entra")
        try {
            const pets = await modelPets.findAll(
                {where: {status: status}}, {
                    include: [
                        { model: modelCategory},
                        { model: modelTags}
                    ]
                })
            return pets
        } catch (error) {
            return error
        }
    },
    async findById(petId){
        try {
            // const petFind = await modelPets.findByPk(id)
            const pet = await modelPets.findAll(
                {where: {id: petId}}, {
                include: [
                    { model: modelCategory},
                    { model: modelTags}
                ]
            })
            return pet
        } catch (error) {
            return error
        }
    },
    async editPet(id, { name, status }){
        try {
            const pet = await modelPets.findByPk(id)
            const updatePet = await pet.update({ name, status }, {where: {id: id}})
            console.log("pet", updatePet)
            return updatePet
        } catch (error) {
            return error 
        }
    },
    async deletePet(id){
        try {
            const pet = await modelPets.findByPk(id)
            pet.destroy()
            return
        } catch (error) {
            return error
        }
    }
}

module.exports = petOptions

