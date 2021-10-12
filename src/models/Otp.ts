import Sequelize from 'sequelize';
import db from '../connections/db';

const Otp = db.define(
  'otp',
  {
    mobile: {
      type: Sequelize.STRING,
    },
    otp: {
      type: Sequelize.STRING,
    },
  },
  { timestamps: true },
);

export default Otp;
