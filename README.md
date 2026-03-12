# 🥫 Interview Secret Sauce

> A full-stack web application where students share and browse real interview experiences — questions, tips, and answers — to help each other land the offer.

---

## 👥 Team Members & Task Contributions

| Member | Feature | Tasks Completed |
|--------|---------|-----------------|
| **Hyunjung** | Feature 1 — Submission Engine & Database Setup | Set up the PostgreSQL database schema (`db/schema.sql`) and connection pool (`db/index.js`). Built the EJS submission form (`submit.ejs`) with all fields — Company, Role, Question, Tips, Stage, and Frequency star rating. Wrote the `POST /submit` Express route with server-side validation using `express-validator`. Configured the `.env` environment setup and overall project structure. |
| **Mai** | Feature 2 — Browse & Search | Wrote the `GET /` route with dynamic parameterized SQL queries using `ILIKE` for keyword search and `LOWER()` for company/role filtering. Built the interview card layout in EJS (`index.ejs`) with expandable answer sections. Implemented the stats row displaying total interviews, companies, and roles fetched from the database. Added the API route (`GET /api/interviews`) for the HTML landing page. |
| **Pat** | Feature 3 — Edit & Delete (CRUD) | Built the `GET /interviews/:id/edit`, `PUT /interviews/:id`, and `DELETE /interviews/:id` Express routes. Used `method-override` middleware to support PUT and DELETE from standard HTML forms. Created the Contributions page (`contributions.ejs`) and Edit page (`edit.ejs`) with pre-filled form data loaded from PostgreSQL. Handled graceful error responses for missing records. |
| **Rosie** | Global UI & Frontend | Designed and built the full CSS stylesheet (`style.css`) including the navbar, footer, card layout, form styles, and responsive mobile design. Created the HTML landing page (`public/index.html`). Built the client-side JavaScript (`main.js`) for card toggling, star rating input, mobile nav, and auto-dismissing alerts. Ensured consistent UI and user experience across all pages. |


---

## 🚀 How to Run the Application Locally

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or higher
- [PostgreSQL](https://www.postgresql.org/) v14 or higher
- pgAdmin 4

---

### Step 1 — Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME
npm install
```

---

### Step 2 — Set Up the Database
1. Open **pgAdmin 4**
2. In the left sidebar, right-click **Databases** → **Create** → **Database**
3. Enter `Secret_Sauce` as the database name → click **Save**
4. Click on `Secret_Sauce` to select it
5. Go to **Tools** → **Query Tool**
6. Open the file `db/schema.sql` from the project folder, copy the entire contents, and paste it into the Query Tool
7. Click the **▶️ Run** button to create the table and insert sample data

---

### Step 3 — Configure Environment Variables
1. In the project folder, create a new file called `.env`
2. Open `.env` and fill in your own credentials:
 
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=Secret_Sauce
DB_USER=postgres
DB_PASSWORD=your_postgres_password
PORT=3000
```

---

### Step 4 — Start the Server
```bash
npm run dev
```

---

### Step 5 — Open the App
Visit [http://localhost:3000](http://localhost:3000) in your browser ✅

---

## 📁 Project Structure

```
interview-secret-sauce/
├── app.js                  # Express server entry point
├── package.json
├── .env           
├── .gitignore
│
├── db/
│   ├── index.js            # PostgreSQL connection pool
│   └── schema.sql          # Table creation + seed data
│
├── routes/
│   └── interviews.js       # All CRUD route handlers + API
│
├── views/
│   ├── partials/
│   │   ├── header.ejs      # Navbar + head
│   │   └── footer.ejs      # Footer + scripts
│   ├── index.ejs           # Browse + search page
│   ├── submit.ejs          # Share interview form
│   ├── edit.ejs            # Edit interview form
│   └── error.ejs           # 404/500 error page
│
└── public/
    ├── index.html          # HTML landing page
    ├── css/
    │   └── style.css       # Full stylesheet
    └── js/
        └── main.js         # Client-side JavaScript
```

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend structure | HTML5 + EJS templates |
| Styling | CSS3 (custom, no frameworks) |
| Client interactivity | Vanilla JavaScript |
| Server | Node.js + Express.js |
| Templating | EJS (Embedded JavaScript) |
| Database | PostgreSQL |
| Form validation | express-validator |
| HTTP method override | method-override |

---

## 🔑 Key Features

- **Browse & Search** — Filter interviews by keyword, company, or role using SQL ILIKE queries
- **Share an Interview** — Submit experiences with server-side validation; stored in PostgreSQL
- **Edit & Delete** — Full CRUD lifecycle via RESTful routes and method-override
- **Responsive Design** — Mobile-friendly layout with hamburger menu
- **Error Handling** — Graceful 404/500 error pages and inline form validation feedback
