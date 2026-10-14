/* ==========================================================
   Calvin John Camua - Portfolio
   Feature: dark / light mode toggle
   - Remembers the visitor's choice in the browser
   - Falls back to the device's own light/dark setting
   ========================================================== */

// Key used to save the chosen theme in the browser's localStorage
const STORAGE_KEY = 'portfolio-theme';

/**
 * Reads the theme the visitor chose last time.
 * Returns 'light', 'dark', or null if nothing was saved.
 * The try/catch keeps the page working if storage is blocked.
 */
function getSavedTheme() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch (error) {
    return null;
  }
}

/**
 * Saves the chosen theme so it is used on the next visit.
 * Fails quietly if the browser does not allow storage.
 */
function saveTheme(theme) {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch (error) {
    // Nothing to do: the theme simply will not be remembered
  }
}

/**
 * Decides which theme to show first:
 * 1. the saved choice, if there is one
 * 2. otherwise the device's dark/light preference
 */
function getStartingTheme() {
  const saved = getSavedTheme();

  if (saved === 'light' || saved === 'dark') {
    return saved;
  }

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
}

/**
 * Updates the toggle button so screen readers know the
 * current state and what pressing the button will do.
 */
function updateToggleButton(theme) {
  const button = document.getElementById('theme-toggle');

  // The button does not exist yet while the page is still loading
  if (!button) {
    return;
  }

  const isDark = theme === 'dark';
  button.setAttribute('aria-pressed', String(isDark));
  button.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
}

/**
 * Applies a theme to the whole page. The CSS reads the
 * data-theme attribute on <html> to swap its colors.
 */
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  updateToggleButton(theme);
}

/**
 * Runs when the toggle button is clicked.
 * Switches between light and dark, then saves the choice.
 */
function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';

  applyTheme(next);
  saveTheme(next);
}

// Apply the starting theme right away, before the page paints, to avoid a flash
applyTheme(getStartingTheme());

// Once the page has loaded, sync the button and listen for clicks
document.addEventListener('DOMContentLoaded', function () {
  const button = document.getElementById('theme-toggle');

  updateToggleButton(document.documentElement.getAttribute('data-theme'));

  if (button) {
    button.addEventListener('click', toggleTheme);
  }
});
