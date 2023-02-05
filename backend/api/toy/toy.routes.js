const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware')
const { getToys, removeToy,addToy,getToyById,updateToy}=require('./toy.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getToys)
router.get('/:id', getToyById)
router.post('/',requireAuth, addToy)
router.put('/:id',requireAuth, updateToy)
router.delete('/:id',requireAuth, removeToy)

module.exports = router