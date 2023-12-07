import { Entity, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { v4 } from 'uuid';
import * as bcrypt from 'bcrypt';

@Entity()
@Unique({ properties: ['email'] })
export class User {
  @PrimaryKey({ type: 'uuid' })
  id?: string = v4();

  @Property()
  email: string;

  @Property()
  password: string;

  @Property()
  role: 'admin' | 'user';

  constructor(email: string, password: string, role: 'admin' | 'user') {
    this.email = email;
    this.password = this.hashPassword(password);
    this.role = role;
  }

  private hashPassword(password: string): string {
    const saltRounds = 10; // You can adjust this value
    return bcrypt.hashSync(password, saltRounds);
  }

  verifyPassword(password: string): boolean {
    return bcrypt.compareSync(password, this.password);
  }
}
