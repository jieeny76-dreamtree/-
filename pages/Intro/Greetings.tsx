
import React from 'react';
import { Quote, Sparkles, Heart, Users, ShieldCheck, Flower2 } from 'lucide-react';

const Greetings: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Top Header Section */}
      <div className="bg-purple-900 text-white px-8 py-16 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
          </svg>
        </div>
        <div className="relative z-10">
          <span className="inline-block bg-yellow-400 text-purple-900 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-4">Message from Representative</span>
          <h2 className="text-3xl md:text-4xl font-black mb-3 leading-tight">대표 인사말</h2>
          <p className="text-purple-200 font-light text-lg italic">"꿈을 심고 행복을 가꾸는 따뜻한 울타리가 되겠습니다."</p>
        </div>
      </div>

      <div className="p-8 md:p-16 lg:p-24 bg-[#fcfbf9]">
        <div className="max-w-4xl mx-auto">
          {/* Main Letter Content */}
          <div className="flex flex-col gap-12">
            
            {/* Professional Intro with Quote */}
            <div className="relative">
              <Quote className="h-16 w-16 text-yellow-500 mb-6 opacity-20 absolute -top-8 -left-8" />
              <h3 className="text-2xl md:text-3xl font-black text-purple-900 leading-tight mb-8">
                아이들이 웃고, 이웃이 소통하며,<br/>
                마을 전체가 하나의 가족이 되는 세상을 꿈꿉니다.
              </h3>
              
              <div className="space-y-8 text-gray-700 leading-relaxed text-lg font-normal">
                <p>
                  안녕하십니까? 꿈뜨레 지역공동체 대표 <span className="font-bold text-gray-900">이한기</span>입니다.
                </p>
                
                <p>
                  꿈뜨레 지역공동체는 <strong>'꿈을 심는 뜰(Yard)'</strong>이라는 뜻을 품고 있습니다. 
                  우리가 살고 있는 이 지역사회가 단순히 거주하는 공간을 넘어, 우리 아이들이 마음껏 꿈을 꾸고 그 꿈이 건강하게 자라날 수 있는 비옥한 토양이 되기를 바라는 마음으로 첫발을 내디뎠습니다.
                </p>

                <p>
                  현대 사회의 급격한 변화 속에서 우리는 많은 것을 얻었지만, 소중한 '이웃'과 '공동체'라는 가치를 잃어가고 있습니다. 
                  특히 맞벌이 가구의 증가와 돌봄의 공백은 우리 아이들에게 정서적 외로움을, 부모님들에게는 막중한 부담을 안겨주고 있습니다. 
                  꿈뜨레 지역공동체는 이러한 시대적 과제 앞에 <strong>'마을 돌봄'</strong>이라는 해답을 제시하고자 합니다.
                </p>

                {/* Core Values Section */}
                <div className="grid md:grid-cols-3 gap-6 my-12 pt-8 border-t border-purple-50">
                  <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-purple-50">
                    <Heart className="h-8 w-8 text-purple-600 mx-auto mb-4" />
                    <h4 className="font-bold text-gray-900 mb-2">따뜻한 공존</h4>
                    <p className="text-sm text-gray-500">누구도 소외되지 않는 포용적인 마을</p>
                  </div>
                  <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-purple-50">
                    <ShieldCheck className="h-8 w-8 text-purple-600 mx-auto mb-4" />
                    <h4 className="font-bold text-gray-900 mb-2">안전한 성지</h4>
                    <p className="text-sm text-gray-500">믿고 맡길 수 있는 돌봄 시스템</p>
                  </div>
                  <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-purple-50">
                    <Users className="h-8 w-8 text-purple-600 mx-auto mb-4" />
                    <h4 className="font-bold text-gray-900 mb-2">함께하는 성장</h4>
                    <p className="text-sm text-gray-500">이웃과 이웃이 서로를 키우는 연대</p>
                  </div>
                </div>

                <p>
                  현재 저희 공동체는 <span className="bg-yellow-100 px-1 font-bold text-purple-900">창원시 다함께돌봄센터 7호점</span>을 운영하며 아이들의 방과 후 일상을 책임지고 있습니다. 
                  단순한 보호를 넘어, 다양한 체험 활동과 정서적 교감을 통해 아이들이 자존감을 회복하고 사회성을 기를 수 있도록 돕고 있습니다. 
                </p>

                <p>
                  또한, 다가오는 <span className="text-purple-800 font-bold underline underline-offset-4 decoration-yellow-400">2026년에는 다함께돌봄센터 3호점</span> 운영을 새롭게 시작하게 되었습니다. 
                  이는 그동안 꿈뜨레가 보여준 진정성에 대해 지역사회가 보내준 신뢰의 결과라 생각합니다. 
                  우리는 이 신뢰에 보답하기 위해 더욱 세심하고 전문적인 돌봄 체계를 구축해 나갈 것입니다.
                </p>

                <p>
                  꿈뜨레 지역공동체는 아동 돌봄뿐만 아니라 <strong>양성평등 사업, 비영리민간단체 공익활동 지원사업</strong> 등을 통해 지역 전체의 건강한 문화를 만들어가고 있습니다. 
                  아이부터 노인까지, 여성과 남성 모두가 존중받는 사회, 그것이 꿈뜨레가 궁극적으로 그리는 마을의 풍경입니다.
                </p>

                <p>
                  우리의 발걸음은 혼자서 갈 수 없습니다. 
                  주민 여러분의 따뜻한 관심과 참여, 그리고 후원자분들의 소중한 나눔이 모일 때 비로소 '꿈뜨레'라는 정원은 꽃을 피울 수 있습니다. 
                  여러분과 함께 걷고 싶습니다. 언제든 열려 있는 소통의 공간에서 여러분의 목소리를 듣겠습니다.
                </p>

                <p className="text-xl font-bold text-purple-900 mt-12">
                  감사합니다. 꿈뜨레 지역공동체는 오늘도 우리 마을의 행복한 내일을 위해 정성을 다하겠습니다.
                </p>
              </div>

              {/* Final Signature Section */}
              <div className="mt-20 pt-12 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex items-center gap-4 text-gray-500">
                  <Flower2 className="h-10 w-10 text-yellow-400 opacity-50" />
                  <p className="text-sm">꿈뜨레 지역공동체는 <br/>경상남도 비영리민간단체 등록(제1261호) 기관입니다.</p>
                </div>
                <div className="flex flex-col items-end">
                  <p className="text-gray-500 text-lg mb-2 font-medium">2025년 2월의 어느 날</p>
                  <div className="flex items-center gap-4">
                    <span className="text-gray-400 text-sm font-bold uppercase tracking-widest">Representative</span>
                    <span className="text-4xl font-black text-gray-900 tracking-tighter">이 한 기</span>
                    <div className="relative w-16 h-16 flex items-center justify-center">
                       <div className="absolute inset-0 border-2 border-red-500 rounded-full opacity-30 transform rotate-12"></div>
                       <span className="text-red-600 font-serif font-bold text-xl -rotate-12">印</span>
                    </div>
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
