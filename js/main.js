// Infrastructure layer — fully implemented, no drills here.
// Wires the DOM to state/storage and orchestrates re-renders. This file
// calls straight into your stub functions, so until you implement each
// drill, interacting with the app will throw the corresponding TODO error
// in the console — that's your progress indicator.

import { state } from "./state.js";
import { loadExpenses, saveExpenses, loadBudget, saveBudget } from "./storage.js";
import { createExpense, addExpense } from "./expenses.js";
import {
  totalMonthlySpend,
  totalAnnualSpend,
  spendByCategory,
  evaluateBudget,
  upcomingRenewals,
} from "./calculations.js";
import {
  renderExpenseList,
  renderSummary,
  renderCategoryBreakdown,
  renderBudgetStatus,
  highlightUpcomingRenewals,
} from "./render.js";
import { validateExpenseForm } from "./validate.js";

export function renderAll() {
  renderExpenseList(state.expenses);

  const monthlyTotal = totalMonthlySpend(state.expenses);
  const annualTotal = totalAnnualSpend(state.expenses);
  renderSummary(monthlyTotal, annualTotal);

  renderCategoryBreakdown(spendByCategory(state.expenses));
  renderBudgetStatus(evaluateBudget(monthlyTotal, state.budget));
  highlightUpcomingRenewals(upcomingRenewals(state.expenses, 7));
}

function wireForm() {
  const form = document.getElementById("expense-form");
  const errorEl = document.getElementById("form-error");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());

    const { valid, errors } = validateExpenseForm(data);
    if (!valid) {
      errorEl.textContent = errors.join(" ");
      return;
    }
    errorEl.textContent = "";

    const expense = createExpense(data);
    addExpense(expense);
    form.reset();
    renderAll();
  });
}

function wireBudget() {
  const input = document.getElementById("budget-input");
  const saveBtn = document.getElementById("budget-save");

  if (state.budget != null) input.value = state.budget;

  saveBtn.addEventListener("click", () => {
    const value = parseFloat(input.value);
    state.budget = Number.isFinite(value) ? value : null;
    saveBudget(state.budget);
    renderAll();
  });
}

function init() {
  state.expenses = loadExpenses();
  state.budget = loadBudget();
  wireForm();
  wireBudget();
  renderAll();
}

init();
