# 📝 Bridget Jones Diary App

## Overview

A personal diary web application that allows users to create, view, update, delete, and search diary entries. Built using **Node.js (Express)**, **HTML/CSS**, and **PostgreSQL**, following the **MVC architecture**.

---

## Getting Started

### Prerequisites

- Node.js
- NPM
- PostgreSQL (local or cloud-based such as Supabase)
- Docker (optional, if using a containerised database)

---

## Installation

1. Clone the repository
   - Run:
     ```bash
     git clone https://github.com/ShubhraTripathi-tech/bridget-jones-diary.git
     ```

2. Navigate to the project directory
   - Run:
     ```bash
     cd bridget-jones-diary
     ```

3. Install dependencies
   - Install packages:

   ```bash

   npm install
   ```

4. Setup your database
   - Create a database instance on [Supabase](https://supabase.com/) (or other cloud-based database hosting platforms)
   - Retrieve the database URL & copy it
   - Create a `.env` file in the root directory with the following:

     ```
     DB_URL=<your_database_url>
     ```

   - Replace `<your_database_url>` with the database URL you just copied
   - Run `npm run setup-db` to setup the database

5. Setup your port
   - Add A `PORT` key assigned to the port of your choice in your `.env` file

     ```
     PORT=<port-of-your-choice>
     ```

6. Run the server
   - Run `npm run dev` to run the server in development mode
   - Run `npm start` to run the server in production mode

---

## Database Schema

### `entries` Table

```
post_id: Primary Key
title: String, not null
content: Text, not null
category: String, not null
created_at: Timestamp, default current timestamp
```

---

## API Endpoints

All available API endpoints with their methods and descriptions.

### Base URL

`http://localhost:<port>/api/diaries` (or your deployed URL)

---

### API Endpoints

| Method | Endpoint | Description                     |
| ------ | -------- | ------------------------------- |
| GET    | /        | Retrieve all diary entries      |
| GET    | /:id     | Retrieve a single diary entry   |
| POST   | /        | Create a new diary entry        |
| PATCH  | /:id     | Update a diary entry            |
| DELETE | /:id     | Delete a diary entry            |
| GET    | /search  | Search diary entries by filters |

---

## Get All Diary Entries

### Example Request

To retrieve all entries in the diary, you can use the following GET request - `GET /`

`curl -X GET http://localhost:<port>/api/diaries`

### Example Response

A successful response will return a JSON array of diary entry objects, similar to the following:

```json
[
  {
    "id": 1,
    "title": "Morning Reflection",
    "content": "Today I felt productive.",
    "category": "Personal",
    "created_at": "2026-03-20T08:30:00.000Z"
  },
  {
    "id": 2,
    "title": "Work Update",
    "content": "Finished my backend API.",
    "category": "Work",
    "created_at": "2026-03-19T14:00:00.000Z"
  }
]
```

## Get a Single Diary Entry

### Example Response

Retrieve a specific entry by ID:

```json
curl -X GET http://localhost:<port>/api/diaries/1

{
  "id": 1,
  "title": "Morning Reflection",
  "content": "Today I felt productive.",
  "category": "Personal",
  "created_at": "2026-03-20T08:30:00.000Z"
}
```

## Create New Diary Entry

### Example Request and Response

```json
curl -X POST http://localhost:<port>/api/diaries \
-H "Content-Type: application/json" \
-d '{
  "title": "Evening Thoughts",
  "content": "Had a relaxing day at home.",
  "category": "Personal",
  "created_at": "2026-03-20T19:00:00.000Z"
}'

{
  "id": 3,
  "title": "Evening Thoughts",
  "content": "Had a relaxing day at home.",
  "category": "Personal",
  "created_at": "2026-03-20T19:00:00.000Z"
}
```

## Update Diary Entry

### Example Request and Response

```json
curl -X PATCH http://localhost:<port>/api/diaries/3 \
-H "Content-Type: application/json" \
-d '{
  "title": "Evening Thoughts Updated",
  "content": "Had a productive day at home.",
  "category": "Personal"
}'

{
  "id": 3,
  "title": "Evening Thoughts Updated",
  "content": "Had a productive day at home.",
  "category": "Personal",
  "created_at": "2026-03-20T19:00:00.000Z"
}
```

## Delete Diary Entry

### Example Request

```json
curl -X DELETE http://localhost:<port>/api/diaries/3
```

## Search Diary Entries

### Example Request and Response

```json
curl -X GET "http://localhost:<port>/api/diaries/search?category=Work&year=2026&month=3"

[
  {
    "id": 2,
    "title": "Work Update",
    "content": "Finished my backend API.",
    "category": "Work",
    "created_at": "2026-03-19T14:00:00.000Z"
  }
]
```
