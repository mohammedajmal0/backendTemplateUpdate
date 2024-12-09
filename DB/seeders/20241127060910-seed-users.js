'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [
      
      {
        
        name: 'John Doe',
        email: 'john.3doe@example.com',
        password: 'password123', // In a real-world scenario, ensure passwords are hashed
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        
        name: 'Jane Doe',
        email: 'jane.1doe@example.com',
        password: 'password123', // In a real-world scenario, ensure passwords are hashed
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
