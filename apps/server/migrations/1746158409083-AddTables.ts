import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTables1746158409083 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "roles" (
              "id" SERIAL NOT NULL,
              "name" character varying NOT NULL,
              "description" text,
              "is_deleted" boolean NOT NULL DEFAULT false,
              "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
              "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
              CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id")
            )
          `);
    await queryRunner.query(`
            CREATE TABLE "passport" (
              "id" SERIAL NOT NULL,
              "expired_at" TIMESTAMP NOT NULL DEFAULT now(),
              "secret_token" character varying NOT NULL,
              "password" text NOT NULL,
              "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
              "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
              "user" integer,
              CONSTRAINT "REL_5856f7b50119d8aa3bd4107e2b" UNIQUE ("user"),
              CONSTRAINT "PK_48da3babc4ea0bcbb594251d892" PRIMARY KEY ("id")
            )
          `);
    await queryRunner.query(`
            CREATE TABLE "users" (
              "id" SERIAL NOT NULL,
              "username" text NOT NULL,
              "email" text NOT NULL,
              "first_name" character varying NOT NULL,
              "last_name" character varying NOT NULL,
              "is_deleted" boolean NOT NULL DEFAULT false,
              "last_sign_in_time" TIMESTAMP,
              "last_failed_login_time" TIMESTAMP,
              "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
              "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
              "role_id" integer,
              CONSTRAINT "UQ_fe1bb3f6520ee0469504521e710" UNIQUE ("username"),
              CONSTRAINT "UQ_97472ac88f789774dd47f7c8be3" UNIQUE ("email"),
              CONSTRAINT "PK_a3fab1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
            )
          `);

    await queryRunner.query(`
            CREATE TABLE "passport_history" (
              "id" SERIAL NOT NULL,
              "password" character varying NOT NULL,
              "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
              "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
              "user" integer,
              CONSTRAINT "PK_695b703eaf3281e665c8968f5de" PRIMARY KEY ("id")
            )
          `);

    await queryRunner.query(`
            ALTER TABLE "passport"
            ADD CONSTRAINT "FK_5856f7b50119d8aa3bd4107e2b8" FOREIGN KEY ("user") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
          `);

    await queryRunner.query(`
            ALTER TABLE "users"
            ADD CONSTRAINT "FK_a2cecd1a3531c0b041e29ba46e1" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
          `);

    await queryRunner.query(`
            ALTER TABLE "passport_history"
            ADD CONSTRAINT "FK_7492d27a28f9031a445391d2967" FOREIGN KEY ("user") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
          `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "passport_history" DROP CONSTRAINT "FK_7492d27a28f9031a445391d2967"
      `);
    await queryRunner.query(`
        ALTER TABLE "passport" DROP CONSTRAINT "FK_5856f7b50119d8aa3bd4107e2b8"
      `);
    await queryRunner.query(`
        ALTER TABLE "users" DROP CONSTRAINT "FK_a2cecd1a3531c0b041e29ba46e1"
      `);
    await queryRunner.query(`
        DROP TABLE "passport_history"
      `);
    await queryRunner.query(`
        DROP TABLE "users"
      `);
    await queryRunner.query(`
        DROP TABLE "passport"
      `);
    await queryRunner.query(`
        DROP TABLE "roles"
      `);
  }
}
