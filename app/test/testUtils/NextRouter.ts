const mockUseRouter = {
  pathname: '/home',
  push: jest.fn(),
  reload: jest.fn(),
  prefetch: jest.fn(() => Promise.resolve(true)),
}

const applyMockUseRouter = (options?: {}) =>
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  jest.spyOn(require('next/router'), 'useRouter').mockImplementation(() => ({
    ...mockUseRouter,
    ...options,
  }))

export { mockUseRouter, applyMockUseRouter }
