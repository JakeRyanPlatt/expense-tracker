// DRILLS 1 & 2 — see BOOTCAMP.md
// CRUD + the data model for a tracked expense.

import { state } from "./state.js";
import { saveExpenses } from "./storage.js";

/**
 * @typedef {Object} Expense
 * @property {string} id - unique id, use crypto.randomUUID()
 * @property {string} name
 * @property {"hosting"|"saas"|"api"|"domains"|"other"} category
 * @property {number} amount - cost per billing cycle, in dollars
 * @property {"monthly"|"annual"|"one-time"} billingCycle
 * @property {string} startDate - ISO date string, YYYY-MM-DD
 * @property {string|null} nextRenewal - ISO date string, or null for one-time expenses
 * @property {string} notes
 */

/**
 * DRILL 1
 * Turn raw (already-validated) form values into an Expense object.
 *  - id: crypto.randomUUID()
 *  - amount: parseFloat it, formValues.amount arrives as a string
 *  - nextRenewal: compute from startDate + billingCycle
 *      monthly   -> startDate + 1 month
 *      annual    -> startDate + 1 year
 *      one-time  -> null
 *    (Date math gotcha worth learning: adding a month to Jan 31 naively can
 *    overflow into March. Decide how you want to handle that and note why.)
 *
 * @param {Object} formValues
 * @returns {Expense}
 */
export function createExpense(formValues) {
  throw new Error("TODO (Drill 1): implement createExpense — see BOOTCAMP.md");
}

/**
 * DRILL 1
 * Append an expense to state.expenses and persist via saveExpenses().
 * @param {Expense} expense
 * @returns {void}
 */
export function addExpense(expense) {
  throw new Error("TODO (Drill 1): implement addExpense — see BOOTCAMP.md");
}

/**
 * DRILL 2
 * Remove an expense by id from state.expenses and persist.
 * @param {string} id
 * @returns {void}
 */
export function deleteExpense(id) {
  throw new Error("TODO (Drill 2): implement deleteExpense — see BOOTCAMP.md");
}

/**
 * DRILL 2
 * If a recurring expense's nextRenewal has passed, roll it forward one (or
 * more, if the app hasn't been opened in a while) billing cycles so it's
 * always in the future. Leave one-time expenses untouched.
 * @param {Expense} expense
 * @returns {Expense} a new object — don't mutate the input
 */
export function rollRenewalForward(expense) {
  throw new Error("TODO (Drill 2): implement rollRenewalForward — see BOOTCAMP.md");
}
