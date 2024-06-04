const Events = require('express').Router();
const { Op } = require('sequilize');
const db = require('../models');
const { Event } = db;


Event.get('/', async (req, res) => {
    try {
        const foundEvents = await Event.findOne({
            where: { event_id: req.params.id}
        });
    }catch(err){
        res.status(500).json(err);
    }
}); 

Event.get('/', async (req, res)=>{
    try{
        const foundEvents = await Event.findAll({
            order: [['available_start_time','ASC']],
            where:{
                name:{ [Op.like]: `%${req.query.name ? req.query.name : ''}%`}
            }
        });
        res.status(200).json(foundEvents);
    }catch(err){
        res.status(500).json(err);
    }
});

Event.post('/', async (req, res) => {
    try{
        const newEvent = await Event.create(req.body);
        res.status(200).json({
            message: 'Successfully inserted a new Event',
            data:newEvent
        })
    }catch(err){
        res.status(500).json(err);
    }
})

Event.put('/:id', async (req, res) => {
    try{
        const updatedEvents = await Event.update(req.body, {
            where: { event_id: req.params.id }

        });
        res.status(200).json({
            message: `Successfully ${updatedEvents} events(s)`,
            data: updatedEvents
        })
    }catch (err){
        res.status(500).json(err);
    }
});

Event.delete('/:id', async (req, res) => {
    try{
        const deletedEvents = await Event.destroy({
            where: { event_id: req.params.id }
        });
        res.status(200).json({
            message:`Successfully ${deletedEvents} events(s)`
        })   
    }catch (err){
        res.status(500).json(err);
    }
});

module.exports= Event