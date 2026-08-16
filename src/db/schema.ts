import { pgTable, serial, text, timestamp, boolean, integer, jsonb } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uid: text('uid').notNull().unique(),
  email: text('email').notNull(),
  name: text('name'),
  role: text('role').default('admin'),
  createdAt: timestamp('created_at').defaultNow()
});

export const activities = pgTable('activities', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  programmeId: text('programme_id').notNull(),
  date: text('date').notNull(),
  location: text('location').notNull(),
  description: text('description').notNull(),
  beneficiariesCount: integer('beneficiaries_count').default(0),
  womenCount: integer('women_count').default(0),
  childrenCount: integer('children_count').default(0),
  outcomes: text('outcomes'),
  challenges: text('challenges'),
  imageUrl: text('image_url'),
  status: text('status').default('published'),
  authorEmail: text('author_email'),
  createdAt: timestamp('created_at').defaultNow()
});

export const programmes = pgTable('programmes', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  category: text('category').notNull(),
  beneficiariesTarget: integer('beneficiaries_target').default(0),
  icon: text('icon'),
  createdAt: timestamp('created_at').defaultNow()
});

export const galleryPhotos = pgTable('gallery_photos', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  category: text('category').notNull(),
  url: text('url').notNull(),
  caption: text('caption'),
  createdAt: timestamp('created_at').defaultNow()
});

export const contactMessages = pgTable('contact_messages', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email'),
  phone: text('phone'),
  subject: text('subject'),
  message: text('message').notNull(),
  read: boolean('read').default(false),
  createdAt: timestamp('created_at').defaultNow()
});

export const websiteContent = pgTable('website_content', {
  section: text('section').primaryKey(),
  content: jsonb('content').notNull(),
  updatedAt: timestamp('updated_at').defaultNow()
});
