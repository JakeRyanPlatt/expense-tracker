// DRILL 1 — see BOOTCAMP.md
// Form validation. No DOM access here — pure functions in, data out.
// Keeping validation separate from the DOM is the habit this file is drilling.

/**
 * Validate raw form values before they become an Expense.
 * Rules to enforce (see BOOTCAMP.md Drill 1 for the full spec):
 *  - name: required, non-empty after trimming
 *  - amount: required, must parse to a finite number > 0
 *  - startDate: required, must be a valid date string
 *  - category / billingCycle: must be one of the values in the <select> options
 *
 * @param {Object} formValues - raw strings straight out of FormData
 * @returns {{valid: boolean, errors: string[]}}
 */
export function validateExpenseForm(formValues) {
  throw new Error("TODO (Drill 1): implement validateExpenseForm — see BOOTCAMP.md");
}
