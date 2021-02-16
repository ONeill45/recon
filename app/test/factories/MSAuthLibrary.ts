import { Factory } from 'rosie'
import faker from 'faker'
import { AccountInfo } from '@azure/msal-browser'

export const MSAccountInfoFactory = Factory.define<AccountInfo>('MSAccount')
  .attr('username', () => faker.internet.email())
  .attr('name', () => `${faker.name.firstName()} ${faker.name.lastName()}`)
  .attr('homeAccountId', () => faker.random.alphaNumeric(20))

export const MSAccessTokenFactory = Factory.define(
  'MSAccessToken',
).attr('token', () => faker.random.alphaNumeric(20))
