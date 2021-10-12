import { Sequelize } from 'sequelize';

// Option 2: Passing parameters separately (other dialects)
const sequelize = new Sequelize('chat', 'manojsingh', '123456', {
  host: 'localhost',
  dialect: 'postgres',
});

export default sequelize;
