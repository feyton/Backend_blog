
const Article = require(`../models/article`);
const mongoose = require(`mongoose`);
const{articleValidation} = require(`../middlewares/article`)



const articleController = async (req, res) =>{

     //  Validate data
     const{error} = articleValidation(req.body); 
if (error) return res.status(400).send(error.details[0].message);

    const {title, description} = req.body;
    try {
        const newArticle = new Article ({
            title,
            description
        })
       const savedArticle = await newArticle.save()
       res.status(201).json({message:`Article saved`, savedArticle});
    } catch(err){
  res.status(500).json({message:err});
    }
  }
  
  const getArticles = async (req, res) =>{
    try {
        const allArticle= await Article.find()
        res.status(200).json({message: `All articles`, allArticle});
    }catch(err){
  res.status(500).json({message: err})
    }
  }
  const getArticle = async (req, res) =>{
    const{_id} = req.params
    try {
        const article = await Article.findById({_id})
        if(!article) return res.status(404).json({message: `Article not found`})

        res.status(200).json({article});
    }catch(err){
  res.status(500).json({message: err})
    }
  }

  const updateArticle = async (req, res) =>{
        //  Validate data 
const {error} = articleValidation(req.body);
if (error) return res.status(400).send(error.details[0].message);

    const {title, description} = req.body;
    try{
      const{_id} = req.params
      if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(400).json({err: `Invalid id`})
    
      const updatedArticle = await Article.updateOne({_id}, {$set: {title, description}}, {new:true})
      res.status(200).json({message: `Article updated successfully`, updatedArticle})
    
    }catch (error){
      res.status(500).json({message: error})
    }
  }
  
  const deleteArticle = async (req, res) =>{
    const{_id} = req.params
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(400).json({err: `Invalid id`})
  
    try{
    const deletedArticle = await Article.deleteOne({_id})
    res.status(200).json({message: `User Deleted successfully`, deletedArticle})
    }catch(error){
      res.status(500).json({message: error})
    }
  }

  module.exports = {
    articleController,
    getArticles,
    getArticle,
    updateArticle,
    deleteArticle
  }





