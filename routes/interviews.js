const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const db = require('../db');

// ─── Validation Rules ─────────────────────────────────────────────────────────
const interviewValidation = [
  body('company')
    .trim()
    .notEmpty().withMessage('Company name is required')
    .isLength({ max: 100 }).withMessage('Company name must be under 100 characters'),
  body('role')
    .trim()
    .notEmpty().withMessage('Job role is required')
    .isLength({ max: 100 }).withMessage('Role must be under 100 characters'),
  body('question')
    .trim()
    .notEmpty().withMessage('Interview question is required')
    .isLength({ min: 10 }).withMessage('Question must be at least 10 characters'),
  body('tips')
    .trim()
    .notEmpty().withMessage('Tips or answer is required')
    .isLength({ min: 20 }).withMessage('Tips must be at least 20 characters'),
  body('author_name')
    .trim()
    .notEmpty().withMessage('Your name is required'),
  body('frequency')
    .isInt({ min: 1, max: 5 }).withMessage('Frequency must be between 1 and 5'),
  body('stage')
    .trim()
    .notEmpty().withMessage('Interview stage is required'),
];

// ─── GET /api/interviews — JSON API for HTML page ────────────────────────────
router.get('/api/interviews', async (req, res) => {
  try {
    const interviews = await db.query('SELECT * FROM interviews ORDER BY created_at DESC');
    const companies  = await db.query('SELECT DISTINCT company FROM interviews ORDER BY company');
    const roles      = await db.query('SELECT DISTINCT role FROM interviews ORDER BY role');
    const stats      = await db.query(`
      SELECT COUNT(*) AS total_interviews,
             COUNT(DISTINCT company) AS total_companies,
             COUNT(DISTINCT role) AS total_roles
      FROM interviews
    `);
    res.json({
      interviews: interviews.rows,
      companies:  companies.rows,
      roles:      roles.rows,
      stats:      stats.rows[0],
    });
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

// ─── GET / — Browse all interviews (with optional search/filter) ───────────────
router.get('/', async (req, res) => {
  try {
    const { search, company, role } = req.query;

    let query = 'SELECT * FROM interviews WHERE 1=1';
    const params = [];
    let paramCount = 1;

    if (search) {
      query += ` AND (question ILIKE $${paramCount} OR tips ILIKE $${paramCount + 1} OR company ILIKE $${paramCount + 2})`;
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
      paramCount += 3;
    }
    if (company) {
      query += ` AND LOWER(company) = LOWER($${paramCount})`;
      params.push(company);
      paramCount++;
    }
    if (role) {
      query += ` AND LOWER(role) = LOWER($${paramCount})`;
      params.push(role);
      paramCount++;
    }

    query += ' ORDER BY created_at DESC';

    const result = await db.query(query, params);

    // Get unique companies and roles for filter dropdowns
    const companiesResult = await db.query('SELECT DISTINCT company FROM interviews ORDER BY company');
    const rolesResult = await db.query('SELECT DISTINCT role FROM interviews ORDER BY role');

    // Get counts for stats
    const statsResult = await db.query(`
      SELECT
        COUNT(*) AS total_interviews,
        COUNT(DISTINCT company) AS total_companies,
        COUNT(DISTINCT role) AS total_roles
      FROM interviews
    `);

    res.render('index', {
      title: 'Browse Interviews',
      interviews: result.rows,
      companies: companiesResult.rows,
      roles: rolesResult.rows,
      stats: statsResult.rows[0],
      filters: { search: search || '', company: company || '', role: role || '' },
    });
  } catch (err) {
    console.error('Error fetching interviews:', err);
    res.status(500).render('error', {
      title: 'Database Error',
      message: 'Could not load interviews. Please try again.',
      statusCode: 500,
    });
  }
});

// ─── GET /submit — Show the submission form ───────────────────────────────────
router.get('/submit', (req, res) => {
  res.render('submit', {
    title: 'Share an Interview',
    errors: [],
    formData: {},
  });
});

// ─── POST /submit — Save new interview to database ────────────────────────────
router.post('/submit', interviewValidation, async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).render('submit', {
      title: 'Share an Interview',
      errors: errors.array(),
      formData: req.body,
    });
  }

  const { company, role, question, tips, stage, frequency, author_name } = req.body;

  try {
    await db.query(
      `INSERT INTO interviews (company, role, question, tips, stage, frequency, author_name)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [company.trim(), role.trim(), question.trim(), tips.trim(), stage, parseInt(frequency), author_name.trim()]
    );

    res.redirect('/?success=1');
  } catch (err) {
    console.error('Error inserting interview:', err);
    res.status(500).render('submit', {
      title: 'Share an Interview',
      errors: [{ msg: 'Failed to save. Please try again.' }],
      formData: req.body,
    });
  }
});

// ─── GET /contributions — My contributions page (all posts for editing) ───────
router.get('/contributions', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM interviews ORDER BY created_at DESC');
    res.render('contributions', {
      title: 'All Contributions',
      interviews: result.rows,
    });
  } catch (err) {
    console.error('Error fetching contributions:', err);
    res.status(500).render('error', {
      title: 'Database Error',
      message: 'Could not load contributions. Please try again.',
      statusCode: 500,
    });
  }
});

// ─── GET /interviews/:id/edit — Show edit form ────────────────────────────────
router.get('/interviews/:id/edit', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query('SELECT * FROM interviews WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).render('error', {
        title: 'Not Found',
        message: 'Interview not found.',
        statusCode: 404,
      });
    }

    res.render('edit', {
      title: 'Edit Interview',
      interview: result.rows[0],
      errors: [],
    });
  } catch (err) {
    console.error('Error fetching interview for edit:', err);
    res.status(500).render('error', {
      title: 'Database Error',
      message: 'Could not load the interview for editing.',
      statusCode: 500,
    });
  }
});

// ─── PUT /interviews/:id — Update an interview ────────────────────────────────
router.put('/interviews/:id', interviewValidation, async (req, res) => {
  const { id } = req.params;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const result = await db.query('SELECT * FROM interviews WHERE id = $1', [id]);
    return res.status(400).render('edit', {
      title: 'Edit Interview',
      interview: { ...result.rows[0], ...req.body, id },
      errors: errors.array(),
    });
  }

  const { company, role, question, tips, stage, frequency, author_name } = req.body;

  try {
    const result = await db.query(
      `UPDATE interviews
       SET company = $1, role = $2, question = $3, tips = $4,
           stage = $5, frequency = $6, author_name = $7, updated_at = CURRENT_TIMESTAMP
       WHERE id = $8
       RETURNING *`,
      [company.trim(), role.trim(), question.trim(), tips.trim(), stage, parseInt(frequency), author_name.trim(), id]
    );

    if (result.rowCount === 0) {
      return res.status(404).render('error', {
        title: 'Not Found',
        message: 'Interview not found.',
        statusCode: 404,
      });
    }

    res.redirect('/contributions?updated=1');
  } catch (err) {
    console.error('Error updating interview:', err);
    res.status(500).render('error', {
      title: 'Database Error',
      message: 'Could not update the interview. Please try again.',
      statusCode: 500,
    });
  }
});

// ─── DELETE /interviews/:id — Delete an interview ────────────────────────────
router.delete('/interviews/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query('DELETE FROM interviews WHERE id = $1 RETURNING id', [id]);

    if (result.rowCount === 0) {
      return res.status(404).render('error', {
        title: 'Not Found',
        message: 'Interview not found.',
        statusCode: 404,
      });
    }

    res.redirect('/contributions?deleted=1');
  } catch (err) {
    console.error('Error deleting interview:', err);
    res.status(500).render('error', {
      title: 'Database Error',
      message: 'Could not delete the interview. Please try again.',
      statusCode: 500,
    });
  }
});

module.exports = router;
