// 모든 페이지의 초기 세팅

export default class {
  constructor() {}

  // 페이지 title 변경
  setTitle(title) {
    document.title = title;
  }

  // 렌더링되는 html
  // (앞에 async: 나중에 페이지 렌더링하기 위해 함수 실행할 때 await 붙여서 비동기로 실행할 거라서)
  async getHtml() {
    // 백틱(``)으로 반환될 거라 빈 문자열로 초기화
    return '';
  }
}
