import AbstractView from './AbstractView.js'; // * 뒤에 꼭 '.js' 넣어주기 (안 넣으면 인식 못함)

export default class extends AbstractView {
  constructor() {
    super();
    this.setTitle('Dashboard');
  }

  // 렌더링되는 html
  async getHtml() {
    return `
      <h1>Welcome!</h1>
      <p>This is Dashboard page.</p>
      <a href="/posts" data-link>
        View recent posts
      </a>
    `;
  }
}
