const request = require('supertest');
const express = require('express');
const mockingoose = require('mockingoose');
const Article = require('../api/articles/articles.schema');
const ArticleService = require('../api/articles/articles.service');
const articleRouter = require('../api/articles/articles.router'); 

const app = express();
app.use(express.json());
app.use('/api/articles', articleRouter);

describe('ArticleService', () => {
  let articleService;

  beforeEach(() => {
    articleService = new ArticleService();
  });

  describe('POST /api/articles', () => {
    it('doit créer un article et retourner le status 201', async () => {
      const mockArticle = {
        _id: '60d21b4667d0d8992e610c85',
        title: 'Article test',
        content: 'Ceci est un test',
        user: '60d21b4567d0d8992e610c84'
      };

      
      mockingoose(Article).toReturn(mockArticle, 'save');

      const response = await request(app)
        .post('/api/articles')
        .send({
          title: 'Article test',
          content: 'Ceci est un test',
          user: '60d21b4567d0d8992e610c84'
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('title', 'Article test');
    });
  });

  describe('PUT /api/articles/:id', () => {
    it('Met à jour un article existant et renvoie 200', async () => {
      const articleId = '60d21b4667d0d8992e610c85';
      const mockArticle = {
        _id: articleId,
        title: 'Article test mis à jour',
        content: 'Ceci est un article test mis à jour',
        user: '60d21b4567d0d8992e610c84'
      };

      
      mockingoose(Article).toReturn(mockArticle, 'findOneAndUpdate');

      const response = await request(app)
        .put(`/api/articles/${articleId}`)
        .send({
          title: 'Article test mis à jour',
          content: 'Ceci est un article test mis à jour'
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('title', 'Article test mis à jour');
    });
  });

  describe('DELETE /api/articles/:id', () => {
    it('Supprime un article et renvoie 200', async () => {
      const articleId = '60d21b4667d0d8992e610c85';

      
      mockingoose(Article).toReturn({}, 'findOneAndDelete');

      const response = await request(app)
        .delete(`/api/articles/${articleId}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message', 'Article supprimé');
    });
  });
});
