const express = require('express');
const router = express.Router();
const Kit = require('../schemas/kitSchema.js');
const kitService = require('../services/kitService.js');

// get all kits, testing purposes
router.get('/all', kitService.getKits);


// { label_id: X, trackcode: Y }
// { label_id: X, trackcode: Z }
// grab a single kit given its label_id
router.get('/:label_id', async (req, res) => {
    try {
        const label_id = req.params.label_id;
        const kit = await Kit.find({ label_id: label_id });
        res.json(kit);
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
});

// grab all kits starting with a given label_id
router.get('/autocomplete/:label_id', async (req, res) => {
    try {
        const label_id = req.params.label_id;
        const kits = await Kit.find({ label_id: { "$regex": new RegExp('^' + label_id) }});
                                                             // ^ indicates matching the beginning
        res.json(kits);
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
});

module.exports = router;
