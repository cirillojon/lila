import * as xhr from 'common/xhr';
import debounce from 'debounce-promise';
import { initAll as initMiniBoards } from 'common/mini-board';

export function init() {
  const debounced = debounce((str: string) => {
    const q = str.trim();
    if (q)
      xhr.text(xhr.url('/opening', { q })).then((html: string) => {
        $('.opening__search__results').replaceWith(html);
        initMiniBoards();
      });
    else Promise.resolve();
  }, 150);
  $('.opening__search-form__input').on('input', e => {
    debounced((e.target as HTMLInputElement).value);
  });
}
