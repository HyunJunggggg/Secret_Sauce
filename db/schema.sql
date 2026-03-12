-- Interview Secret Sauce Database Schema
-- Run this file to set up the database:
-- psql -U your_username -d interview_secret_sauce -f db/schema.sql

-- Create the interviews table
CREATE TABLE IF NOT EXISTS interviews (
  id SERIAL PRIMARY KEY,
  company VARCHAR(100) NOT NULL,
  role VARCHAR(100) NOT NULL,
  question TEXT NOT NULL,
  tips TEXT NOT NULL,
  stage VARCHAR(50) DEFAULT 'Technical Round',
  frequency INTEGER DEFAULT 3 CHECK (frequency BETWEEN 1 AND 5),
  author_name VARCHAR(100) DEFAULT 'Anonymous',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed data: sample interview entries
INSERT INTO interviews (company, role, question, tips, stage, frequency, author_name) VALUES
(
  'Google',
  'Software Engineer',
  'Tell me about yourself and why you want to work at Google.',
  'Focus on your journey and genuine reasons for wanting to work at Google. Research Google''s mission (organize the world''s information) and connect it to your values. Keep your answer under 2 minutes. Structure: past experience → what you learned → why Google fits your goals.',
  'Behavioral Round',
  5,
  'Alex K.'
),
(
  'Google',
  'Software Engineer',
  'How would you design a URL shortener like bit.ly?',
  'Cover the full system design: (1) Hash function — use MD5 or base62 encoding on an auto-increment ID for uniqueness. (2) Database schema: id, long_url, short_code, click_count, created_at. (3) Redirect logic: 301 (permanent, cached by browser) vs 302 (temporary, better for analytics). (4) Caching hot URLs with Redis. Mention scalability and handling collisions.',
  'Technical Round',
  5,
  'Alex K.'
),
(
  'Microsoft',
  'Software Engineer',
  'Reverse a linked list in place.',
  'Use three pointers: prev (null), curr (head), next (null). In the loop: save next = curr.next, point curr.next = prev, move prev = curr, move curr = next. Return prev as the new head. Walk through with a 3-node example on your whiteboard. Time O(n), Space O(1). Interviewer may ask for recursive version too.',
  'Technical Round',
  5,
  'Sam R.'
),
(
  'Amazon',
  'Product Manager',
  'Describe a time you had to make a decision with incomplete data.',
  'Use the STAR format: Situation, Task, Action, Result. Focus on how you identified the minimum viable data needed, the decision framework you used (risk analysis, cost-benefit), and what you learned. Amazon loves data-driven decisions — emphasize metrics and measurable outcomes. End with what you''d do differently.',
  'Behavioral Round',
  4,
  'Jordan T.'
),
(
  'Meta',
  'Data Analyst',
  'How would you measure the success of a new Facebook Marketplace feature?',
  'Start by clarifying the feature''s goal (GMV? DAU? Retention?). Then: (1) Define North Star metric (e.g. completed transactions). (2) Set up an A/B test with control/treatment groups. (3) Pick leading indicators (listing creation, search clicks) and lagging indicators (completed sales). (4) Add guardrail metrics to catch regressions (e.g. don''t tank session time). Always mention handling novelty effects by running the test long enough.',
  'Final Round',
  4,
  'Casey L.'
),
(
  'Shopify',
  'Backend Developer',
  'Explain the difference between SQL and NoSQL databases. When would you use each?',
  'SQL (relational): structured data, ACID compliance, joins across tables — great for financial records, user accounts, e-commerce orders. NoSQL: flexible schema, horizontal scaling — great for unstructured data, real-time analytics, content feeds. For Shopify specifically, mention that transactional data (orders, payments) needs SQL guarantees, while product catalogs with variable attributes could benefit from document stores like MongoDB.',
  'Technical Round',
  3,
  'Sam R.'
);
