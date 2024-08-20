CREATE TABLE IF NOT EXISTS "contact" (
	"id" serial PRIMARY KEY NOT NULL,
	"message" text,
	"name" text,
	"email" text,
	"subject" text,
	"createdat" date DEFAULT '2024-08-19T10:55:41.241Z',
	"updatedat" date DEFAULT '2024-08-19T10:55:41.241Z'
);
--> statement-breakpoint
ALTER TABLE "customer" ALTER COLUMN "createdat" SET DEFAULT '2024-08-19T10:55:41.235Z';--> statement-breakpoint
ALTER TABLE "customer" ALTER COLUMN "updatedat" SET DEFAULT '2024-08-19T10:55:41.235Z';--> statement-breakpoint
ALTER TABLE "measurements" ALTER COLUMN "ShirtLength" SET DATA TYPE double precision;--> statement-breakpoint
ALTER TABLE "measurements" ALTER COLUMN "Sleeve" SET DATA TYPE double precision;--> statement-breakpoint
ALTER TABLE "measurements" ALTER COLUMN "Thigh" SET DATA TYPE double precision;--> statement-breakpoint
ALTER TABLE "measurements" ALTER COLUMN "Chest" SET DATA TYPE double precision;--> statement-breakpoint
ALTER TABLE "measurements" ALTER COLUMN "TrouserLength" SET DATA TYPE double precision;--> statement-breakpoint
ALTER TABLE "measurements" ALTER COLUMN "PantLeg" SET DATA TYPE double precision;--> statement-breakpoint
ALTER TABLE "measurements" ALTER COLUMN "Shoulder" SET DATA TYPE double precision;--> statement-breakpoint
ALTER TABLE "order" ALTER COLUMN "createdat" SET DEFAULT '2024-08-19T10:55:41.240Z';--> statement-breakpoint
ALTER TABLE "order" ALTER COLUMN "updatedat" SET DEFAULT '2024-08-19T10:55:41.240Z';--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "createdat" SET DEFAULT '2024-08-19T10:55:41.230Z';--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "updatedat" SET DEFAULT '2024-08-19T10:55:41.231Z';--> statement-breakpoint
ALTER TABLE "customer" ADD COLUMN "codeId" text;--> statement-breakpoint
ALTER TABLE "measurements" ADD COLUMN "HemLength" double precision;--> statement-breakpoint
ALTER TABLE "measurements" ADD COLUMN "HemType" double precision;--> statement-breakpoint
ALTER TABLE "measurements" ADD COLUMN "CollarLength" double precision;--> statement-breakpoint
ALTER TABLE "measurements" ADD COLUMN "CollarType" double precision;--> statement-breakpoint
ALTER TABLE "measurements" ADD COLUMN "PocketSide" double precision;--> statement-breakpoint
ALTER TABLE "measurements" ADD COLUMN "PockectFront" double precision;--> statement-breakpoint
ALTER TABLE "measurements" ADD COLUMN "PocketTrouser" double precision;--> statement-breakpoint
ALTER TABLE "measurements" ADD COLUMN "AdditionalNotes" text;--> statement-breakpoint
ALTER TABLE "measurements" DROP COLUMN IF EXISTS "Hem";--> statement-breakpoint
ALTER TABLE "measurements" DROP COLUMN IF EXISTS "Collar";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "remember";