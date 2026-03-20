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
('Morning Thoughts', 'Woke up early and felt motivated.', 'Personal', '2026-03-18 08:30:00'),
('Work Progress', 'Completed backend API for diary app.', 'Work', '2026-03-18 14:00:00'),
('Evening Reflection', 'Had a relaxing walk in the park.', 'Personal', '2026-03-18 19:15:00'),

('Gym Day', 'Great workout session today!', 'Health', '2026-03-19 07:00:00'),
('Meeting Notes', 'Discussed project milestones with team.', 'Work', '2026-03-19 11:30:00'),
('Late Night Thoughts', 'Thinking about future goals.', 'Personal', '2026-03-19 23:45:00'),

('Weekend Plan', 'Planning a short trip this weekend.', 'Personal', '2026-03-20 10:00:00'),
('Coding Session', 'Worked on frontend UI improvements.', 'Work', '2026-03-20 15:20:00'),
('Dinner Time', 'Cooked a new recipe today.', 'Lifestyle', '2026-03-20 20:00:00');