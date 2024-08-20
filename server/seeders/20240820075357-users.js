'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        role_id: 'c96dc87e-fb86-420c-85d3-01030383a84f', // Replace with actual role UUID
        full_name: 'Alice Johnson',
        email: 'alice@gmail.com',
        phone_number: '123-456-7890',
        photo_profil: null,
        password: 'hashedpassword1', // Replace with hashed password
        default_password: true,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        role_id: 'fad6050a-d2d7-4666-a0a6-193a3c9b2633', // Replace with actual role UUID
        full_name: 'Bob Brown',
        email: 'bob@gmail.com',
        phone_number: '987-654-3210',
        photo_profil: null,
        password: 'hashedpassword2', // Replace with hashed password
        default_password: true,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
