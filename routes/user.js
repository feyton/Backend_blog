const express = require(`express`);
const userController = require(`../controlers/user`);
const router = express.Router();
/**
 * @openapi
 * tags:
 *  name: User
 *  description: APIs for the user
 */


/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      required:
 *        - name
 *        - email
 *        - password
 *      properties:
 *        name:
 *          type: string
 *          description: Every user must provide a name
 *        email:
 *          type: string
 *          description: email must be provided
 *        password:
 *          type: string
 *          description: Also provide your password.
 *      example:
 *        name: Me
 *        email: me@gmail.com
 *        password: me123
 */

/**
 * @swagger
 * components:
 *  responses:
 *    UnauthorizedError:
 *      description: Access need Token
 */
/**
 * @swagger
 * components:
 *  securitySchemes:
 *    Token:
 *      type: http
 *      scheme: Bearer
 *      bearerFormat: JWT
 */

/**
 * @swagger
 * components:
 *  schemas:
 *      LoginInfo:
 *          type: object
 *          required:
 *              - email
 *              - password
 *          properties:
 *              email:
 *                  type: string
 *                  description: an email must be valid
 *              password:
 *                  type: string
 *                  description: password required.
 *          example:
 *            email: example@gmail.com
 *            password: exapmle123
 */


/**
 * @swagger
 * /user/register:
 *  post:
 *    summary: A user can make registration
 *    description: both name, email and password must be provided
 *    tags:
 *      - User
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *         schema:
 *            $ref: '#/components/schemas/User'
 *    
 *    responses:
 *      200:
 *        description: Successfully registered.
 *        content:
 *          application/json:
 *           schema:
 *           $ref: '#/components/schemas/User'
 *         
 *      400:
 *        description: Invalid input or Bad formated input
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: object
 *                code:
 *                  type: number
 */

router.post(`/signup`, userController.userController);
/**
 * @swagger
 * /user/login:
 *  post:
 *    summary: A user must sign-in with his/her credentials
 *    description: A user must provide a valid email and password to login
 *    tags:
 *      - User
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/LoginInfo'
 *    responses:
 *      200:
 *        description: Logged-in successfully!, keep your Token
 *      400:
 *        description: Invalid userName or password!
 *      404:
 *        description: Email is not found!
 */

router.post(`/login`, userController.userloginController)
router.get(`/user`, userController.getusers);


router.get(`/:_id`, userController.getuser);

/**
 * @swagger
 * /user/{id}:
 *  put:
 *    security:
 *      - Token: []
 *    summary: you can update your profile
 *    description: you need a valid Token to update your profile
 *    tags:
 *      - User
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: use a Valid Id
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Successfully updated
 *      500:
 *        description: Internal error!
 */
router.put(`/:_id`, userController.updateUser);

router.delete(`/:_id`, userController.deleteUser);







module.exports = router