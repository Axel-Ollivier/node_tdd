module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Attendees', 'BookingId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Bookings', // name of Target model
        key: 'id', // key in Target model that we're referencing
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    })
  },
  down: (queryInterface) => {
    return queryInterface.removeColumn('Attendees', 'BookingId')
  }
}