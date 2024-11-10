import React, { useEffect } from "react";
import {Map} from "react-kakao-maps-sdk"

function Kakao() {
  var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
  var options = { //지도를 생성할 때 필요한 기본 옵션
    center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
    level: 3 //지도의 레벨(확대, 축소 정도)
  };

  var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
  return (
    <Map>
      center={{ lat: 33.450701, lng: 126.570667 }}
      style={{ width: '100%', height: '100%' }}
      level={3}
    </Map>
  )



  // useEffect(() => {
  //   const container = document.getElementById('map')
  //   const options = {
  //     center: new Kakao.maps.LatLng(33.450701, 126.570667),
  //     level: 3
  //   };
  //   const map = new Kakao.mapsMap(container, options);
  // }, [])
  // return (
  //   <div className="h-[600px] bg-gray-200 flex items-center justify-center rounded-lg">
  //   <span className="text-gray-500">지도 컴포넌트</span>
  // </div>
  // )
}
export default Kakao;