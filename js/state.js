// Infrastructure layer — fully implemented, no drills here.
// A single mutable object every other module reads/writes as the in-memory
// mirror of what's in localStorage. No class, no framework — just an object.

export const state = {
  /** @type {import('./expenses.js').Expense[]} */
  expenses: [],
  /** @type {number|null} */
  budget: null,
};
