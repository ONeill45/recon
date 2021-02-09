export const populateEnvVariables = () => {
  process.env['POSTGRES_USERNAME'] = 'postgres'
  process.env['POSTGRES_PASSWORD'] = 'postgres'
  process.env['POSTGRES_HOST'] = 'localhost'
  process.env['POSTGRES_DATABASE'] = 'test'
  process.env['POSTGRES_PORT'] = '6433'
}

populateEnvVariables()
