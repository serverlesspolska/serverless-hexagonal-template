export const performCalculation = ({ a, b, method }) => {
  console.log(`Received method="${method}" and values: a=${a}; b=${b}`)
  switch (method) {
    case 'add':
      return a + b
    // To Do - implement other methods (just sample, not a real to do)
    default:
      throw new NotImplementedYetError()
  }
}

class NotImplementedYetError extends Error {
  constructor() {
    super()
    this.status = 400
    this.statusCode = 400
    this.name = 'NotImplementedYetError'
    this.message = 'Not implemented yet!'
  }
}
