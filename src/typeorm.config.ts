import { DataSource } from 'typeorm';
import { KpiInfo } from './entities/kpi-info.entity';
import { KPI } from './entities/kpi.entity';


const datasource = new DataSource({
  type: 'postgres',
  host: process?.env?.DATABASE_PG_HOST ?? 'postgres',
  port: Number(process?.env?.DATABASE_PG_PORT ?? 5432),
  username: process.env.DATABASE_PG_DB_USER,
  password: process.env.DATABASE_PG_DB_PASSWORD,
  database: process.env.DATABASE_PG_DB_NAME,
  ssl: process.env.DATABASE_PG_DB_SSL === 'true', // Expected boolean here, but process.env.* provide only strings.
  entities: [KPI, KpiInfo],
  migrations: ['**/migrations/*.ts'],
});

export default datasource;
