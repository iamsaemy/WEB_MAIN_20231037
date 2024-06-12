var mapContainer = document.getElementById('map'), // 지도를 표시할 div
    mapOption = {
        center: new kakao.maps.LatLng(37.63269412567669, 126.7011459298951), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };

var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성

// 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성
var mapTypeControl = new kakao.maps.MapTypeControl();
map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

// 지도 확대 축소를 제어할 수 있는 줌 컨트롤을 생성
var zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

// 장소 검색 객체를 생성
var ps = new kakao.maps.services.Places();

// 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성
var infowindow = new kakao.maps.InfoWindow({ zindex: 1 });

// 검색 버튼 클릭 이벤트
document.getElementById('searchButton').addEventListener('click', function () {
    var keyword = document.getElementById('search').value;

    if (!keyword.trim()) {
        alert('키워드를 입력해주세요!');
        return;
    }

    // 장소 검색 객체를 통해 키워드로 장소를 검색
    ps.keywordSearch(keyword, placesSearchCB);
});

// 장소 검색 완료 시 호출되는 콜백 함수
function placesSearchCB(data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {
        // 첫 번째 검색 결과를 지도 중심으로 설정
        var place = data[0];
        var coords = new kakao.maps.LatLng(place.y, place.x);
        map.setCenter(coords);

        // 마커를 지도에 표시
        var marker = new kakao.maps.Marker({
            map: map,
            position: coords
        });

        // 인포윈도우를 마커 위에 표시
        infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
        infowindow.open(map, marker);
    } else {
        alert('검색 결과가 존재하지 않습니다.');
    }
}
