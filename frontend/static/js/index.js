// router 함수에 async를 사용하는 이유
// : 어떤 페이지에서는 렌더링 전에 서버단 요청을 먼저 받아야 하는 경우가 있기 때문
const router = async () => {
  const routes = [
    { path: '/', view: () => console.log('Viewing Dashboard') },
    { path: '/posts', view: () => console.log('Viewing Posts') },
    { path: '/settings', view: () => console.log('Viewing Settings') },
    { path: '/404', view: () => console.log('Not Found') },
  ];

  // 현재 route와 현재 페이지 경로가 일치하는지 여부를 isMatch에 true/false로 넣어서
  // 새 routes 배열 반환
  const potentialMatches = routes.map((route) => {
    return {
      route: route,
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

// DOM이 렌더링되면 router 함수 실행
document.addEventListener('DOMContentLoaded', () => {
  router();
});
