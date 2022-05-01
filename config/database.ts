export default {
  type: process.env.TYPEORM_TYPE,
  host: process.env.TYPEORM_HOST,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  url: process.env.DATABASE_URL,
  port: parseInt(process.env.POSTGRES_DB_PORT, 10),
  logging: process.env.TYPEORM_LOGGING,
  entities: ['*/*.entity.ts'],
  autoLoadEntities: true,
  migrations: ['migrations/**/*.ts'],
  migrationsRun: process.env.TYPEORM_MIGRATIONS_RUN,
  synchronize: process.env.TYPEORM_SYNCHRONIZE,
  cli: {
    entitiesDir: 'src',
    migrationsDir: 'migrations',
  },
};
