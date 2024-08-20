'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('loans', [
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        book_id: '8ecd784e-f063-4b9d-afc8-86b39ec0a59d', 
        borrower_name: 'John Doe',
        loan_date: new Date(),
        estimated_return_date: new Date(new Date().setDate(new Date().getDate() + 14)), 
        return_date: null,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        book_id: '1bd3247b-7d37-49a0-b2b5-79314584d100', 
        borrower_name: 'Jane Smith',
        loan_date: new Date(),
        estimated_return_date: new Date(new Date().setDate(new Date().getDate() + 14)), 
        return_date: null,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Loans', null, {});
  }
};
