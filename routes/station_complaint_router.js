const mongoose = require('mongoose');
const express = require('express');
const station_complaint = require('../models/station_complaint');
const station_complaint_router = express.Router();

//post a complaint of the station
station_complaint_router.post('/api/station_complaint', async function(req,res){
    try {
        const {Stationname,date,problem_desc,department,media} = req.body;
        const new_station_complaint = new station_complaint({
            Stationname,
             date,
             problem_desc,
            department,
             media
        });
        await new_station_complaint.save();
        return res.status(200).json(new_station_complaint);
    } catch (error) {
        res.status(500).json({
            'error' : error.message,
            'msg' : 'something error occured while registering the station complaint'
        })
    }
})

//to get the atation complaint by departname
station_complaint_router.get('/api/get_station_complaint/:departname', async function(req,res){
    try {
        const complaint_by_departname = await station_complaint.find({department : req.params.departname});
        res.status(200).json(complaint_by_departname);
    } catch (error) {
        res.status(500).json({
            'error' : error.message,
            'msg' : 'something error occured while fetching the station complaint by department name'
        })
    }
})
station_complaint_router.get('/api/change_status_sc/:id', async function (req, res) {
    try {
        const complaint_to_change = await station_complaint.updateOne({ _id: req.params.id }, { status: "Resolved" })
        .then(() => {
            console.log('Document updated successfully');
        })
            .catch(err => {
                console.error('Error updating document:', err);
            });
        // complaint_to_change.status = "Resolved";
        // await complaint_to_change;
        return res.status(200).json({
            msg: 'status changed to resolved'
        });

    } catch (error) {
        res.status(500).json({
            'error': error.message,
            'msg': 'Something went wrong'
        })
    }
})


module.exports = station_complaint_router;