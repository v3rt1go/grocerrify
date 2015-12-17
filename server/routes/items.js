'use strict';
import express from 'express';
import GroceryItem from './../models/GroceryItem.js';

const itemRouter = express.Router({
  mergeParams: true
});

itemRouter.route('/')
  .get((req, res, next) => {
    GroceryItem.find({})
      .then((items) => {
        res.send(items);
      }, (error) => {
        console.error("Error getting data: ", error);    
        next(error);
      }); 
  })
  .post((req, res, next) => {
    const item = req.body;
    GroceryItem.create(item)
      .then(() => {
        res.status(200).send();
      }, (error) => {
        console.error("Error saving data: ", error);    
        next(error);
      });
  });

itemRouter.route('/:id')
  .delete((req, res, next) => {
    GroceryItem.findByIdAndRemove(req.params.id)
      .then(() => {
        res.status(200).send();
      }, (error) => {
        console.error("Error removing document: ", error);
        next(error);
      });
  })
  .patch((req, res, next) => {
    const update = { purchased: req.body.purchased };
    GroceryItem.findByIdAndUpdate(req.params.id, update)
      .then(() => {
        res.status(200).send();
      }, (error) => {
        console.error("Error updating document: ", error);
        next(error);
      });
  });

export default itemRouter;
