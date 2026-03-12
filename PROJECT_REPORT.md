# Project Report — Interview Secret Sauce

**Course:** Full Stack Web Development
**Submission Date:** March 22, 2026
**Team Members:** [Member 1], [Member 2], [Member 3]

---

## Purpose of the Application

Interview Secret Sauce is a community-driven web application that allows students to share and browse real interview experiences from companies like Google, Amazon, and Microsoft. Users can submit interview questions they were asked, along with detailed tips and sample answers, so that fellow students can better prepare. The platform addresses a real gap: most interview prep resources are generic, but this app surfaces specific, first-hand knowledge from people who have been through the exact same process.

---

## Technologies Used

The application is built as a full-stack web app using the following technologies. Node.js serves as the runtime environment, and Express.js handles HTTP routing and middleware. EJS (Embedded JavaScript) is used as the server-side templating engine to dynamically render HTML pages from database data. PostgreSQL is the relational database management system, storing all interview records in a single `interviews` table. On the front end, HTML and CSS structure and style the pages, while vanilla JavaScript adds interactivity such as expandable cards, a live star rating input, and auto-submitting filter dropdowns. The `express-validator` library handles server-side input validation, and `method-override` enables PUT and DELETE HTTP methods through standard HTML forms.

---

## Challenges Faced

The most significant technical challenge was implementing RESTful PUT and DELETE routes, since HTML forms only support GET and POST. Solving this required the `method-override` middleware and adding a hidden `_method` field to forms. A second challenge was building the dynamic search functionality: constructing a safe, parameterized PostgreSQL query that could optionally filter by keyword, company, and role simultaneously without SQL injection vulnerabilities required careful use of `pg`'s parameterized queries and a dynamic query builder in the route handler. A third challenge was managing the EJS template structure — correctly passing data from route handlers into partials (header/footer) so that the active navigation state could be highlighted on each page. Finally, making the UI fully responsive across mobile and desktop required extensive use of CSS Grid with `minmax` values and media queries.

---

## Lessons Learned

This project reinforced several key lessons. First, separating concerns between routes, views, and database logic from the start makes the codebase far easier to debug and extend. Second, server-side validation must never be skipped even if client-side validation exists — a malicious or misconfigured request can bypass the browser entirely. Third, using environment variables via `dotenv` for database credentials is essential security practice, and the `.env.example` pattern ensures teammates can onboard quickly without exposing real credentials. Finally, the group learned that Git branching per feature (one branch per team member's feature) significantly reduced merge conflicts and made code reviews more manageable.
