CREATE TABLE `tasks` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`content` text,
	`completed` integer DEFAULT false NOT NULL,
	`created_at` text NOT NULL,
	`due_date` text,
	`priority` text DEFAULT 'medium' NOT NULL
);
