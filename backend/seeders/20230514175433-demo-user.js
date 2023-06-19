'use strict';
const bcrypt = require('bcrypt');
require("dotenv").config()
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {

    const hashedPassword = await bcrypt.hash(process.env.admin_password, 10);

    return queryInterface.bulkInsert('users', [
      {
        firstName: 'Admin',
        lastName: 'admin',
        password: hashedPassword,
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date()
      },
  ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};