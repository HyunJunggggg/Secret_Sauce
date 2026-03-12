# 🥫 Interview Secret Sauce

> A full-stack web application where students share and browse real interview experiences — questions, tips, and answers — to help each other land the offer.

---

## 👥 Team Members & Task Contributions

| Member | Feature | Tasks Completed |
|--------|---------|-----------------|
| **[Member 1]** | Feature 1 — Submission Engine | Built the EJS form (`submit.ejs`) with all fields (Company, Role, Question, Tips, Stage, Frequency). Wrote the `POST /submit` Express route with server-side validation using `express-validator`. Designed the form layout in CSS. Set up the PostgreSQL `interviews` table schema (`db/schema.sql`). |
| **[Member 2]** | Feature 2 — Browse & Search | Wrote the `GET /` route with dynamic SQL `ILIKE` queries for search and `LOWER()` for company/role filters. Built the interview card layout in EJS (`index.ejs`) and CSS. Implemented the stats row (total interviews, companies, roles). Added the auto-submit filter dropdowns in JavaScript. |
| **[Member 3]** | Feature 3 — Edit/Delete & Global UI | Built the `GET /interviews/:id/edit`, `PUT /interviews/:id`, and `DELETE /interviews/:id` routes. Used `method-override` for PUT/DELETE from HTML forms. Created the Contributions page (`contributions.ejs`) and Edit page (`edit.ejs`). Built the responsive navbar, footer, and overall CSS theme. Ensured mobile responsiveness. |

---

## 🚀 How to Run the Application Locally

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or higher
- [PostgreSQL](https://www.postgresql.org/) v14 or higher
- npm (comes with Node.js)

### Step 1 — Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/interview-secret-sauce.git
cd interview-secret-sauce
```

### Step 2 — Install Dependencies

```bash
npm install
```

### Step 3 — Set Up the Database

Open your PostgreSQL shell (or pgAdmin) and run:

```sql
CREATE DATABASE interview_secret_sauce;
```

Then apply the schema and seed data:

```bash
psql -U your_postgres_username -d interview_secret_sauce -f db/schema.sql
```

### Step 4 — Configure Environment Variables

Copy the example environment file and fill in your credentials:

```bash
cp .env.example .env
```

Open `.env` and edit:

```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=interview_secret_sauce
DB_USER=your_postgres_username
DB_PASSWORD=your_postgres_password
PORT=3000
```

### Step 5 — Start the Server

```bash
# Production
npm start

# Development (auto-restarts on file changes)
npm run dev
```

### Step 6 — Open the App

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
interview-secret-sauce/
├── app.js                  # Express server entry point
├── package.json
├── .env.example            # Environment variable template
├── .gitignore
│
├── db/
│   ├── index.js            # PostgreSQL connection pool
│   └── schema.sql          # Table creation + seed data
│
├── routes/
│   └── interviews.js       # All CRUD route handlers
│
├── views/
│   ├── partials/
│   │   ├── header.ejs      # Navbar + <head>
│   │   └── footer.ejs      # Footer + scripts
│   ├── index.ejs           # Browse + search page
│   ├── submit.ejs          # Share interview form
│   ├── contributions.ejs   # All posts with edit/delete
│   ├── edit.ejs            # Edit interview form
│   └── error.ejs           # 404/500 error page
│
└── public/
    ├── css/
    │   └── style.css       # Full stylesheet
    └── js/
        └── main.js         # Client-side JS
```

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend structure | HTML5 via EJS templates |
| Styling | CSS3 (custom, no frameworks) |
| Client interactivity | Vanilla JavaScript |
| Server | Node.js + Express.js |
| Templating | EJS (Embedded JavaScript) |
| Database | PostgreSQL |
| Form validation | express-validator |
| HTTP method override | method-override |

---

## 🔑 Key Features

- **Browse & Search** — Filter interviews by keyword, company, or role using SQL `ILIKE` queries
- **Share an Interview** — Submit experiences with server-side validation; stored in PostgreSQL
- **Edit & Delete** — Full CRUD lifecycle via RESTful routes and `method-override`
- **Responsive Design** — Mobile-friendly layout with hamburger menu
- **Error Handling** — Graceful 404/500 error pages and inline form validation feedback
