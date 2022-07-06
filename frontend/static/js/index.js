// * history.pushState(state, title, URL)
// React에서의 페이지 전환은 react-router => history.push 사용
// Vanilla JS의 페이지 전환 => history.pushState

import Dashboard from './views/Dashboard.js'; // * 뒤에 꼭 '.js' 넣어주기 (안 넣으면 인식 못함)
import NotFound from './views/NotFound.js';
import Posts from './views/Posts.js';
import Settings from './views/Settings.js';

// 정규식으로 파라미터 나누기
const pathToRegex = (path) =>
  new RegExp('^' + path.replace(/\//g, '\\/').replace(/:\w+/g, '(.+)') + '$');

// 활성화된 페이지의 파라미터를 가져와서 배열에 담기
const getParams = (match) => {
  const values = match.result.slice(1);
  const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(
    (result) => result[1]
  );

  // Object.fromEntries
  // [['foo', 'bar'], ['baz', 42], ...] 2차원 배열 형태를
  // key: value 쌍의 객체로 만든다. ({ foo: 'bar', baz: 42, ...})
  return Object.fromEntries(
    keys.map((key, i) => {
      return [key, values[i]];
    })
  );
};

// 페이지 전환하는 함수
const navigateTo = (url) => {
  // 1) state: 페이지 전환 시 넘겨줄 데이터 (없으면 null)
  // 2) title: 변경할 브라우저 title (바꿀 필요 없으면 null)
  // 3) URL: 이동할 URL
  history.pushState(null, null, url);

  // 브라우저에서 페이지 이동 시에는 기본적으로 window.onpopstate라는 이벤트가 발생
  // But history.pushState는 이 이벤트가 발생하지 않는다.
  // * popstate 이벤트는 뒤로가기나 history.back()을 통해서만 발생
  // => history.pushState로 페이지를 전환하면 뒤로가기 버튼을 눌러도 라우터가 인식하지 못함(= 주소창의 URL만 바뀌고 실제 페이지 전환은 x)
  // history.pushState 사용 시 뒤로가기를 대비하여 router 함수도 같이 실행해 준다.
  router();
};

// * router 함수에 async 사용하는 이유
// async가 붙은 함수는 무조건 Promise 반환 (await가 붙으면 이 프라미스가 반환될 때까지 기다림)
// Promise는 콜백 지옥을 해결해주는 아이
// => 어떤 페이지에서는 렌더링 전에 서버단 요청을 먼저 받아야 할 경우 대비 (요청을 다 받을 때까지 기다림)
const router = async () => {
  const routes = [
    // 기존 view: 해당 페이지로 이동 시 출력할 콘솔
    // { path: '/', view: () => console.log('Viewing Dashboard') },
    // { path: '/posts', view: () => console.log('Viewing Posts') },
    // { path: '/settings', view: () => console.log('Viewing Settings') },
    // { path: '/404', view: () => console.log('Not Found') },

    // 수정된 view: 해당 페이지의 class를 바로 넣어줌 (HTML 렌더링은 class 내부의 getHtml 함수를 실행해야)
    { path: '/', view: Dashboard },
    { path: '/posts', view: Posts },
    // 파라미터가 추가되었을 경우의 posts route 추가
    { path: '/posts/:id/:something', view: Posts },
    { path: '/settings', view: Settings },
    { path: '/404', view: NotFound },
  ];

  // isMatch: 브라우저의 페이지 경로(location.pathname)와
  // 현재 route(route.path)가 일치하는지 여부(=> boolean 반환)
  // map: 배열의 요소를 조작한 뒤 '새로운 배열'을 반환
  const potentialMatches = routes.map((route) => {
    return {
      route: route, // 이해를 돕기 위해 둘 다 씀
      // isMatch: location.pathname === route.path,
      // result로 변경하고 정규식과 일치하는 pathname을 담는다.
      result: location.pathname.match(pathToRegex(route.path)),
    };
  });

  // 조작한 배열 potentialMatches에서 isMatch가 true인 요소만 따로 변수에 담기
  // let match = potentialMatches.find((potentialMatch) => potentialMatch.isMatch);
  // result(정규식과 일치하는 pathname)이 null이 아닌 경우 담기
  let match = potentialMatches.find(
    (potentialMatch) => potentialMatch.result !== null
  );

  // 일치하는 경로(페이지)가 없으면 404 페이지로 이동(= routes 배열의 맨 마지막 순서)
  if (!match) {
    match = {
      route: routes[routes.length - 1], // route = 404 페이지로 이동하는 routes의 객체
      // isMatch: true,
      // 404로 이동 후 result에는 해당 pathname 담기
      result: [location.pathname],
    };
  }

  // routes의 view 함수(각 페이지의 내용)를 실행시켜 콘솔에 출력
  // console.log(match.route.view());

  // 활성화된 view class를 따로 변수에 담기
  // * class도 함수처럼 '실행'시켜야 작동
  // * new 키워드를 앞에 붙여 객체로 만들기
  // const view = new match.route.view();

  // match 정보를 getParams에 보내 배열로 출력해서 view에 담기
  const view = new match.route.view(getParams(match));

  // index.html의 #app div에 view의 각 class의 getHtml 함수를 실행하여 페이지별 HTML을 렌더링한다.
  // ** 앞에 await를 붙여줘야 페이지가 모두 렌더링되고 나서 다른 로직들(예: 뒤로가기)이 실행됨
  document.querySelector('#app').innerHTML = await view.getHtml();
};

// * window의 popstate 이벤트: 뒤로가기나 새로고침 시 발생
// => 뒤로가기나 새로고침 시 해당 페이지로 이동하도록
window.addEventListener('popstate', router);

// DOM이 렌더링되면('DOMContentLoaded') 다음 실행
document.addEventListener('DOMContentLoaded', () => {
  // 클릭된 target 요소(e.target)에 'data-link' attribute가 있다면
  // (* e.target.matches('css 선택자 문자열'): css 선택자(id, class, attribute)를 포함한 HTML의 요소를 찾는다)
  document.body.addEventListener('click', (e) => {
    if (e.target.matches('[data-link]')) {
      e.preventDefault();
      // 클릭된 target 요소의 href를 navigateTo 함수에 전달하여 페이지 이동
      navigateTo(e.target.href);
    }
  });

  // data-link 요소가 없는 페이지도 라우팅 로직 필요
  router();
});
