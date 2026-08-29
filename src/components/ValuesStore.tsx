import React, { useState, useEffect } from 'react';
import { VALUES_LIST } from '../data/curriculumData';
import { ValueCard } from '../types';
import { ShoppingBag, Sparkles, Gift, CheckCircle, ArrowLeft, HeartHandshake, Check, Trash2 } from 'lucide-react';
import { loadSavedState, saveState } from '../utils/storage';

interface BorrowedItem {
  id: string;
  valueName: string;
  icon: string;
  friendName: string;
  commitmentNote: string;
  date: string;
}

interface ValuesStoreProps {
  onSelectForTicket?: (val: ValueCard) => void;
}

export const ValuesStore: React.FC<ValuesStoreProps> = ({ onSelectForTicket }) => {
  const [selectedCardId, setSelectedCardId] = useState<string | null>(() =>
    loadSavedState<string | null>('store_selected_card_id', null)
  );
  const [borrowFromFriendName, setBorrowFromFriendName] = useState<string>(() =>
    loadSavedState<string>('store_friend_name', '')
  );
  const [commitmentNote, setCommitmentNote] = useState<string>(() =>
    loadSavedState<string>('store_commitment_note', '')
  );
  const [borrowedSuccess, setBorrowedSuccess] = useState<boolean>(() =>
    loadSavedState<boolean>('store_borrowed_success', false)
  );
  const [borrowedHistory, setBorrowedHistory] = useState<BorrowedItem[]>(() =>
    loadSavedState<BorrowedItem[]>('store_borrowed_history', [
      {
        id: 'hist_demo_1',
        valueName: 'الشجاعة والصدق الأدبي',
        icon: '🦁',
        friendName: 'سعد التميمي',
        commitmentNote: 'سأبادر بالاعتراف بالخطأ فوراً ولن أنسب إنجاز غيري لنفسي.',
        date: 'اليوم',
      },
    ])
  );

  const selectedCard = VALUES_LIST.find((v) => v.id === selectedCardId) || null;

  useEffect(() => {
    saveState('store_selected_card_id', selectedCardId);
  }, [selectedCardId]);

  useEffect(() => {
    saveState('store_friend_name', borrowFromFriendName);
  }, [borrowFromFriendName]);

  useEffect(() => {
    saveState('store_commitment_note', commitmentNote);
  }, [commitmentNote]);

  useEffect(() => {
    saveState('store_borrowed_success', borrowedSuccess);
  }, [borrowedSuccess]);

  useEffect(() => {
    saveState('store_borrowed_history', borrowedHistory);
  }, [borrowedHistory]);

  const handleBorrow = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCard || !borrowFromFriendName.trim() || !commitmentNote.trim()) return;

    const newItem: BorrowedItem = {
      id: `borrow_${Date.now()}`,
      valueName: selectedCard.name,
      icon: selectedCard.icon,
      friendName: borrowFromFriendName.trim(),
      commitmentNote: commitmentNote.trim(),
      date: 'الآن',
    };

    setBorrowedHistory((prev) => [newItem, ...prev]);
    setBorrowedSuccess(true);
  };

  const resetBorrow = () => {
    setSelectedCardId(null);
    setBorrowFromFriendName('');
    setCommitmentNote('');
    setBorrowedSuccess(false);
  };

  const removeBorrowedItem = (id: string) => {
    setBorrowedHistory((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="w-full space-y-6 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="bg-white border border-slate-200/90 p-6 sm:p-8 rounded-3xl text-center space-y-3 shadow-sm relative overflow-hidden">
        <div className="flex items-center justify-center gap-2 flex-wrap">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-100">
            <ShoppingBag className="w-4 h-4" />
            <span>ورشة استعارة القيم (المرحلة 1 و 2)</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
            <Check className="w-3.5 h-3.5" />
            <span>يتم الحفظ تلقائياً في الموقع</span>
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
          مَتْجَرُ اسْتِعَارَةِ القِيَم
        </h2>
        <p className="text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
          «رُؤْيَةُ الجَمَالِ فِي الآخَرِينَ هِيَ أَوْلُ خُطْوَةٍ لاكْتِسَابِه» <br />
          لو أُتيح لك أن تستعير خُلقاً واحداً أو قيمة رائعة تلمسها في صديقك المقرب.. ماذا ستستعير؟ ومن الصديق الذي ستستعيرها منه؟
        </p>
      </div>

      {/* Grid of Available Value Cards in Store */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {VALUES_LIST.map((val) => {
          const isSelected = selectedCardId === val.id;
          return (
            <div
              key={val.id}
              onClick={() => {
                setSelectedCardId(val.id);
                setBorrowedSuccess(false);
              }}
              className={`p-5 rounded-3xl border cursor-pointer transition-all duration-300 text-right flex flex-col justify-between space-y-3 relative overflow-hidden ${
                isSelected
                  ? 'bg-indigo-50/50 border-indigo-500 ring-2 ring-indigo-500/20 shadow-md scale-[1.02]'
                  : 'bg-white border-slate-200/90 hover:border-indigo-300 hover:shadow-xs shadow-2xs'
              }`}
            >
              {/* Top Accent Gradient Bar */}
              <div className={`h-1.5 w-full rounded-full bg-gradient-to-r ${val.color} mb-1`}></div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{val.icon}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    قيمة أصيلة
                  </span>
                </div>
                <h3 className="text-base font-black text-slate-900">{val.name}</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {val.definition}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-2">
                <div className="text-[11px] text-slate-500">
                  <strong className="text-slate-700 block mb-0.5">مثال عملي:</strong>
                  {val.dailyExample}
                </div>
                <button
                  type="button"
                  className={`w-full py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <Gift className="w-3.5 h-3.5" />
                  <span>{isSelected ? 'تم اختيار هذه القيمة' : 'استعارة هذه القيمة'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Borrowing Action Box */}
      {selectedCard && (
        <div className="bg-white border border-indigo-200 rounded-3xl p-6 sm:p-8 text-right space-y-5 shadow-sm animate-fadeIn">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-2xl">
                {selectedCard.icon}
              </div>
              <div>
                <span className="text-xs font-bold text-indigo-600">القيمة المختارة للاستعارة والتطبيق:</span>
                <h3 className="text-lg sm:text-xl font-black text-slate-900">{selectedCard.name}</h3>
              </div>
            </div>
            <button
              onClick={resetBorrow}
              className="text-xs font-bold text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 transition"
            >
              إلغاء وتغيير القيمة
            </button>
          </div>

          {!borrowedSuccess ? (
            <form onSubmit={handleBorrow} className="space-y-4 max-w-2xl mx-auto">
              <div className="bg-slate-50 p-5 rounded-3xl border border-slate-200/80 space-y-4">
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-900 mb-1.5 flex items-center gap-1.5">
                    <HeartHandshake className="w-4 h-4 text-indigo-600" />
                    <span>1. مَن هو الزميل أو الصديق المقرب الذي ستستعير منه هذه القيمة؟</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="اكتب اسم زميلك المتميز بهذه القيمة..."
                    value={borrowFromFriendName}
                    onChange={(e) => setBorrowFromFriendName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-indigo-500 transition"
                  />
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    (تذكر: مدح زميلك ورؤية الخير فيه هي شيمة الفرسان وأصحاب النفوس الراقية)
                  </span>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-900 mb-1.5 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    <span>2. كيف ستطبق هذه القيمة عملياً في حياتك المدرسية بدءاً من اليوم؟</span>
                  </label>
                  <textarea
                    rows={2}
                    required
                    placeholder="مثال: سأبادر بالاعتراف بالخطأ فوراً، أو سأظلل زميلي بالمظلة، أو لن أعيد إرسال أي إشاعة..."
                    value={commitmentNote}
                    onChange={(e) => setCommitmentNote(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-indigo-500 resize-none transition"
                  />
                </div>
              </div>

              <div className="text-center pt-2">
                <button
                  type="submit"
                  className="px-8 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm shadow-xs transition inline-flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>تأكيد استعارة القيمة وإضافتها لتعهدك</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="bg-emerald-50 border border-emerald-200 p-6 sm:p-8 rounded-3xl text-center space-y-4 animate-fadeIn">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center text-3xl shadow-2xs">
                🎁
              </div>
              <h4 className="text-xl font-black text-slate-900">
                مبارك! استعرت بنجاح قيمة «{selectedCard.name}» مستلهماً إياها من زميلك «{borrowFromFriendName}»
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 max-w-md mx-auto leading-relaxed font-medium">
                تعهدك العملي المحفوظ: <strong className="text-emerald-800">"{commitmentNote}"</strong>
              </p>
              <div className="pt-2 flex justify-center gap-3">
                <button
                  onClick={resetBorrow}
                  className="px-5 py-2.5 rounded-2xl bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition shadow-2xs"
                >
                  استعارة قيمة أخرى
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Borrowed History Feed */}
      {borrowedHistory.length > 0 && (
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 space-y-4 text-right shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <h3 className="font-black text-sm sm:text-base text-slate-900">
                سجل القيم المستعارة المحفوظة ({borrowedHistory.length})
              </h3>
            </div>
            <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-md font-bold">
              محفوظ تلقائياً ✓
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {borrowedHistory.map((item) => (
              <div
                key={item.id}
                className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{item.icon}</span>
                      <h4 className="font-black text-sm text-slate-900">{item.valueName}</h4>
                    </div>
                    <button
                      onClick={() => removeBorrowedItem(item.id)}
                      className="text-slate-400 hover:text-rose-500 p-1 transition"
                      title="حذف السجل"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="text-xs text-indigo-700 font-bold mt-1">
                    مستعارة من الزميل: <span className="text-slate-900">{item.friendName}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium mt-1">
                    التطبيق: "{item.commitmentNote}"
                  </p>
                </div>
                <div className="text-[10px] text-slate-400 font-medium pt-1 border-t border-slate-200/60">
                  تاريخ التسجيل: {item.date}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
