DROP TABLE IF EXISTS entries;

CREATE TABLE entries (
  post_id SERIAL PRIMARY KEY,
  title TEXT,
  content TEXT,
  category TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO entries (title, content, category)
VALUES 
('Test Entry', 'My new diary app', 'Personal');