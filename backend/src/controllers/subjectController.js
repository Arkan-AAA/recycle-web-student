const Subject = require('../models/Subject');

const subjectController = {
  getAllSubjects: async (req, res) => {
    try {
      const subjects = await Subject.findAll();
      res.json(subjects);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getSubjectById: async (req, res) => {
    try {
      const subject = await Subject.findByPk(req.params.id);
      if (!subject) {
        return res.status(404).json({ error: 'Subject not found' });
      }
      res.json(subject);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = subjectController;