CREATE TYPE "public"."notif_enum" AS ENUM('follow', 'like', 'reply', 'comment', 'save');--> statement-breakpoint
CREATE TABLE "notifications" (
	"id" serial PRIMARY KEY NOT NULL,
	"type" "notif_enum",
	"user_id" uuid NOT NULL,
	"actor_id" uuid NOT NULL,
	"post_id" uuid,
	"comment_id" uuid,
	"reply_id" uuid,
	"is_read" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "comment_likes" DROP CONSTRAINT "comment_likes_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "comment_likes" DROP CONSTRAINT "comment_likes_comment_id_comments_id_fk";
--> statement-breakpoint
ALTER TABLE "comments" DROP CONSTRAINT "comments_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "comments" DROP CONSTRAINT "comments_post_id_posts_id_fk";
--> statement-breakpoint
ALTER TABLE "likes" DROP CONSTRAINT "likes_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "likes" DROP CONSTRAINT "likes_post_id_posts_id_fk";
--> statement-breakpoint
ALTER TABLE "posts" DROP CONSTRAINT "posts_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "replies" DROP CONSTRAINT "replies_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "replies" DROP CONSTRAINT "replies_comment_id_comments_id_fk";
--> statement-breakpoint
ALTER TABLE "reply_likes" DROP CONSTRAINT "reply_likes_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "reply_likes" DROP CONSTRAINT "reply_likes_reply_id_replies_id_fk";
--> statement-breakpoint
ALTER TABLE "search_users" DROP CONSTRAINT "search_users_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "search_users" DROP CONSTRAINT "search_users_search_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "user_info" DROP CONSTRAINT "user_info_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_actor_id_users_id_fk" FOREIGN KEY ("actor_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_comment_id_comments_id_fk" FOREIGN KEY ("comment_id") REFERENCES "public"."comments"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_reply_id_replies_id_fk" FOREIGN KEY ("reply_id") REFERENCES "public"."replies"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "comment_likes" ADD CONSTRAINT "comment_likes_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "comment_likes" ADD CONSTRAINT "comment_likes_comment_id_comments_id_fk" FOREIGN KEY ("comment_id") REFERENCES "public"."comments"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "comments" ADD CONSTRAINT "comments_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "comments" ADD CONSTRAINT "comments_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "likes" ADD CONSTRAINT "likes_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "likes" ADD CONSTRAINT "likes_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "posts" ADD CONSTRAINT "posts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "replies" ADD CONSTRAINT "replies_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "replies" ADD CONSTRAINT "replies_comment_id_comments_id_fk" FOREIGN KEY ("comment_id") REFERENCES "public"."comments"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reply_likes" ADD CONSTRAINT "reply_likes_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reply_likes" ADD CONSTRAINT "reply_likes_reply_id_replies_id_fk" FOREIGN KEY ("reply_id") REFERENCES "public"."replies"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "search_users" ADD CONSTRAINT "search_users_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "search_users" ADD CONSTRAINT "search_users_search_id_users_id_fk" FOREIGN KEY ("search_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_info" ADD CONSTRAINT "user_info_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;