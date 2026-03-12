/* ═══════════════════════════════════════════════════
   Interview Secret Sauce — Client-Side JavaScript
   ═══════════════════════════════════════════════════ */

// ── Card expand/collapse ──────────────────────────────
function toggleCard(id) {
  const details = document.getElementById('details-' + id);
  const icon    = document.getElementById('icon-' + id);
  const toggle  = details.previousElementSibling; // .card-toggle

  const isOpen = details.classList.toggle('open');
  icon.textContent   = isOpen ? '⌃' : '⌄';
  icon.style.transform = isOpen ? 'rotate(0deg)' : '';
  toggle.setAttribute('aria-expanded', isOpen);
}

// ── Star rating input ─────────────────────────────────
function initStarInput() {
  const input = document.getElementById('frequency');
  const btns  = document.querySelectorAll('#starsInput .star-btn');
  const hint  = document.getElementById('freqHint');

  const hints = [
    'Rarely asked',
    'Sometimes asked',
    'Commonly asked',
    'Very frequently asked',
    'Asked in almost every interview'
  ];

  if (!input || !btns.length) return;

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const val = parseInt(btn.dataset.val);
      input.value = val;
      btns.forEach((b, i) => b.classList.toggle('star-active', i < val));
      if (hint) hint.textContent = hints[val - 1];
    });

    // Hover preview
    btn.addEventListener('mouseenter', () => {
      const val = parseInt(btn.dataset.val);
      btns.forEach((b, i) => {
        b.style.color = i < val ? '#EF9F27' : '';
      });
    });

    btn.addEventListener('mouseleave', () => {
      btns.forEach(b => { b.style.color = ''; });
    });
  });
}

// ── Auto-submit search form on filter change ──────────
function initSearchForm() {
  const companySelect = document.getElementById('company');
  const roleSelect    = document.getElementById('role');

  if (companySelect) {
    companySelect.addEventListener('change', () => {
      document.getElementById('searchForm').submit();
    });
  }
  if (roleSelect) {
    roleSelect.addEventListener('change', () => {
      document.getElementById('searchForm').submit();
    });
  }
}

// ── Delete confirmation ───────────────────────────────
function confirmDelete(company) {
  return confirm(`Are you sure you want to delete this ${company} interview post? This cannot be undone.`);
}

// ── Mobile nav toggle ─────────────────────────────────
function initNavToggle() {
  const toggle = document.getElementById('navToggle');
  const links  = document.getElementById('navLinks');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
  });

  // Close nav when a link is clicked
  links.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => links.classList.remove('open'));
  });
}

// ── Auto-dismiss alerts ───────────────────────────────
function initAlerts() {
  document.querySelectorAll('.alert').forEach(alert => {
    setTimeout(() => {
      alert.style.transition = 'opacity 0.5s';
      alert.style.opacity    = '0';
      setTimeout(() => alert.remove(), 500);
    }, 4000);
  });
}

// ── Init everything ───────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initStarInput();
  initSearchForm();
  initNavToggle();
  initAlerts();
});
