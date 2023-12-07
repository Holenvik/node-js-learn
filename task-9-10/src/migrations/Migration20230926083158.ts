import { Migration } from '@mikro-orm/migrations';

export class Migration20230926083158 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "cart" ("id" uuid not null, "user_id" varchar(255) not null, "is_deleted" boolean not null, constraint "cart_pkey" primary key ("id"));',
    );

    this.addSql(
      'create table "order" ("id" uuid not null, "user_id" varchar(255) not null, "cart_id" varchar(255) not null, "items" jsonb not null, "payment" jsonb not null, "delivery" jsonb not null, "comments" varchar(255) not null, "status" varchar(255) not null, "total" int not null, constraint "order_pkey" primary key ("id"));',
    );

    this.addSql(
      'create table "product" ("id" varchar(255) not null, "title" varchar(255) not null, "description" varchar(255) not null, "price" int not null, constraint "product_pkey" primary key ("id"));',
    );

    this.addSql(
      'create table "cart_item" ("id" uuid not null, "count" int not null, "product_id" varchar(255) not null, "cart_id" uuid not null, constraint "cart_item_pkey" primary key ("id"));',
    );

    this.addSql(
      'create table "user" ("id" uuid not null, "name" varchar(255) not null, constraint "user_pkey" primary key ("id"));',
    );

    this.addSql(
      'alter table "cart_item" add constraint "cart_item_product_id_foreign" foreign key ("product_id") references "product" ("id") on update cascade;',
    );
    this.addSql(
      'alter table "cart_item" add constraint "cart_item_cart_id_foreign" foreign key ("cart_id") references "cart" ("id") on update cascade;',
    );
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "cart_item" drop constraint "cart_item_cart_id_foreign";',
    );

    this.addSql(
      'alter table "cart_item" drop constraint "cart_item_product_id_foreign";',
    );

    this.addSql('drop table if exists "cart" cascade;');

    this.addSql('drop table if exists "order" cascade;');

    this.addSql('drop table if exists "product" cascade;');

    this.addSql('drop table if exists "cart_item" cascade;');

    this.addSql('drop table if exists "user" cascade;');
  }
}
