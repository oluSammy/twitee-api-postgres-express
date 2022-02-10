import {MigrationInterface, QueryRunner} from "typeorm";

export class newTable1644504544010 implements MigrationInterface {
    name = 'newTable1644504544010'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "password" character varying NOT NULL, "email" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "twit" ("id" SERIAL NOT NULL, "twit" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "userIdId" integer, CONSTRAINT "PK_2abd9f4b5f227ba1be8132df2b0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comment" ("id" SERIAL NOT NULL, "comment" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "userIdId" integer, "twitId" integer, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "like" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "twitId" integer, "userIdId" integer, CONSTRAINT "PK_eff3e46d24d416b52a7e0ae4159" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "twit" ADD CONSTRAINT "FK_51c1effc6220bd6c647c7655719" FOREIGN KEY ("userIdId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_7b234a25c33f190539f07fe5feb" FOREIGN KEY ("userIdId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_e3ff54d5615c07f5c561c8a8b77" FOREIGN KEY ("twitId") REFERENCES "twit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "like" ADD CONSTRAINT "FK_e5cb0d080425e9c2dac06fca025" FOREIGN KEY ("twitId") REFERENCES "twit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "like" ADD CONSTRAINT "FK_df2272f102353bff4ffcb3edb78" FOREIGN KEY ("userIdId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "like" DROP CONSTRAINT "FK_df2272f102353bff4ffcb3edb78"`);
        await queryRunner.query(`ALTER TABLE "like" DROP CONSTRAINT "FK_e5cb0d080425e9c2dac06fca025"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_e3ff54d5615c07f5c561c8a8b77"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_7b234a25c33f190539f07fe5feb"`);
        await queryRunner.query(`ALTER TABLE "twit" DROP CONSTRAINT "FK_51c1effc6220bd6c647c7655719"`);
        await queryRunner.query(`DROP TABLE "like"`);
        await queryRunner.query(`DROP TABLE "comment"`);
        await queryRunner.query(`DROP TABLE "twit"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
