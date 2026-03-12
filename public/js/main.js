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

function initCardToggles() {
  document.querySelectorAll('.card-toggle[data-card-id]').forEach(toggle => {
    toggle.addEventListener('click', () => {
      toggleCard(toggle.dataset.cardId);
    });
  });
}

function initPracticeFlashcards() {
  const practiceData = document.getElementById('practiceData');
  const practiceShell = document.getElementById('practiceShell');
  if (!practiceData || !practiceShell) return;

  const interviews = JSON.parse(practiceData.textContent || '[]');
  if (!interviews.length) return;

  const setup = document.getElementById('practiceSetup');
  const session = document.getElementById('practiceSession');
  const roleSelect = document.getElementById('practiceRoleSelect');
  const companySelect = document.getElementById('practiceCompanySelect');
  const startButton = document.getElementById('practiceStartButton');
  const resetButton = document.getElementById('practiceReset');
  const error = document.getElementById('practiceError');
  const selectionSummary = document.getElementById('practiceSelectionSummary');
  const counter = document.getElementById('practiceCounter');
  const company = document.getElementById('practiceCompany');
  const role = document.getElementById('practiceRole');
  const question = document.getElementById('practiceQuestion');
  const frequency = document.getElementById('practiceFrequency');
  const tips = document.getElementById('practiceTips');
  const details = document.getElementById('practiceDetails');
  const toggle = document.getElementById('practiceToggle');
  const toggleIcon = document.getElementById('practiceToggleIcon');
  const prev = document.getElementById('practicePrev');
  const next = document.getElementById('practiceNext');

  let practiceSet = [];
  let currentIndex = 0;
  let isOpen = false;

  function renderStars(value) {
    frequency.innerHTML = '';
    for (let i = 1; i <= 5; i++) {
      const star = document.createElement('span');
      star.className = i <= value ? 'star star-filled' : 'star star-empty';
      star.textContent = '★';
      frequency.appendChild(star);
    }
  }

  function renderCard() {
    const interview = practiceSet[currentIndex];
    counter.textContent = `Question ${currentIndex + 1} of ${practiceSet.length}`;
    company.textContent = `🏢 ${interview.company || 'Community'}`;
    role.textContent = `💼 ${interview.role}`;
    question.textContent = interview.question;
    tips.textContent = interview.tips;
    renderStars(Number(interview.frequency) || 0);

    details.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', isOpen);
    toggleIcon.textContent = isOpen ? '⌃' : '⌄';

    prev.disabled = currentIndex === 0;
    next.disabled = currentIndex === practiceSet.length - 1;
  }

  toggle.addEventListener('click', () => {
    isOpen = !isOpen;
    renderCard();
  });

  prev.addEventListener('click', () => {
    if (currentIndex === 0) return;
    currentIndex -= 1;
    isOpen = false;
    renderCard();
  });

  next.addEventListener('click', () => {
    if (currentIndex === practiceSet.length - 1) return;
    currentIndex += 1;
    isOpen = false;
    renderCard();
  });

  function matchesSelection(interview, selectedRole, selectedCompany) {
    const roleMatches =
      selectedRole === '__random__' || interview.role === selectedRole;
    const companyMatches =
      selectedCompany === '__random__' || interview.company === selectedCompany;

    return roleMatches && companyMatches;
  }

  function getSelectionLabel(value, type) {
    if (value === '__random__') {
      return `Random ${type}`;
    }

    return value;
  }

  function startPractice() {
    const selectedRole = roleSelect.value;
    const selectedCompany = companySelect.value;

    practiceSet = interviews.filter(interview =>
      matchesSelection(interview, selectedRole, selectedCompany)
    );

    if (!practiceSet.length) {
      error.hidden = false;
      error.textContent = 'No practice questions match that combination yet. Try another role or company.';
      return;
    }

    error.hidden = true;
    currentIndex = 0;
    isOpen = false;
    selectionSummary.textContent = `${getSelectionLabel(selectedRole, 'role')} • ${getSelectionLabel(selectedCompany, 'company')}`;
    setup.hidden = true;
    session.hidden = false;
    renderCard();
  }

  function resetPractice() {
    session.hidden = true;
    setup.hidden = false;
    error.hidden = true;
    currentIndex = 0;
    isOpen = false;
    practiceSet = [];
  }

  startButton.addEventListener('click', startPractice);
  resetButton.addEventListener('click', resetPractice);
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
  initCardToggles();
  initPracticeFlashcards();
  initStarInput();
  initSearchForm();
  initNavToggle();
  initAlerts();
});
