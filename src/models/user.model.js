const { Model } = require('objection');

class Login extends Model {
  static get tableName() {
    return 'users';
  };

  static get userIdColumn() {
    return 'userId';
  };

  static get userNameColumn() {
    return 'userName';
  };

  static get emailColumn() {
    return 'email';
  };

  static get RoleColumn() {
    return 'Role';
  };

  static get userPasswordColumn() {
    return 'userPassword';
  };


};

module.exports = Login