export const loadEnvironmentVariable = (value: any, key: string): string => {
  if (!value) throw new Error(`Must configure ${key} environment variable.`)

  return value
}

export * from './msal'
