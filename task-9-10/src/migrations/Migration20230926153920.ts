import { Migration } from '@mikro-orm/migrations';

export class Migration20230926153920 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "user" add column "password" varchar(255) not null, add column "role" varchar(255) not null;',
    );
    this.addSql('alter table "user" rename column "name" to "email";');
    this.addSql(
      'alter table "user" add constraint "user_email_unique" unique ("email");',
    );
  }

  async down(): Promise<void> {
    this.addSql('alter table "user" add column "name" varchar(255) not null;');
    this.addSql('alter table "user" drop constraint "user_email_unique";');
    this.addSql('alter table "user" drop column "email";');
    this.addSql('alter table "user" drop column "password";');
    this.addSql('alter table "user" drop column "role";');
  }
}
