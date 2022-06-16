const { Model } = require('objection');

class Feedback extends Model {
  static get tableName() {
    return 'feedbacks';
  };

  static get userIdColumn() {
    return 'userId';
  };

  static get emailColumn() {
    return 'email';
  };

  static get customerFeedbackColumn() {
    return 'customerFeedback';
  };

  static get screenshotColumn() {
    return 'screenshot';
  };


  $beforeInsert() {
    this.createdAt = new Date();
  };

  $beforeUpdate() {
    this.updatedAt = new Date();
  };


};

module.exports = Feedback