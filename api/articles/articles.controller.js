const ArticleService = require("../articles/articles.service");

class ArticlesController {
  async createArticle(req, res) {
    try {
      const { title, content } = req.body;
      const userId = req.user._id; 
      const article = await ArticleService.createArticle({ title, content, user: userId });
      req.io.emit("articleCreated", article);
      res.status(201).json(article);
    } catch (err) {
      next(err);
    }
  }

  async getAllArticles(req, res) {
    try {
      const articles = await ArticleService.getAllArticles();
      res.status(200).json(articles);
    } catch (err) {
      next(err);
    }
  }

  async getArticleById(req, res) {
    try {
      const { id } = req.params;
      const article = await ArticleService.getArticleById(id);
      if (!article) {
        return res.status(404).json({ message: "Article non trouvé" });
      }
      res.status(200).json(article);
    } catch (err) {
      next(err);
    }
  }

  async updateArticle(req, res) {
    try {
      if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Accès refusé. Vous devez être administrateur pour modifier cet article." });
      }

      const { id } = req.params;
      const { title, content, user, status } = req.body;
      const updatedArticle = await ArticleService.updateArticle(id, { title, content, user, status });
      if (!updatedArticle) {
        return res.status(404).json({ message: "Article non trouvé" });
      }
      req.io.emit("articleUpdated", updatedArticle);
      res.status(200).json(updatedArticle);
    } catch (err) {
      next(err);
    }
  }

  async deleteArticle(req, res) {
    try {
      if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Accès refusé. Vous devez être administrateur pour supprimer cet article." });
      }
      const { id } = req.params;
      const deletedArticle = await ArticleService.deleteArticle(id);
      if (!deletedArticle) {
        return res.status(404).json({ message: "Article non trouvé" });
      }
      req.io.emit("articleDeleted", id);
      res.status(200).json({ message: "Article supprimé avec succès" });
    } catch (err) {
      next(err);
    }
  }

  async getUserArticles(req, res) {
    try {
      const { userId } = req.params;
      const articles = await ArticleService.getArticlesByUser(userId);
      res.status(200).json(articles);
    } catch (err) {
      next(err);
    }
  }
}




module.exports = new ArticlesController();
