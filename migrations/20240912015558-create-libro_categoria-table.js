'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('LibroCategoria', {
      libroId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Libros',   // Nombre de la tabla de libros
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      categoriaId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Categorias',  // Nombre de la tabla de categorías
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('LibroCategoria');
  }
};
