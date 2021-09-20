const express = require('express')
const router = express.Router()
const Voc = require('../models/Vocabulary')(require('../models/index').sequelize, require('../models/index').Sequelize)
const Dictionary = require('../models/Dictionary')(require('../models/index').sequelize, require('../models/index').Sequelize)

//GET ALL DICTIONARY
router.get('/getDictionary', (req, res) => {
    Dictionary.find().then(dictionary => res.json(dictionary))
})

//ADD NEW VOCABULARY FOR USER
router.get('/addVocabulary', async (req, res) => {
    const { vocabulary, translate } = req.body
    const newVocabulary = await {
        vocabulary, translate, user_id: 1
    }
    Voc.create(newVocabulary).then((vocCreated) => {
        if (vocCreated)
            return res.json({ success: true, message: 'Kelimeniz kaydedilmiştir' })
        else
            return res.json({ success: false, message: 'Kelimeniz oluşturulamadı' })
    }).catch(err => {
        console.log(err)
        return res.json({ success: false, message: 'Bir hata oluştu!!!', })
    })
})

//GET USER'S VOCABULARIES
router.get('/getVocabularies', (req, res) => {

})

//UPDATE USER'S VOCABULARIES
router.get('/editVocabulary/:vId', (req, res) => {

})

//DELETE USER'S VOCABULARIES
router.get('/deleteVocabulary/:vId', (req, res) => {

})

module.exports = router