// DRILLS 1, 2, 3, 4, 5, 6 — see BOOTCAMP.md
// All DOM writes live here. Nothing in expenses.js or calculations.js should
// ever touch document.* — that boundary is intentional, keep it that way.

import { deleteExpense } from "./expenses.js";

/**
 * DRILL 1 (basic rows) / DRILL 2 (delete button wiring)
 * Render the full expense table body from scratch.
 *  - Clear #expense-table-body first
 *  - One <tr> per expense: name, category, amount (formatted as currency),
 *    billingCycle, nextRenewal (or "—" for one-time), and a delete button
 *  - Each delete button's click handler should:
 *      import { renderAll } from "./main.js" (dynamic import avoids a
 *      circular-import headache at module load time — see BOOTCAMP.md)
 *      call deleteExpense(id), then renderAll()
 *  - Toggle #empty-state's `hidden` attribute based on expenses.length
 * @param {import('./expenses.js').Expense[]} expenses
 * @returns {void}
 */
export function renderExpenseList(expenses) {
  throw new Error("TODO (Drill 1/2): implement renderExpenseList — see BOOTCAMP.md");
}

/**
 * DRILL 3
 * Write formatted currency into #summary-monthly and #summary-annual.
 * @param {number} monthlyTotal
 * @param {number} annualTotal
 * @returns {void}
 */
export function renderSummary(monthlyTotal, annualTotal) {
  throw new Error("TODO (Drill 3): implement renderSummary — see BOOTCAMP.md");
}

/**
 * DRILL 4
 * Render one .category-pill per category into #category-breakdown.
 * Skip categories with $0 spend.
 * @param {Record<string, number>} breakdown
 * @returns {void}
 */
export function renderCategoryBreakdown(breakdown) {
  throw new Error("TODO (Drill 4): implement renderCategoryBreakdown — see BOOTCAMP.md");
}

/**
 * DRILL 5
 * Update #summary-budget's text and toggle "over-budget" / "under-budget"
 * classes on #budget-card (see the CSS rules already written for you).
 * @param {{overBudget: boolean, remaining: number|null, percentUsed: number|null}} budgetStatus
 * @returns {void}
 */
export function renderBudgetStatus(budgetStatus) {
  throw new Error("TODO (Drill 5): implement renderBudgetStatus — see BOOTCAMP.md");
}

/**
 * DRILL 6
 * Render a .renewal-banner into #renewals-banner listing expenses renewing
 * soon. Clear the container entirely (not just hide it) when the list is
 * empty — the CSS hides `.renewals:empty` for you automatically.
 * @param {import('./expenses.js').Expense[]} soonExpenses
 * @returns {void}
 */
export function highlightUpcomingRenewals(soonExpenses) {
  throw new Error("TODO (Drill 6): implement highlightUpcomingRenewals — see BOOTCAMP.md");
}
