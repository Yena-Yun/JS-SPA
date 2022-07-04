import AbstractView from './AbstractView.js';

export default class extends AbstractView {
  constructor() {
    super();
    this.setTitle('Posts');
  }

  // 렌더링되는 html
  async getHtml() {
    return `
      <h1>Posts</h1>
      <p>You're viewing the posts!</p>
    `;
  }
}
