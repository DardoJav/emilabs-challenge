import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize('mysql://root:ztZcgbuDSQAxanuQZgrErBjNCxPfzQxh@roundhouse.proxy.rlwy.net:16829/railway',
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        quoteIdentifiers: false,
        logging: console.log,
    }
);

export const connectToDatabase = async () => {
    try {
        console.log('haciendo conexion');
        await sequelize.authenticate();
        console.log('Conexión establecida con la base de datos.');
    } catch (error) {
        console.error('Error conectando a la base de datos:', error);
        process.exit(1);
    }
};