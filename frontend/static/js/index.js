// router 함수에 async를 사용하는 이유
// : 어떤 페이지에서는 렌더링 전에 서버단 요청을 먼저 받아야 하는 경우가 있기 때문
const router = async () => {
  const routes = [
    { path: '/', view: () => console.log('Viewing Dashboard') },
    { path: '/posts', view: () => console.log('Viewing Posts') },
    { path: '/settings', view: () => console.log('Viewing Settings') },
    { path: '/404', view: () => console.log('Not Found') },
  ];

  // 현재 route와 현재 페이지 경로가 일치하는지 테스트
  const potentialMatches = routes.map((route) => {
    return {
      route: route,
      isMatch: location.pathname === route.path,
    };
  });

  // potentialMatches 배열의 객체 중에 isMatch가 true인 객체만 따로 변수에 담기
  let match = potentialMatches.find((potentialMatch) => potentialMatch.isMatch);

  // routes 중에 isMatch와 일치하는 객체가 없으면(= 찾을 수 없는 페이지이면)
  // 404 페이지로 이동
  if (!match) {
    match = {
      route: routes[routes.length - 1],
      isMatch: true,
    };
  }

  // routes의 view 함수 콘솔에 출력
  console.log(match.route.view());
};

// DOM이 렌더링되면 router 함수 실행
document.addEventListener('DOMContentLoaded', () => {
  router();
});
