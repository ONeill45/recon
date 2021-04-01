const mockUseRouter = {
  pathname: '/home',
  push: jest.fn(),
  reload: jest.fn(),
  prefetch: jest.fn(),
}

const applyMockUseRouter = (options?: {}) =>
  jest.spyOn(require('next/router'), 'useRouter').mockImplementation(() => ({
    ...mockUseRouter,
    ...options,
  }))

export { mockUseRouter, applyMockUseRouter }
