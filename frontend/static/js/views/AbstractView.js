// 모든 페이지의 초기 세팅

export default class {
  constructor() {}

  // 페이지 title 변경
  setTitle(title) {
    document.title = title;
  }

  // 렌더링되는 html
  async getHtml() {
    // 백틱(``)으로 반환될 거라 빈 문자열로 초기화
    return '';
  }
}
