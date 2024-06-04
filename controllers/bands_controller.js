const bands = require('express').Router()

db = require('../models'); const { Band } = db;//EXPORT

// READ - FIND ALL BANDS 
bands.get('/', async (req, res) => {
    try {
        const foundBands = await Band.findAll();
        res.status(200).json(foundBands);
    } catch (err) {
        res.status(500).json(error);
    }
});


// READ - FIND SPECIFIC BAND 
bands.get('/:id', async (req, res) => {
    try {
        const foundBand = await Band.findOne({
            where: { band_id: req.params.id }
        });
        res.status(200).json(foundBand);
    } catch (err) {
        res.status(500).json(err);
    }
});

bands.post('/', async (req, res) => {
    try {
        const newBand = await Band.create(req.body);
        res.status(200).json({ message: 'Successfully inserted a new band', data: newBand })
    } catch (err) {
        res.status(500).json(err);
    }
});

// UPDATE - Update a Band 
bands.put('/:id', async (req, res) => {
    try {
        const updatedBands = await Band.update(req.body, { where: { band_id: req.params.id } });
        res.status(200).json({ message: `Successfully ${updatedBands} band(s)`, data: updatedBands })
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE - Delete a Band 
bands.delete('/:id', async (req, res) => {
    try {
        const deletedBands = await Band.destroy({ where: { band_id: req.params.id } });
        res.status(200).json({ message: `Successfully ${deletedBands} band(s)` })
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = bands;