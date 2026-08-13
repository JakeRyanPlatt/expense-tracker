// Infrastructure layer — fully implemented, no drills here.
// Thin wrapper around localStorage so the rest of the app never touches it directly.

const STORAGE_KEYS = {
  EXPENSES: "scriptpost.expenses",
  BUDGET: "scriptpost.budget",
};

export function loadExpenses() {
  const raw = localStorage.getItem(STORAGE_KEYS.EXPENSES);
  return raw ? JSON.parse(raw) : [];
}

export function saveExpenses(expenses) {
  localStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(expenses));
}

export function loadBudget() {
  const raw = localStorage.getItem(STORAGE_KEYS.BUDGET);
  return raw ? JSON.parse(raw) : null;
}

export function saveBudget(amount) {
  localStorage.setItem(STORAGE_KEYS.BUDGET, JSON.stringify(amount));
}
