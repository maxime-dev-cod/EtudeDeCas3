const Article = require("../articles/articles.schema");

class ArticleService {
   createArticle({ title, content, user }) {
      const article = new Article({ title, content, user });
      return article.save();
  }

   getAllArticles() {
      return Article.find().populate("user");
  }

   getArticleById(id) {
      return Article.findById(id).populate("user");
  }

  updateArticle(id, data) {
      const article = Article.findById(id);
      // Mettre à jour les champs de l'article
      article.title = data.title || article.title;
      article.content = data.content || article.content;
      article.user = data.user || article.user;
      article.status = data.status || article.status;
      article.updatedAt = Date.now();
      return article.save();
    
  }

  deleteArticle(id) {
      const deletedArticle = Article.findByIdAndDelete(id);
      return deletedArticle;
  }

  getArticlesByUser(userId) {
      return Article.find({ user: userId }).populate("user", "-password");
  }

}

module.exports = ArticleService;
