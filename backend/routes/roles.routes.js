const express = require('express');
const app = express();
const rolesExpressRoute = express.Router();
let RolesSchema = require('../model/roles.model');

rolesExpressRoute.route('/get-role').get(async (req,res,next) => {
    try {
        const data = await RolesSchema.find({});
        res.json(data);
      } catch (error) {
        return next(error);
      }
    });



rolesExpressRoute.route('/get-roles').get(async (req, res, next) => {
    try {
      const data = await RolesSchema.find({
        isdeleted: false
      });
      res.json(data);
    } catch (error) {
      return next(error);
    }
  
  });

  rolesExpressRoute.route('/roles/:id').get(async (req, res) => {
 
        try {
            const data = await RolesSchema.findById(req.params.id);
            res.json(data);
          } catch (error) {
            return next(error);
          }

    
  });
  rolesExpressRoute.route('/add-roles').post(async (req, res, next) => {
    try {
      const data = await RolesSchema.create(req.body);
      res.json(data);
    } catch (error) {
      return next(error);
    }
  });
 
 rolesExpressRoute.route('/update-role/:id').put(async (req, res, next) => {
    try {
        const data = await RolesSchema.findByIdAndUpdate(req.params.id, { $set: req.body });
        res.json(data);
        console.log('Updated Successfully!');
      } catch (error) {
        return next(error);
      }
 });
 

 rolesExpressRoute.route('/soft-role/:id').delete(async (req, res, next) => {
    try {
        const data = await RolesSchema.updateOne({
          _id: req.params.id,
        },{
          $set: {
            isdeleted:true
          },
        });
        res.status(200).json({
          error: false,
          message: "user deleted successfully",//
          _id: req.params.id,
        });
    
       }  catch (err) {
        next(err);
      }
    
 });
 

  module.exports = rolesExpressRoute;