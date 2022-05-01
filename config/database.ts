export default {
  type: process.env.TYPEORM_TYPE || 'postgres',
  host: process.env.HOST || 'localhost',
  username: process.env.TYPEORM_USERNAME || 'postgres',
  password: process.env.TYPEORM_PASSWORD || 'guest',
  database: process.env.TYPEORM_DATABASE || 'core',
  url: process.env.DATABASE_URL,
  port: parseInt(process.env.POSTGRES_DB_PORT, 10),
  // logging: process.env.TYPEORM_LOGGING === 'true',  //  warning //  need to be fixed
  // entities: ['**/*.entity.ts'],  //   neet to be fixed
  autoLoadEntities: true,
  migrations: ['migrations/**/*.ts'],
  migrationsRun: process.env.TYPEORM_MIGRATIONS_RUN === 'true',
  synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
  cli: {
    entitiesDir: 'src',
    migrationsDir: 'migrations',
  },
};
