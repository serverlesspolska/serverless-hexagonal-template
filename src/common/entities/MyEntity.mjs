import { randomBytes } from 'node:crypto';
import KSUID from 'ksuid';

export class MyEntity {
  constructor({ id, result, createdAt = new Date() }) {
    this.createdAt = createdAt instanceof Date ? createdAt : new Date(createdAt)
    this.result = parseInt(result, 10)
    this.id = id || this.generateId(createdAt)
  }

  key() {
    return {
      PK: { S: this.id }
    }
  }

  static fromItem(item) {
    return new MyEntity({
      id: item.PK.S,
      result: item.result.N,
      createdAt: item.createdAt.S
    })
  }

  toItem() {
    return {
      ...this.key(),
      result: { N: this.result.toString() },
      createdAt: { S: this.createdAt.toISOString() },
    }
  }

  generateId(createdAt) {
    const payload = randomBytes(16)
    return KSUID.fromParts(createdAt.getTime(), payload).string
  }

  toDto() {
    return {
      id: this.id,
      result: this.result,
      createdAt: this.createdAt.toISOString()
    }
  }
}
