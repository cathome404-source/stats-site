// Angka Nusantara — hash router + page state (no framework, no network).
import { renderOverview } from './views-overview.js';
import { renderPopulation } from './views-population.js';
import { renderEconomy } from './views-economy.js';
import { renderHealth } from './views-health.js';
import { renderRegions } from './views-regions.js';
import { renderCompare } from './views-compare.js';

const regionsState = { query: '', sortKey: 'pop', sortDir: 'desc', selected: null };
const compareState = { a: 'DKI Jakarta', b: 'Jawa Barat' };

const ROUTES = {
  '': renderOverview,
  '#/': renderOverview,
  '#/population': renderPopulation,
  '#/economy': renderEconomy,
  '#/health': renderHealth,
  '#/regions': () => renderRegions(regionsState),
  '#/compare': () => renderCompare(compareState),
};

function currentRoute() {
  const hash = window.location.hash || '#/';
  return ROUTES[hash] ? hash : '#/';
}

function render() {
  const route = currentRoute();
  const app = document.getElementById('app');
  app.innerHTML = ROUTES[route]();
  document.querySelectorAll('.nav a').forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === route);
  });
  bind(route);
}

function bind(route) {
  if (route === '#/regions') {
    const search = document.getElementById('region-search');
    if (search) {
      search.addEventListener('input', () => {
        const caret = search.selectionStart;
        regionsState.query = search.value;
        render();
        // Re-render replaces the input; restore focus and caret so typing stays smooth.
        const again = document.getElementById('region-search');
        if (again) {
          again.focus();
          again.setSelectionRange(caret, caret);
        }
      });
    }
    document.querySelectorAll('th.sortable').forEach((th) => {
      th.addEventListener('click', () => {
        const key = th.getAttribute('data-sort');
        if (regionsState.sortKey === key) {
          regionsState.sortDir = regionsState.sortDir === 'asc' ? 'desc' : 'asc';
        } else {
          regionsState.sortKey = key;
          regionsState.sortDir = 'desc';
        }
        render();
      });
    });
    document.querySelectorAll('tr[data-name]').forEach((tr) => {
      tr.addEventListener('click', () => {
        regionsState.selected = tr.getAttribute('data-name');
        render();
      });
    });
  }

  if (route === '#/compare') {
    const selA = document.getElementById('compare-a');
    const selB = document.getElementById('compare-b');
    if (selA) {
      selA.addEventListener('change', () => {
        compareState.a = selA.value;
        render();
      });
    }
    if (selB) {
      selB.addEventListener('change', () => {
        compareState.b = selB.value;
        render();
      });
    }
  }
}

window.addEventListener('hashchange', render);
render();
