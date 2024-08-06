const express = require("express");
const articlesController = require("../articles/articles.controller");
const authMiddleware = require("../api/middlewares/auth");
const router = express.Router();

router.post("/", authMiddleware, articlesController.createArticle);
router.get("/", articlesController.getAllArticles);
router.get("/:id", articlesController.getArticleById);
router.put("/:id", authMiddleware, articlesController.updateArticle);
router.delete("/:id", authMiddleware, articlesController.deleteArticle);

module.exports = router;