const stages = require('express').Router();
const { Op } = require('sequilize');
const db = require('../models');
const { Stage } = db;


stages.get('/', async (req, res) => {
    try {
        const foundStages = await Stage.findOne({
            where: { stage_id: req.params.id}
        });
    }catch(err){
        res.status(500).json(err);
    }
}); 

stages.get('/', async (req, res)=>{
    try{
        const foundStages = await Stage.findAll({
            order: [['available_start_time','ASC']],
            where:{
                name:{ [Op.like]: `%${req.query.name ? req.query.name : ''}%`}
            }
        });
        res.status(200).json(foundStages);
    }catch(err){
        res.status(500).json(err);
    }
});

stages.post('/', async (req, res) => {
    try{
        const newStage = await Stage.create(req.body);
        res.status(200).json({
            message: 'Successfully inserted a new stage',
            data:newStage
        })
    }catch(err){
        res.status(500).json(err);
    }
})

stages.put('/:id', async (req, res) => {
    try{
        const updatedStages = await Stage.update(req.body, {
            where: { stage_id: req.params.id }

        });
        res.status(200).json({
            message: `Successfully ${updatedStages} satges(s)`,
            data: updatedStages
        })
    }catch (err){
        res.status(500).json(err);
    }
});

stages.delete('/:id', async (req, res) => {
    try{
        const deletedStages = await Stage.destroy({
            where: { stage_id: req.params.id }
        });
        res.status(200).json({
            message:`Successfully ${deletedStages} stage(s)`
        })   
    }catch (err){
        res.status(500).json(err);
    }
});

module.exports= stages