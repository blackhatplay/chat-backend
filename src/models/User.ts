import Sequelize from 'sequelize';
import db from '../connections/db';

const User = db.define(
  'user',
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    mobile: {
      type: Sequelize.STRING,
    },
  },
  { timestamps: true },
);

export default User;
