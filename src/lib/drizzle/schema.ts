import {
  index,
  json,
  pgEnum,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
  unique,
  uniqueIndex,
  uuid,
  varchar,
  boolean,
} from "drizzle-orm/pg-core";

export const providerEnum = pgEnum("provider_enum", [
  "credentials",
  "github",
  "google",
  "facebook",
]);

export const notifEnum = pgEnum("notif_enum", [
  "follow",
  "like",
  "reply",
  "comment",
  "save",
]);

export const genderEnum = pgEnum("gender_enum", ["male", "female"]);

export const typeContentEnum = pgEnum("type_content", ["image", "video"]);

type PostContentUrl = {
  type: "image" | "video";
  url: string;
  publicId: string;
};

export const StoriesTable = pgTable(
  "stories",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => UsersTable.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    type: typeContentEnum("type").notNull(),
    url: text("url").notNull(),
    publicId: text("public_id").notNull(),
  },
  (table) => [index("index_user_id_of_stories_table").on(table.userId)],
);

export const StoryWatchers = pgTable(
  "story_watchers",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => UsersTable.id, { onDelete: "cascade" }),
    storyId: uuid("story_id")
      .notNull()
      .references(() => StoriesTable.id, { onDelete: "cascade" }),
  },
  (table) => [
    primaryKey({
      name: "composite_pk_story_watchers_table",
      columns: [table.storyId, table.userId],
    }),
  ],
);

export const SavedPostsTable = pgTable(
  "saved_posts",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => UsersTable.id, { onDelete: "cascade" }),
    postId: uuid("post_id")
      .notNull()
      .references(() => PostsTable.id, { onDelete: "cascade" }),
  },
  (table) => [
    primaryKey({
      name: "composite_pk_saved_posts_table",
      columns: [table.postId, table.userId],
    }),
  ],
);

export const EmailVerificationRequestTable = pgTable(
  "email_verification_request",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => UsersTable.id, { onDelete: "cascade" }),
    code: text("code").notNull(),
    email: varchar("email").notNull(),
    expiresAt: timestamp("expires_at")
      .$defaultFn(() => new Date(Date.now() + 1000 * 60 * 10))
      .notNull(),
  },
  (table) => [index("user_id_index").on(table.userId)],
);

export const PasswordResetRequestTable = pgTable(
  "password_reset_request",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => UsersTable.id, { onDelete: "cascade" }),
    code: text("code").notNull(),
    expiresAt: timestamp("expires_at")
      .$defaultFn(() => new Date(Date.now() + 1000 * 60 * 10))
      .notNull(),
  },
  (table) => [index().on(table.userId)],
);

export const SearchUsersTable = pgTable(
  "search_users",
  {
    userId: uuid("user_id")
      .references(() => UsersTable.id, { onDelete: "cascade" })
      .notNull(),
    searchId: uuid("search_id")
      .references(() => UsersTable.id, { onDelete: "cascade" })
      .notNull(),
  },
  (table) => [
    primaryKey({ name: "pk", columns: [table.searchId, table.userId] }),
    index("relations_search_users_user_idx").on(table.userId),
    index("relations_search_users_search_idx").on(table.searchId),
  ],
);

export const UserInfoTable = pgTable(
  "user_info",
  {
    id: serial("id").primaryKey(),
    userId: uuid("user_id")
      .references(() => UsersTable.id, { onDelete: "cascade" })
      .notNull(),
    website: varchar("website"),
    occupation: varchar("occupation"),
    bio: text("bio"),
    gender: genderEnum("gender"),
  },
  (table) => [uniqueIndex("userIndex").on(table.userId)],
);

export const NotificationsTable = pgTable("notifications", {
  id: serial("id").primaryKey(),
  type: notifEnum("type").notNull(),
  userId: uuid("user_id")
    .references(() => UsersTable.id, { onDelete: "cascade" })
    .notNull(),
  actorId: uuid("actor_id")
    .references(() => UsersTable.id, { onDelete: "cascade" })
    .notNull(),
  postId: uuid("post_id").references(() => PostsTable.id, {
    onDelete: "cascade",
  }),
  commentId: uuid("comment_id").references(() => CommentsTable.id, {
    onDelete: "cascade",
  }),
  replyId: uuid("reply_id").references(() => RepliesTable.id, {
    onDelete: "cascade",
  }),
  isRead: boolean("is_read").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const FollowingsTable = pgTable(
  "followings_table",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => UsersTable.id, { onDelete: "cascade" }),
    followId: uuid("follow_id")
      .notNull()
      .references(() => UsersTable.id, { onDelete: "cascade" }),
  },
  (table) => [
    primaryKey({ columns: [table.userId, table.followId] }),
    index("relations_user_idx").on(table.userId),
    index("relations_follow_idx").on(table.followId),
  ],
);

export const UsersTable = pgTable(
  "users",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name").notNull(),
    username: varchar("username").notNull(),
    email: varchar("email").notNull(),
    avatar: text("avatar"),
    password: text("password"),
    provider: providerEnum("provider").notNull(),
    verifiedAt: timestamp("verified_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    isProtected: boolean("is_protected").default(false).notNull(),
  },
  (table) => [
    uniqueIndex("usernameIndex").on(table.username),
    uniqueIndex("emailIndex").on(table.email),
    unique("emailAndProvider").on(table.email, table.provider),
  ],
);

export const PostsTable = pgTable("posts", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => UsersTable.id, { onDelete: "cascade" }),
  description: text("description"),
  location: varchar("location"),
  urls: json("urls").$type<PostContentUrl[]>().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const PostLikesTable = pgTable(
  "likes",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => UsersTable.id, { onDelete: "cascade" }),
    postId: uuid("post_id")
      .notNull()
      .references(() => PostsTable.id, { onDelete: "cascade" }),
  },
  (table) => [primaryKey({ columns: [table.userId, table.postId] })],
);

export const CommentsTable = pgTable("comments", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => UsersTable.id, { onDelete: "cascade" }),
  postId: uuid("post_id")
    .notNull()
    .references(() => PostsTable.id, { onDelete: "cascade" }),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const CommentLikesTable = pgTable(
  "comment_likes",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => UsersTable.id, { onDelete: "cascade" }),
    commentId: uuid("comment_id")
      .notNull()
      .references(() => CommentsTable.id, { onDelete: "cascade" }),
  },
  (table) => [primaryKey({ columns: [table.commentId, table.userId] })],
);

export const RepliesTable = pgTable("replies", {
  id: uuid("id").primaryKey().defaultRandom(),
  message: text("message").notNull(),
  userId: uuid("user_id")
    .notNull()
    .references(() => UsersTable.id, { onDelete: "cascade" }),
  commentId: uuid("comment_id")
    .notNull()
    .references(() => CommentsTable.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const ReplyLikesTable = pgTable(
  "reply_likes",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => UsersTable.id, { onDelete: "cascade" }),
    replyId: uuid("reply_id")
      .notNull()
      .references(() => RepliesTable.id, { onDelete: "cascade" }),
  },
  (table) => [primaryKey({ columns: [table.replyId, table.userId] })],
);
