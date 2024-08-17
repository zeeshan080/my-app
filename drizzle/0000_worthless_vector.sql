CREATE TABLE IF NOT EXISTS "customer" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"phoneNumber" text,
	"user_id" integer,
	"createdat" date DEFAULT '2024-07-29T17:03:13.188Z',
	"updatedat" date DEFAULT '2024-07-29T17:03:13.188Z'
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "measurements" (
	"id" serial PRIMARY KEY NOT NULL,
	"customer_id" integer,
	"ShirtLength" integer,
	"Sleeve" integer,
	"Thigh" integer,
	"Chest" integer,
	"Hem" integer,
	"Collar" integer,
	"TrouserLength" integer,
	"PantLeg" integer,
	"Shoulder" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "order" (
	"id" serial PRIMARY KEY NOT NULL,
	"customer_id" integer,
	"payment" integer,
	"user_id" integer,
	"quantity" integer,
	"delivedDate" date,
	"createdat" date DEFAULT '2024-07-29T17:03:13.190Z',
	"updatedat" date DEFAULT '2024-07-29T17:03:13.190Z'
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"password" text,
	"username" text,
	"remember" boolean DEFAULT false,
	"isactive" boolean DEFAULT true,
	"isverified" boolean DEFAULT false,
	"createdat" date DEFAULT '2024-07-29T17:03:13.186Z',
	"updatedat" date DEFAULT '2024-07-29T17:03:13.187Z'
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "customer" ADD CONSTRAINT "customer_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "measurements" ADD CONSTRAINT "measurements_customer_id_customer_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."customer"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order" ADD CONSTRAINT "order_customer_id_customer_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."customer"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order" ADD CONSTRAINT "order_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
