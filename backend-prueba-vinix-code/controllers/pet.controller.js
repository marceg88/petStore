const PetOptions = require('../services/pet.services')

const createCategoryP = async (req, res) => {
    const {name} = req.body
    try {
        const category = await PetOptions.createCategory(name)
        res.status(200).json({
            message: "The category was registered correctly!",
            status: "Ok",
            data: category
        })
    } catch (error) {
        res.status(500).json({
            message: "An error occurred while registering the category!",
            status: "Failed",
            data: error
        })
    }
    
}
const createTagsP = async (req, res) => {
    const {name} = req.body
    try {
        const tag = await PetOptions.createTags(name)
        res.status(200).json({
            message: "The tag was registered correctly!",
            status: "Ok",
            data: tag
        })
    } catch (error) {
        res.status(500).json({
            message: "An error occurred while registering the tag!",
            status: "Failed",
            data: error
        })
    }
    
}

const petCreate = async(req, res) => {
    const { name, status, categoryId, tagsId, photoUrls } = req.body
    
    if(!name){
        res.status(400).json({
            message: "Content can not be empty!",
            status: "Failed",
            data: {}
        })
    } else {
        try {
            
            const petRegister = await PetOptions.createPet({name, status, categoryId, tagsId, photoUrls})
            console.log(petRegister)
            res.status(200).json({
                message: "The pet was registered correctly!",
                status: "Ok",
                data: petRegister
            })
        } catch (error) {
            res.status(500).json({
                message: "An error occurred while registering the pet!",
                status: "Failed",
                data: error
            })
        }
        
    }
    
}

const findPetByStatus = async (req,res) => {
    const {status} = req.query.status
    try {
        const pets = await PetOptions.findByStatus(status)
        console.log("entra", pets)
        res.status(200).json({
            message: "The Pets were found successfully!",
            status: "Ok",
            data: pets
        })
    } catch (error) {
        res.status(403),json({
            message: "The Pets not found!",
            status: "Failed",
            data: error
        })
    }
}

const findPetAll = async (req,res) => {
    try {
        console.log("entra1")
        const pets = await PetOptions.findPetAll()
        
        res.status(200).json({
            message: "The Pets were found successfully!",
            status: "Ok",
            data: pets
        })
    } catch (error) {
        res.status(403),json({
            message: "The Pets not found!",
            status: "Failed",
            data: error
        })
    }
}
const findPetById = async (req, res) => {
    const { petId } = req.params
    
    try {
        const pet = await PetOptions.findById(petId)
        console.log(pet)
        if(pet){
            res.status(200).json({
                message: "The Pet were found successfully!",
                status: "Ok",
                data: pet
            })
        } else {
            res.status(400).json({
                message: "The pet not found!",
                status: "Failed",
                data: {}
            })
        }
        
    } catch (error) {
        res.status(400).json({
            message: "The pet not found!",
            status: "Failed",
            data: {}
        })
    }
}

const updatedPet = async (req, res) => {
    const { petId } = req.params
    const { name, status } = req.body
    try {
        const petExist = await PetOptions.findById(petId)
        if(!petExist){
            res.status(405).json({
                message: "Invalid input",
                status: "Failed",
                data: {}
            })
        } else {
            try {
                const editedPet = await PetOptions.editPet(petId, { name, status })
                console.log("editedPet",editedPet)
                res.status(200).json({
                    message: "The pet was edited correctly!",
                    status: "Ok",
                    data: editedPet
                })
            } catch (error) {
                res.status(405).json({
                    message: "The pet could not be edited!",
                    status: "Failed",
                    data: error
                })
            }
        }
    } catch (error) {
        res.status(500).json({
            message: "Colud not complete the operation, please try again!",
            status: "Failed",
            data: error
        })
    }
}

const deletedPet = async (req, res) => {
    const { petId } = req.params
    try {
        const pet = await PetOptions.findById(petId)
        if(!pet){
            res.status(401).json({
                message: "Pet not found",
                status: "Failed",
                data: {}
            })
        } else {
            try {
                await PetOptions.deletePet(petId)
                res.status(200).json({
                    message: "The pet was successfully removed!",
                    status: "Ok",
                    data: {}
                })
            } catch (error) {
                res.status(400).json({
                    message: "The pet could not be removed!",
                    status: "Failed",
                    data: error
                })
            }
        }
    } catch (error) {
        res.status(500).json({
            message: "Colud not complete the operation, please try again!",
            status: "Failed",
            data: error
        })
    }
    
}


module.exports = { findPetAll, findPetByStatus, updatedPet, deletedPet, createCategoryP, petCreate, findPetById, createTagsP }