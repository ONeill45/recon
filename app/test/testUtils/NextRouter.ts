const mockUseRouter = {
  pathname: '/home',
  push: jest.fn(),
  reload: jest.fn(),
}

const applyMockUseRouter = (options?: {}) =>
  jest.spyOn(require('next/router'), 'useRouter').mockImplementation(() => {
    return {
      ...mockUseRouter,
      ...options,
    }
  })

export { mockUseRouter, applyMockUseRouter }
