
import React from 'react';
import { Quote, Feather } from 'lucide-react';

const Greetings: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="bg-purple-900 text-white px-8 py-12 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold mb-2 relative z-10">대표인사말</h2>
        <p className="text-purple-200 relative z-10 font-light">"함께 돌보고, 함께 살아가는 지역을 꿈꾸며"</p>
      </div>
      <div className="p-8 md:p-12 lg:p-16 bg-[#f8f7f5]">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-12 mb-12">
            <div className="w-full md:w-1/3">
              <div className="relative">
                <div className="absolute -inset-4 bg-yellow-400 rounded-3xl -z-10 transform rotate-3 opacity-20"></div>
                <img 
                  src="https://picsum.photos/600/800?person=1" 
                  alt="Representative Lee Han-gi" 
                  className="w-full h-auto rounded-2xl shadow-lg border-8 border-white"
                />
              </div>
              <div className="mt-6 text-center">
                <p className="text-xl font-bold text-gray-900">이 한 기</p>
                <p className="text-gray-500 font-medium">꿈뜨레 지역공동체 대표</p>
              </div>
            </div>
            
            <div className="w-full md:w-2/3 bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-gray-50 relative">
              <Quote className="h-10 w-10 text-yellow-500 mb-6 opacity-30 absolute top-6 right-6" />
              
              <div className="space-y-6 text-gray-700 leading-relaxed text-base md:text-lg font-normal">
                <p className="font-bold text-purple-900 text-xl mb-6">
                  "함께 돌보고, 함께 살아가는 지역을 꿈꾸며"
                </p>
                
                <p>
                  안녕하십니까? 지역의 일상속에서 아이와 어르신, 이웃이 함께 웃을 수 있는 공동체를 꿈꾸며 한 걸음 한 걸음 걸어온 꿈뜨레 지역공동체가 소식지를 통해 여러분께 인사를 드립니다.
                </p>
                
                <p>
                  늘 변함없는 관심과 응원으로 함께 해 주신 지역 주민 여러분께 깊은 감사를 드립니다. 꿈뜨레 지역공동체는 <span className="font-semibold text-purple-800">창원시 다함께돌봄센터 7호점</span>을 운영하며, 아이들이 방과후에도 안전하고 따뜻한 돌봄 속에서 성장할 수 있도록 최선을 다하고 있습니다.
                </p>
                
                <p>
                  돌봄은 단순한 보호를 넘어 아이의 하루와 미래를 함께 책임지는 일이라는 믿음으로 배움과 쉼이 조화를 이루는 공간을 만들어가고 있습니다. 이러한 경험을 바탕으로, <span className="font-semibold text-purple-800">2026년 1월부터는 창원시 다함께돌봄센터 3호점</span>을 새롭게 운영하게 됩니다. 이는 꿈뜨레 지역공동체에게 또 하나의 책임이자 지역사회로부터 받은 신뢰의 결과라고 생각하며 더 많은 아이들과 가정이 질높은 돌봄을 누릴 수 있도록 현장의 목소리에 더욱 귀 기울이겠습니다.
                </p>
                
                <p>
                  꿈뜨레 지역공동체는 <span className="font-semibold text-purple-800">양성평등사업, 비영리민간단체공익활동지원사업</span>을 통해 세대와 세대를 잇고, 존중과 배려가 살아 있는 공동체문화를 만들어가고 있습니다.
                </p>
                
                <p>
                  앞으로도 꿈뜨레 지역공동체는 돌봄이 필요한 곳에 따뜻한 손길을 내밀고, 배움이 필요한 곳에 열린 마음으로 다가가며, 연대가 필요한 곳에 책임있는 주체로 서서, 아이가 안전하게 자라고, 어르신이 존중받으며, 이웃이 서로를 살피는 지속 가능한 지역사회를 향한 길을 흔들림 없이 걸어가겠습니다.
                </p>
              </div>

              <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col items-end">
                <p className="text-gray-500 mb-2">2025년 12월 20일</p>
                <div className="flex items-center space-x-4">
                  <span className="text-2xl font-bold text-gray-900 tracking-widest">대표 이 한 기</span>
                  <div className="w-12 h-12 border-2 border-red-200 rounded-full flex items-center justify-center text-red-500 font-serif text-xs transform -rotate-12">
                    (인)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Greetings;
