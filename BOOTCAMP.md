# scriptpost bootcamp

You have a working shell: HTML, CSS, storage, state, and wiring are all done
for you. Every feature function is a stub that throws a `TODO` error with
your current drill number in it — that error is your progress bar. Work the
drills in order; each one builds on the last.

## Running it

ES modules (`<script type="module">`) don't load over `file://` in most
browsers — you need a local static server:

```bash
npx --yes serve . -l 8080
```

Then open `http://localhost:8080`. Keep DevTools console open the whole
time — that's where your TODO errors and self-checks will show up.

## File map

| File | Role | Drills |
|---|---|---|
| `js/state.js`, `js/storage.js` | infra — done for you | — |
| `js/main.js` | wiring — done for you, calls into your code | — |
| `js/validate.js` | form validation | 1 |
| `js/expenses.js` | data model + CRUD | 1, 2 |
| `js/calculations.js` | pure math over expenses | 3, 4, 5, 6 |
| `js/render.js` | all DOM writes | 1, 2, 3, 4, 5, 6 |

Rule of thumb baked into this structure: `expenses.js` and `calculations.js`
never touch `document`. `render.js` never computes a total. Keep that
boundary — it's what makes the calculation functions testable from a console
one-liner instead of clicking through the UI every time.

---

## Drill 1 — Add an expense end to end

**Files:** `js/validate.js`, `js/expenses.js` (`createExpense`, `addExpense`),
`js/render.js` (`renderExpenseList`, basic rows, no delete button yet)

**Objective:** submitting the form creates an `Expense`, saves it, and shows
up in the table.

**Concepts practiced:** `FormData`, object validation without touching the
DOM, `crypto.randomUUID()`, date arithmetic, array mutation + persistence,
building a `<tr>` from data.

**Spec:**
1. `validateExpenseForm(formValues)` returns `{valid, errors}`. Required:
   non-empty `name`, `amount` parses to a finite number `> 0`, `startDate` is
   a valid date string.
2. `createExpense(formValues)` builds the `Expense` object (see the
   `@typedef` at the top of `expenses.js`). Compute `nextRenewal` from
   `startDate` + `billingCycle` — work out the right offset per cycle
   yourself; one-time expenses don't renew.
3. `addExpense(expense)` pushes into `state.expenses` and calls
   `saveExpenses(state.expenses)`.
4. `renderExpenseList(expenses)` clears `#expense-table-body` and renders one
   row per expense (name, category, amount as `$X.XX`, cycle, next renewal
   date or `—`). Toggle `#empty-state` when the list is empty.

**Acceptance criteria:**
- [ ] Submitting the form with a blank name shows an error and adds nothing.
- [ ] Submitting a valid monthly expense adds a row immediately, no reload.
- [ ] Refreshing the page — the expense is still there (localStorage).
- [ ] `#empty-state` is hidden once at least one expense exists.

**Self-check** (paste into the console after adding one monthly expense):
```js
JSON.parse(localStorage.getItem('scriptpost.expenses')).length > 0
```
Should print `true`.

**Hint:** for month/year math, `new Date(y, m, d)` auto-rolls overflowing
days into the next month — decide if that's the behavior you want for e.g.
Jan 31 + 1 month, and leave yourself a one-line comment explaining the
choice. There's no single "correct" answer here, just a documented one.

---

## Drill 2 — Delete + renewal rollover

**Files:** `js/expenses.js` (`deleteExpense`, `rollRenewalForward`),
`js/render.js` (delete button wiring)

**Objective:** you can remove an expense, and stale renewal dates catch up
to the present automatically when the app loads.

**Concepts practiced:** filtering arrays by id, event delegation vs.
per-row listeners, avoiding a circular-import trap, idempotent date math.

**Spec:**
1. `deleteExpense(id)` filters `state.expenses` down to everything except
   that id, then persists.
2. Each row's delete button, on click, should call `deleteExpense(id)` and
   then re-render. Since `render.js` needs to trigger a full re-render
   (`renderAll`, which lives in `main.js`, which imports `render.js`), a
   top-level `import` would be circular. Use a dynamic import inside the
   click handler instead: `const { renderAll } = await import("./main.js")`.
3. `rollRenewalForward(expense)` — if `nextRenewal` is in the past, advance
   it by billing-cycle increments until it's in the future (handles the app
   being closed for a while). Returns a new object, doesn't mutate the input.
   Call this over every recurring expense during `init()` in `main.js` — add
   that loop yourself, right after `state.expenses = loadExpenses()`.

