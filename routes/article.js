
    const express = require(`express`);
    const articleController = require(`../controlers/article`);
    const verify = require(`../routes/verifyToken`);
    const router = express.Router();
    /**
 * @openapi
 * tags:
 *  name: Blog
 */

    /**
 * @swagger
 * components:
 *  schemas:
 *    Article:
 *      type: object
 *      required:
 *        - title
 *        - description
 *      properties:
 *        title:
 *          type: string
 *          description: Every post must have title 
 *        description:
 *          type: string
 *          description: This holds the content of the post.
 *      example:
 *        title: My post
 *        snippet: lemme post my self
 *        body: This is content of my post
 */


    router.post(`/article`,verify, articleController.articleController);
   
    router.get(`/article`,verify, articleController.getArticles);
    router.get(`/:_id`, verify, articleController.getArticle);
    router.put(`/:_id`, verify, articleController.updateArticle);
    router.delete(`/:_id`,verify, articleController.deleteArticle)
    
    
    module.exports = router