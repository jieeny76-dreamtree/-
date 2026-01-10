
import React from 'react';
import { Calendar } from 'lucide-react';

const History: React.FC = () => {
  const events = [
    { 
      year: '2026 ~', 
      items: ['창원시 다함께돌봄센터 3호점 위탁운영'] 
    },
    { 
      year: '2025 ~', 
      items: ['창원시 비영리민간단체 공익활동 지원사업 단체선정'] 
    },
    { 
      year: '2024 ~', 
      items: ['창원시 다함께돌봄센터 7호점 위탁운영'] 
    },
    { 
      year: '2023', 
      items: [
        '비영리민간단체 변경등록(꿈뜨레 → 꿈뜨레지역공동체 / 11.08)',
        '단체명 변경 등록(삼계대동 작은도서관 → 꿈뜨레 / 05월)',
        '재미난 작은도서관 등록'
      ] 
    },
    { 
      year: '2021 ~ 2023', 
      items: ['우리마을 아이돌봄센터 운영'] 
    },
    { 
      year: '2019 ~', 
      items: ['양성평등사업지원단체 선정'] 
    },
    { 
      year: '2018 ~ 2021', 
      items: ['운영평가 우수도서관 선정', '공동체 활성화 단체 선정'] 
    },
    { 
      year: '2017', 
      items: [
        '비영리단체 등록(마산세무서 / 01.12)',
        '경남 우수봉사단체 장려상 수상'
      ] 
    },
    { 
      year: '2016', 
      items: ['삼계대동 작은도서관 등록 (12.22)'] 
    },
  ];

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="bg-purple-900 text-white px-8 py-12 text-center">
        <h2 className="text-3xl font-bold mb-2">연혁</h2>
        <p className="text-purple-200">꿈뜨레 지역공동체가 걸어온 소중한 발자취입니다.</p>
      </div>
      <div className="p-8 md:p-16">
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-yellow-100"></div>
          
          <div className="space-y-12">
            {events.map((event, idx) => (
              <div key={event.year} className={`relative flex flex-col md:flex-row items-center ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="flex-1 w-full hidden md:block"></div>
                
                {/* Center dot */}
                <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center w-10 h-10 bg-white border-4 border-yellow-400 rounded-full z-10 shadow-sm">
                  <Calendar className="h-4 w-4 text-purple-700" />
                </div>
                
                <div className={`flex-1 w-full pl-10 md:pl-0 ${idx % 2 === 0 ? 'md:pr-16 text-left md:text-right' : 'md:pl-16 text-left'}`}>
                  <h3 className="text-2xl font-black text-purple-900 mb-3">{event.year}</h3>
                  <div className="space-y-3">
                    {event.items.map((item, i) => (
                      <div key={i} className="text-gray-700 bg-gray-50 p-4 rounded-xl border border-gray-100 hover:border-purple-200 hover:bg-purple-50 transition-all duration-200">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