**Acceptance criteria:**
- [ ] Clicking delete removes the row and updates localStorage.
- [ ] Manually editing an expense's `nextRenewal` in localStorage to a past
      date, then reloading the page, shows an updated future date.
- [ ] Deleting doesn't throw even if it's the last expense (empty state
      reappears).

**Self-check:**
```js
// after wiring the rollover loop into main.js's init()
const past = { ...JSON.parse(localStorage.getItem('scriptpost.expenses'))[0], nextRenewal: '2020-01-01' };
```
Then eyeball that after a reload, that expense's row shows a renewal date
in the future, not 2020.

---

## Drill 3 — Totals

**Files:** `js/calculations.js` (`monthlyCostOf`, `totalMonthlySpend`,
`totalAnnualSpend`), `js/render.js` (`renderSummary`)

**Objective:** the summary bar shows real monthly/annual numbers that update
live as you add/delete expenses.

**Concepts practiced:** `Array.reduce`, normalizing heterogeneous units to a
common one, `Intl.NumberFormat` (or manual `toFixed(2)`) for currency.

**Spec:** see the JSDoc in `calculations.js` for what each function receives
and returns. Figure out how to make monthly, annual, and one-time costs
comparable to each other yourself.

**Acceptance criteria:**
- [ ] Adding a monthly expense updates both the Monthly and Annual figures.
- [ ] Adding an annual expense updates both figures too, in a way you can
      justify by hand-checking the math against what's in the form.
- [ ] Adding a one-time expense updates Annual but leaves Monthly untouched.
- [ ] Deleting an expense brings both totals back down correctly.

**Self-check:** call `monthlyCostOf` and `totalAnnualSpend` directly from
the console on expenses you added yourself, and verify the numbers by hand
before trusting the UI.

---

## Drill 4 — Categories

**Files:** `js/calculations.js` (`spendByCategory`), `js/render.js`
(`renderCategoryBreakdown`)

**Objective:** a row of pills under the summary bar shows spend per
category, e.g. `Hosting $45.00`.

**Concepts practiced:** grouping/reducing into an object keyed by category,
generating DOM nodes from an object instead of an array.

**Acceptance criteria:**
- [ ] Two expenses in the same category combine into a single pill for that
      category, not two.
- [ ] An expense in a different category gets its own separate pill.
- [ ] Categories with $0 total don't render a pill.

---

## Drill 5 — Budget alerts

**Files:** `js/calculations.js` (`evaluateBudget`), `js/render.js`
(`renderBudgetStatus`)

**Objective:** setting a monthly budget in the footer visually flags when
projected monthly spend exceeds it.

**Concepts practiced:** deriving UI state (a CSS class) from a computed
value, handling the "not set" case distinctly from "$0".

**Spec:** `evaluateBudget(totalMonthly, budget)` returns
`{overBudget, remaining, percentUsed}`. Work out what each field should
hold and how to derive it from the two inputs — including what "no budget
set" should mean for each field.

**Acceptance criteria:**
- [ ] No budget set → `#summary-budget` shows "not set", no color class.
- [ ] Spend under budget → green-ish "under-budget" class (already styled
      in CSS), shows remaining amount.
- [ ] Spend over budget → red-ish "over-budget" class.

---

## Drill 6 — Upcoming renewals

**Files:** `js/calculations.js` (`upcomingRenewals`), `js/render.js`
(`highlightUpcomingRenewals`)

**Objective:** a banner appears above the form when something recurring
renews within 7 days.

**Concepts practiced:** date comparison/arithmetic in plain JS (no library),
conditionally rendering vs. clearing a container.

**Acceptance criteria:**
- [ ] An expense with `nextRenewal` = today + 3 days shows in the banner.
- [ ] An expense with `nextRenewal` = today + 30 days does not.
- [ ] One-time expenses (`nextRenewal: null`) never appear in the banner.
- [ ] Zero upcoming renewals → banner container is empty (CSS hides it).

---

## After all six

At this point you have a fully working tracker. Natural next exercises,
entirely optional and not scaffolded — you'd be extending the file
structure yourself:
- Edit-in-place instead of delete-and-re-add.
- Export/import as JSON for backup.
- Sort/filter the table by category or renewal date.
- Swap `alert`-style validation errors for inline per-field messages.
