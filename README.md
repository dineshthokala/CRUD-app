# CRUD App

A full-stack CRUD (Create, Read, Update, Delete) application with a React + Material UI frontend, an Express.js backend, and a managed PostgreSQL database (Render Postgres). The app is deployed with:
- **Frontend:** Vercel ([Live Demo](https://crud-app-pfpw.vercel.app))
- **Backend:** Render ([API Endpoint](https://crud-app-w5bo.onrender.com))
- **Database:** Render Managed PostgreSQL

---

## Features
- Modern dashboard UI with Material UI
- Add, edit, and delete items (with name and description)
- Persistent storage in PostgreSQL
- RESTful API endpoints
- Deployed and production-ready

---

## Project Structure

```
CRUD-app/
  backend/           # Express.js backend
    server.js        # Main server file
    package.json     # Backend dependencies
    .env             # Backend environment variables (not committed)
    render.yaml      # Render deployment config
  frontend/          # React frontend
    public/
      index.html     # React root HTML
    src/
      App.jsx        # Main React component
      index.js       # React entry point
    package.json     # Frontend dependencies
  vercel.json        # Vercel deployment config
```

---

## How the APIs Work

The backend exposes a RESTful API at `/api/items` for managing items. Each item has an `id`, `name`, and `description`.

### Endpoints

#### `GET /api/items`
- **Description:** Get all items
- **Response:**
  ```json
  [
    { "id": 1, "name": "Mangoes", "description": "Alphanso" },
    ...
  ]
  ```

#### `GET /api/items/:id`
- **Description:** Get a single item by ID
- **Response:**
  ```json
  { "id": 1, "name": "Mangoes", "description": "Alphanso" }
  ```

#### `POST /api/items`
- **Description:** Create a new item
- **Request Body:**
  ```json
  { "name": "Bananas", "description": "Sholapru" }
  ```
- **Response:**
  ```json
  { "id": 2, "name": "Bananas", "description": "Sholapru" }
  ```

#### `PUT /api/items/:id`
- **Description:** Update an existing item
- **Request Body:**
  ```json
  { "name": "Oranges", "description": "Nagpur" }
  ```
- **Response:**
  ```json
  { "id": 3, "name": "Oranges", "description": "Nagpur" }
  ```

#### `DELETE /api/items/:id`
- **Description:** Delete an item by ID
- **Response:**
  ```json
  { "success": true }
  ```

---

## How It Works

- The **frontend** (React) calls the backend API endpoints to fetch, create, update, and delete items.
- The **backend** (Express.js) handles API requests, interacts with the PostgreSQL database, and returns JSON responses.
- The **database** (PostgreSQL) stores all item data persistently.
- CORS is configured to allow requests from the deployed frontend domain.

---

## Local Development

1. **Clone the repo:**
   ```sh
   git clone https://github.com/dineshthokala/CRUD-app.git
   cd CRUD-app
   ```
2. **Backend:**
   - Install dependencies: `cd backend && npm install`
   - Set up a `.env` file with your Postgres credentials (see `.env.example`)
   - Start the server: `npm start`
3. **Frontend:**
   - Install dependencies: `cd ../frontend && npm install`
   - Start the React app: `npm start`
   - The app will run at [http://localhost:3000](http://localhost:3000)

---

## Deployment

- **Frontend:** Deploy to Vercel (auto-detects React, see `vercel.json`)
- **Backend:** Deploy to Render (see `render.yaml`)
- **Database:** Use Render Managed PostgreSQL (credentials in `.env` or Render dashboard)

---

## License

MIT
