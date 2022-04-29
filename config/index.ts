export default async () => ({
  app: (await import('./app')).default,
  database: (await import('./database')).default,
  swagger: (await import('./swagger')).default,
  cors: (await import('./cors')).default,
});
