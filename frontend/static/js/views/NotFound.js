import AbstractView from './AbstractView.js';

export default class extends AbstractView {
  constructor() {
    super();
    this.setTitle('Not Found');
  }

  // 렌더링되는 html
  async getHtml() {
    return `
      <p>404 Not Found!</p>
    `;
  }
}
