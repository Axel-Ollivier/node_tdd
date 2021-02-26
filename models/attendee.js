'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Attendee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Attendee.init({
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    organizer: DataTypes.BOOLEAN,
    response_status: DataTypes.STRING,
    self: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Attendee',
  });
  return Attendee;
};