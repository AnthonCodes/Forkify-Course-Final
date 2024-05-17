import View from './View';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerclick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkupButton(btn, curPage) {
    const nextPg = curPage + 1;
    const prevPg = curPage - 1;
    if (btn === 'next')
      return `<button data-goto="${nextPg}" class="btn--inline pagination__btn--next">
    <span>Page ${nextPg}</span>
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-right"></use>
    </svg>
  </button>`;

    if (btn === 'prev')
      return `
    <button data-goto = "${prevPg}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${prevPg}</span>
          </button>
  `;
  }

  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    const curPage = this._data.page;

    //pg1 theres other pages
    if (curPage === 1 && numPages > 1) {
      return this._generateMarkupButton('next', curPage);
    }

    //last page
    if (curPage === numPages && numPages > 1) {
      return this._generateMarkupButton('prev', curPage);
    }
    //other page
    if (curPage < numPages) {
      return `${this._generateMarkupButton('next', curPage)}
${this._generateMarkupButton('prev', curPage)}`;
    }
    //Pg.1 no other pages
    return '';
  }
}

export default new PaginationView();
