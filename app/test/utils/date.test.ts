import faker from 'faker'
import { getDurationText } from '../../src/utils'
describe('getDurationText()', () => {
  it('should return ended text when end date is in past', () => {
    const startDate = faker.date.past()
    const endDate = faker.date.recent()

    const text = getDurationText(startDate, endDate)

    expect(text).toContain('Ended')
    expect(text).toContain('ago')
  })
  it('should return ending text when end date is set but not past', () => {
    const startDate = faker.date.past()
    const endDate = faker.date.soon()

    const text = getDurationText(startDate, endDate)

    expect(text).toContain('Ending in')
  })
  it('should return started text when start date is in future and no end date', () => {
    const startDate = faker.date.future()
    const endDate = undefined

    const text = getDurationText(startDate, (endDate as unknown) as Date)

    expect(text).toContain('Starting in')
  })
  it('should return started text when start date has past and no end date', () => {
    const startDate = faker.date.past()
    const endDate = undefined

    const text = getDurationText(startDate, (endDate as unknown) as Date)

    expect(text).toContain('Started')
    expect(text).toContain('ago')
  })
})
