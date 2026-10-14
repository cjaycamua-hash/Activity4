const STORAGE_KEY = 'portfolio-theme';

function getSavedTheme() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch (error) {
    return null;
  }
}
function saveTheme(theme) {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch (error) {
  }
}


function getStartingTheme() {
  const saved = getSavedTheme();

  if (saved === 'light' || saved === 'dark') {
    return saved;
  }

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
}

function updateToggleButton(theme) {
  const button = document.getElementById('theme-toggle');

  if (!button) {
    return;
  }

  const isDark = theme === 'dark';
  button.setAttribute('aria-pressed', String(isDark));
  button.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  updateToggleButton(theme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';

  applyTheme(next);
  saveTheme(next);
}

applyTheme(getStartingTheme());

document.addEventListener('DOMContentLoaded', function () {
  const button = document.getElementById('theme-toggle');

  updateToggleButton(document.documentElement.getAttribute('data-theme'));

  if (button) {
    button.addEventListener('click', toggleTheme);
  }
});
