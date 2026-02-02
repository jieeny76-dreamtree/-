
import React, { useState } from 'react';
import { CreditCard, Heart, ClipboardCheck, Gift, Receipt, Settings, Save, X, Edit3 } from 'lucide-react';
import { useSettingsStore } from '../../store/settingsStore';

const AccountInfo: React.FC = () => {
  const { settings, updateSettings } = useSettingsStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(settings);

  // Sync edit form with settings when entering edit mode
  const startEditing = () => {
    setEditForm(settings);
    setIsEditing(true);
  };

  const handleSave = () => {
    updateSettings(editForm);
    setIsEditing(false);
    alert('계좌 정보가 성공적으로 변경되었습니다.');
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('계좌번호가 복사되었습니다.');
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="bg-purple-900 text-white px-8 py-16 text-center relative">
        <div className="absolute top-0 right-0 p-10 opacity-10">
          <Heart className="h-40 w-40" />
        </div>
        <h2 className="text-4xl font-bold mb-4 relative z-10">후원 계좌 안내</h2>
        <p className="text-purple-200 relative z-10 max-w-2xl mx-auto text-lg">
          보내주신 소중한 후원금은 지역사회의 아이들과 어르신, <br className="hidden md:block" />
          그리고 따뜻한 공동체를 만드는 모든 활동에 투명하게 사용됩니다.
        </p>
      </div>

      <div className="p-8 md:p-16">
        <div className="max-w-4xl mx-auto">
          {/* Main Account Card */}
          <div className="bg-gradient-to-br from-gray-50 to-white p-8 md:p-12 rounded-[2.5rem] border border-purple-100 shadow-xl shadow-purple-900/5 mb-8 relative overflow-hidden">
            {!isEditing ? (
              <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                <div className="flex items-center gap-6">
                  <div className="bg-purple-100 p-5 rounded-3xl">
                    <CreditCard className="h-10 w-10 text-purple-700" />
                  </div>
                  <div>
                    <p className="text-purple-600 font-bold text-sm uppercase tracking-wider mb-1">정기/일시 후원계좌</p>
                    <p className="text-3xl font-black text-gray-900">{settings.bankName}</p>
                  </div>
                </div>
                <div className="text-center md:text-right">
                  <p className="text-2xl md:text-3xl font-mono font-bold text-purple-900 mb-4 tracking-tighter">
                    {settings.accountNumber}
                  </p>
                  <button 
                    onClick={() => handleCopy(settings.accountNumber)}
                    className="bg-white text-purple-700 border-2 border-purple-100 px-6 py-2.5 rounded-full font-bold hover:bg-purple-700 hover:text-white hover:border-purple-700 transition-all shadow-sm flex items-center mx-auto md:ml-auto"
                  >
                    <ClipboardCheck className="mr-2 h-4 w-4" /> 계좌번호 복사하기
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6 relative z-10">
                <div className="flex items-center gap-2 mb-4 text-purple-700">
                  <Settings className="h-5 w-5 animate-spin-slow" />
                  <span className="font-bold">계좌 정보 수정 중</span>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-1 ml-1">은행명</label>
                    <input 
                      type="text" 
                      value={editForm.bankName}
                      onChange={(e) => setEditForm({...editForm, bankName: e.target.value})}
                      className="w-full px-4 py-3 bg-white border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-1 ml-1">예금주</label>
                    <input 
                      type="text" 
                      value={editForm.accountHolder}
                      onChange={(e) => setEditForm({...editForm, accountHolder: e.target.value})}
                      className="w-full px-4 py-3 bg-white border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none font-bold"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-1 ml-1">계좌번호</label>
                  <input 
                    type="text" 
                    value={editForm.accountNumber}
                    onChange={(e) => setEditForm({...editForm, accountNumber: e.target.value})}
                    className="w-full px-4 py-3 bg-white border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none font-mono text-xl font-bold"
                  />
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <button 
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-2.5 bg-gray-100 text-gray-500 rounded-full font-bold hover:bg-gray-200 transition-all flex items-center"
                  >
                    <X className="mr-2 h-4 w-4" /> 취소
                  </button>
                  <button 
                    onClick={handleSave}
                    className="px-8 py-2.5 bg-purple-700 text-white rounded-full font-bold hover:bg-purple-800 transition-all shadow-md flex items-center"
                  >
                    <Save className="mr-2 h-4 w-4" /> 변경사항 저장
                  </button>
                </div>
              </div>
            )}
            
            {!isEditing && (
              <div className="mt-8 pt-8 border-t border-purple-50 text-center">
                <p className="text-gray-500 font-medium">예금주: <span className="text-gray-900 font-bold">{settings.accountHolder}</span></p>
              </div>
            )}
          </div>

          {/* Admin Edit Button Trigger */}
          {!isEditing && (
            <div className="flex justify-center mb-16">
              <button 
                onClick={startEditing}
                className="text-gray-400 hover:text-purple-600 flex items-center text-sm font-medium transition-colors"
              >
                <Edit3 className="mr-1.5 h-3.5 w-3.5" /> 관리자: 계좌 정보 수정하기
              </button>
            </div>
          )}

          {/* Donation Types */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="p-8 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-yellow-100 rounded-2xl flex items-center justify-center mb-6">
                <Gift className="h-6 w-6 text-yellow-600" />
              </div>
              <h4 className="text-xl font-bold mb-3">정기 후원</h4>
              <p className="text-gray-600 leading-relaxed mb-4">
                매월 정기적인 나눔을 통해 꿈뜨레의 지속 가능한 활동을 지원합니다. 아이들의 안정적인 돌봄 환경 조성에 큰 힘이 됩니다.
              </p>
            </div>
            <div className="p-8 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <Receipt className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="text-xl font-bold mb-3">기부금 영수증</h4>
              <p className="text-gray-600 leading-relaxed mb-4">
                꿈뜨레 지역공동체는 지정기부금 단체로서, 후원해주신 모든 금액에 대해 법정 기부금 영수증 발행이 가능합니다. (연말정산 혜택)
              </p>
            </div>
          </div>

          {/* Guidelines */}
          <div className="bg-gray-50 p-8 rounded-3xl">
            <h4 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
              <div className="w-1.5 h-6 bg-purple-600 mr-3 rounded-full"></div>
              후원 참여 방법
            </h4>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <div className="shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
                <div>
                  <p className="font-bold text-gray-900">계좌 입금</p>
                  <p className="text-gray-500 text-sm">안내된 계좌번호로 후원금을 입금해 주세요.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
                <div>
                  <p className="font-bold text-gray-900">정보 확인 및 등록</p>
                  <p className="text-gray-500 text-sm">기부금 영수증 발행이 필요하신 분은 전화(055-232-5412)로 성함과 주민번호를 알려주세요.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
                <div>
                  <p className="font-bold text-gray-900">후원 소식 확인</p>
                  <p className="text-gray-500 text-sm">전달해주신 후원금이 어떻게 쓰였는지 '후원소식' 게시판을 통해 확인하실 수 있습니다.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;
