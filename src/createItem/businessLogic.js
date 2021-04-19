const performCalculation = ({ a, b, method }) => {
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

module.exports = { performCalculation }
