CREATE TYPE "public"."type_content" AS ENUM('image', 'video');--> statement-breakpoint
CREATE TABLE "stories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"type" "type_content" NOT NULL,
	"url" text NOT NULL,
	"public_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "story_watchers" (
	"user_id" uuid NOT NULL,
	"story_id" uuid NOT NULL,
	CONSTRAINT "composite_pk_story_watchers_table" PRIMARY KEY("story_id","user_id")
);
--> statement-breakpoint
ALTER TABLE "notifications" ALTER COLUMN "type" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "stories" ADD CONSTRAINT "stories_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "story_watchers" ADD CONSTRAINT "story_watchers_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "story_watchers" ADD CONSTRAINT "story_watchers_story_id_stories_id_fk" FOREIGN KEY ("story_id") REFERENCES "public"."stories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "index_user_id_of_stories_table" ON "stories" USING btree ("user_id");