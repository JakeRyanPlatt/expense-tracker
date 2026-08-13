// DRILLS 3, 4, 5, 6 — see BOOTCAMP.md
// Pure math over an array of expenses. No DOM access in this file — that's
// the point of the drill: separate "what's the number" from "how it's shown".

/**
 * DRILL 3
 * Normalize a single expense's cost to a monthly figure.
 *  - monthly   -> amount as-is
 *  - annual    -> amount / 12
 *  - one-time  -> 0 (doesn't count toward recurring monthly spend)
 * @param {import('./expenses.js').Expense} expense
 * @returns {number}
 */
export function monthlyCostOf(expense) {
  throw new Error("TODO (Drill 3): implement monthlyCostOf — see BOOTCAMP.md");
}

/**
 * DRILL 3
 * @param {import('./expenses.js').Expense[]} expenses
 * @returns {number} sum of monthlyCostOf(e) across all expenses
 */
export function totalMonthlySpend(expenses) {
  throw new Error("TODO (Drill 3): implement totalMonthlySpend — see BOOTCAMP.md");
}

/**
 * DRILL 3
 * Annualized view: recurring monthly spend * 12, plus any one-time expenses
 * (since those are real dollars spent this year even though they don't recur).
 * @param {import('./expenses.js').Expense[]} expenses
 * @returns {number}
 */
export function totalAnnualSpend(expenses) {
  throw new Error("TODO (Drill 3): implement totalAnnualSpend — see BOOTCAMP.md");
}

/**
 * DRILL 4
 * @param {import('./expenses.js').Expense[]} expenses
 * @returns {Record<string, number>} category -> total monthly cost in that category
 */
export function spendByCategory(expenses) {
  throw new Error("TODO (Drill 4): implement spendByCategory — see BOOTCAMP.md");
}

/**
 * DRILL 5
 * @param {number} totalMonthly
 * @param {number|null} budget - null means "no budget set"
 * @returns {{overBudget: boolean, remaining: number|null, percentUsed: number|null}}
 */
export function evaluateBudget(totalMonthly, budget) {
  throw new Error("TODO (Drill 5): implement evaluateBudget — see BOOTCAMP.md");
}

/**
 * DRILL 6
 * Recurring expenses (not one-time) whose nextRenewal falls within the next
 * `withinDays` days from today, inclusive.
 * @param {import('./expenses.js').Expense[]} expenses
 * @param {number} withinDays
 * @returns {import('./expenses.js').Expense[]}
 */
export function upcomingRenewals(expenses, withinDays = 7) {
  throw new Error("TODO (Drill 6): implement upcomingRenewals — see BOOTCAMP.md");
}
