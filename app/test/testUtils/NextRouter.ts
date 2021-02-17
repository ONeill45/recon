const mockUseRouter = {
  pathname: '/home',
  push: jest.fn(),
  reload: jest.fn(),
}

const applyMockUseRouter = () =>
  jest
    .spyOn(require('next/router'), 'useRouter')
    .mockImplementation(() => mockUseRouter)

export { mockUseRouter, applyMockUseRouter }
