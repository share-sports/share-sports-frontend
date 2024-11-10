'use client';

import React, { useState } from 'react';
import Header from '../components/Header';
import { UserPlus, CalendarDays, Trophy, Users, Shirt, PlaySquare, BarChart2 } from 'lucide-react';

export default function GuidePage() {
  const [openItems, setOpenItems] = useState({});

  const toggleAccordion = (item) => {
    setOpenItems((prev) => ({
      ...prev,
      [item]: !prev[item]
    }));
  };

  const sections = [
    {
      id: 'item-1',
      icon: UserPlus,
      title: '1. 회원가입과 로그인',
      content: [
        { title: '회원가입:', text: '간단하게 아이디, 비밀번호, 닉네임을 입력해 주세요. 아이디는 6-15자, 비밀번호는 6-20자, 닉네임은 2~10자 범위에서 입력하시면 됩니다.' },
        { title: '로그인:', text: '가입한 아이디와 비밀번호로 로그인할 수 있으며, 이후 로그인을 통해 다양한 서비스를 이용하실 수 있습니다.' }
      ]
    },
    {
      id: 'item-2',
      icon: CalendarDays,
      title: '2. 풋살장 예약하기',
      content: [
        { title: '구장 탐색:', text: '현재 위치를 기반으로 가까운 구장을 보여 드립니다. 다양한 구장을 지도에서 확인해 보세요.' },
        { title: '예약 절차:', list: ['원하는 구장을 선택하고, 사용 가능 시간대를 확인합니다.', '예약 가능한 시간대와 예상 비용이 표시되며, 예약이 완료되면 확인 메시지와 함께 예약 내역을 이메일과 앱 푸시 알림으로 받으실 수 있습니다.'] },
        { title: '예약 취소:', text: '예약 취소 시 수수료 안내와 함께 취소 정책을 확인할 수 있으며, 취소 후 알림이 제공됩니다.' }
      ]
    },
    {
      id: 'item-3',
      icon: Trophy,
      title: '3. 전적과 기록 확인하기',
      content: [
        { title: '선수 전적:', text: '지금까지 참여한 경기 수와 승/패 기록을 확인할 수 있습니다.' },
        { title: '득점 기록:', text: '누적 득점 기록을 쉽게 조회할 수 있습니다.' },
        { title: '과거 이용 기록:', text: '이전에 이용한 구장을 확인하여 재방문할 수 있습니다.' }
      ]
    },
    {
      id: 'item-4',
      icon: Users,
      title: '4. 인게임 방 생성과 초대',
      content: [
        { title: '방 생성:', text: '인게임에서 새로운 방을 만들어 친구들과 함께 게임을 즐길 수 있습니다. 방 이름, 공개/비공개 여부, 최대 인원 등을 자유롭게 설정할 수 있습니다.' },
        { title: '방 초대:', list: ['친구 목록에서 초대하고 싶은 플레이어를 선택하여 초대할 수 있으며, 비공개 방의 경우 초대 링크를 통해 입장 가능합니다.', '초대받은 플레이어는 알림을 받고, 수락하면 바로 방에 입장할 수 있습니다.'] }
      ]
    },
    {
      id: 'item-5',
      icon: Shirt,
      title: '5. 인게임 유니폼 설정',
      content: [
        { title: '유니폼 번호 등록:', text: 'QR 코드를 통해 방에 입장한 후 게임 중 착용할 유니폼 번호를 입력하세요. 유니폼 번호는 경기 중 사용자를 구별하고 기록하는 데 사용됩니다.' },
        { title: '유니폼 번호 관리:', text: '경기가 종료되면 유니폼 번호는 자동으로 초기화되며, 경기 기록이 저장됩니다.' }
      ]
    },
    {
      id: 'item-6',
      icon: PlaySquare,
      title: '6. 경기 시작 및 주요 이벤트 기록',
      content: [
        { title: '경기 시작:', text: '사용자가 경기 시작을 선언하면 경기 시작 시간이 기록되며 자동 녹화가 시작됩니다.' },
        { title: '소음 기록:', text: '경기 중 특정 소음(환호성 등)이 발생하는 순간이 기록되어 이후 분석에 활용될 수 있습니다.' },
        { title: '골 여부 체크:', text: 'AI가 실시간으로 골 장면을 확인하여 득점 여부를 판단합니다. 골이 발생하면 득점자의 유니폼 번호를 통해 기록됩니다.' }
      ]
    },
    {
      id: 'item-7',
      icon: BarChart2,
      title: '7. 골 기록 관리 및 통계 확인',
      content: [
        { title: '득점 및 경기 기록 집계:', list: ['경기와 관련된 다양한 정보를 바탕으로 개인 및 팀의 성과를 집계합니다.', '개인과 팀의 전적을 통계로 확인하여 성과를 쉽게 파악할 수 있습니다.'] },
        { title: '개인 및 팀 성과 시각화:', text: '경기 참여 수, 득점 수, 승리 수 등을 시각화하여 통계 데이터를 제공합니다.' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">풋살장 예약 및 경기 기록 관리 가이드</h1>
        <p className="text-lg text-center mb-12">
          풋살을 사랑하는 여러분을 위해 준비된 저희 서비스 사용 가이드를 안내해 드립니다.
          이 가이드를 통해 풋살장 예약부터 경기 기록 관리까지 쉽고 편리하게 이용해 보세요.
        </p>

        {sections.map((item) => (
          <div key={item.id} className="border-b">
            <button
              className="w-full text-left flex items-center p-4 text-lg font-semibold"
              onClick={() => toggleAccordion(item.id)}
            >
              {React.createElement(item.icon, { className: 'mr-2' })}
              {item.title}
            </button>
            {openItems[item.id] && (
              <div className="p-4 bg-gray-100">
                {item.content.map((section, idx) => (
                  <div key={idx} className="mb-4">
                    <h3 className="font-semibold mb-2">{section.title}</h3>
                    {section.text && <p>{section.text}</p>}
                    {section.list && (
                      <ul className="list-disc pl-5">
                        {section.list.map((point, index) => (
                          <li key={index}>{point}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        <div className="mt-12 border border-gray-300 rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold">즐거운 경기 되세요! ⚽</h3>
          <p className="mt-2">
            이제 이 가이드를 참고하여 풋살 활동을 더욱 편리하게 즐겨보세요! 예약, 경기 기록, 통계 등 모든 데이터를 안전하게 관리해 드리며,
            풋살 팬 여러분을 위한 최적의 환경을 제공합니다.
          </p>
        </div>
      </main>
    </div>
  );
}
