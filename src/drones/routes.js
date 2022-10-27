const { Router } = require('express');
const router = Router();

const controller = require('./controller');
const controllerCamera = require('../cameras/controller');

const authUserSupportCreation = require('../../auth');

/** 
 * Get Drones: Accept the filters for all the columns and return all the information about drones and the supported camera
 * 
 * EX: http://localhost:3000/api/v1/drones?name=phantom&brand=DJI&serialnumber=x4303&cameramodel=hero3&megapixel=12MP&SortBy=name:asc
 * 
 * Sort is implemented in two parts: SortBy=name:asc the column and the order direction (desc or asc) separated by :
 * 
 * See the route.rest file for some example
 * 
 * -------------------------------------------------------------
 * 
 * The Authorization for insert a new Drone is made throught the validation of the user ID sent in the request body into the user table via the team column.
 * 
 * A way to improve this feature is to implement the OAuth 2 Authentication standard with which the user can validate itself throught a JWT Token,
 * with OAuth2 we can define some Roles and Scopes for limit the access of particular request such as the insert of a new Drone.
 * 
 * Another improvement of the code can be implement a schema validator (in expres we can use the library JOI for do that)
 */

router.get('/', controller.getDrones);

router.post('/', authUserSupportCreation, controllerCamera.checkCamera, controller.insertDrone);

module.exports = router;