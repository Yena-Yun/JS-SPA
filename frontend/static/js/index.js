// 페이지 전환하기
const navigateTo = (url) => {
  // history.pushState(state, title, URL)
  // 바닐라 JS에서의 페이지 전환(= React의 react-router의 history.push)
  // state: 페이지 전환 시 넘겨줄 데이터 (없으면 null)
  // title: 변경할 브라우저 title (바꿀 필요 없으면 null)
  // URL: 이동할 URL
  history.pushState(null, null, url);

  // 페이지 이동 시에는 기본적으로 window.onpopstate라는 이벤트가 발생하지만
  // history.pushState 사용 시에는 이 이벤트가 발생하지 않는다.
  // (popstate 이벤트는 뒤로가기나 history.back()을 통해서만 발생)
  // 그래서 history.pushState로 페이지를 전환한 후에는 뒤로가기 버튼을 눌러도
  // 라우터가 인식하지 못한다(= 주소창의 URL만 바뀌고 실제로 페이지 전환은 되지 않음)
  //  => history.pushState을 쓰고 나면 사용자가 뒤로가기를 눌렀을 때를 대비해 router 함수도 같이 실행시켜 둔다.
  router();
};

// router 함수에 async를 사용하는 이유
// => 어떤 페이지에서는 렌더링 전에 서버단 요청을 먼저 받아야 하기 때문에 (요청을 다 받을 때까지 기다림)
const router = async () => {
  const routes = [
    { path: '/', view: () => console.log('Viewing Dashboard') },
    { path: '/posts', view: () => console.log('Viewing Posts') },
    { path: '/settings', view: () => console.log('Viewing Settings') },
    { path: '/404', view: () => console.log('Not Found') },
  ];

  // isMatch: 현재 route와 현재 페이지 경로가 일치하는지 여부 (boolean)
  // map: 배열의 요소를 조작하여 새로운 배열을 반환
  const potentialMatches = routes.map((route) => {
    return {
      route,
      isMatch: location.pathname === route.path,
    };
  });

  // isMatch가 true인 객체만 따로 변수에 담기
  let match = potentialMatches.find((potentialMatch) => potentialMatch.isMatch);

  // isMatch가 true인 객체가 없으면(= 페이지 중에 찾을 수 없으면)
  // Not Found('/404') 페이지로 이동
  if (!match) {
    match = {
      route: routes[routes.length - 1],
      isMatch: true,
    };
  }

  // routes의 view 함수(각 페이지의 내용) 콘솔에 출력
  console.log(match.route.view());
};

// 뒤로가기나 새로고침 시 popstate 이벤트 발생
//  => 뒤로 가거나 새로고침 한 페이지로 이동
window.addEventListener('popstate', router);

// DOM이 렌더링되면 다음을 실행
document.addEventListener('DOMContentLoaded', (e) => {
  // 클릭된 target element에 'data-link' attribute가 있다면
  // * e.target.matches(css선택자): css 선택자를 매칭하여 HTML의 특정 element를 찾는다
  if (e.target.matches('[data-link]')) {
    e.preventDefault();
    // 페이지 이동 실행
    navigateTo(e.target.href);
  }

  router();
});
