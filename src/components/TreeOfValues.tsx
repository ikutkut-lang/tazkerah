import React, { useState, useEffect } from 'react';
import { Trees, Plus, Heart, Sparkles, Shield, Trophy, Check } from 'lucide-react';
import { loadSavedState, saveState } from '../utils/storage';

interface TreeFruit {
  id: string;
  name: string;
  desc: string;
  icon: string;
  author?: string;
  color: string;
}

const DEFAULT_FRUITS: TreeFruit[] = [
  {
    id: 'f1',
    name: 'محبة وثقة الناس',
    desc: 'احترام الجميع وتقديرهم الدائم لشخصيتك الصادقة ونقاء سريرتك.',
    icon: '❤️',
    color: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
  },
  {
    id: 'f2',
    name: 'راحة البال والضمير',
    desc: 'سكينة داخلية وطمأنينة نفسية لا تُقدّر بثمن ولا تباع بكنوز الأرض.',
    icon: '🍏',
    color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
  },
  {
    id: 'f3',
    name: 'الحصانة من الزلل',
    desc: 'شخصية قيادية متزنة وقوية لا تنجرف وراء الكثرة أو الضغوط السلبية.',
    icon: '🛡️',
    color: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
  },
  {
    id: 'f4',
    name: 'النجاح والتوفيق الدائم',
    desc: 'بركة مستمرة في العلم والعمل وتيسير من الله في كل خطوة وميدان.',
    icon: '🏆',
    color: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
  },
];

export const TreeOfValues: React.FC = () => {
  const [fruits, setFruits] = useState<TreeFruit[]>(() =>
    loadSavedState<TreeFruit[]>('tree_fruits', DEFAULT_FRUITS)
  );

  const [selectedFruit, setSelectedFruit] = useState<TreeFruit | null>(fruits[0] || null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newFruitName, setNewFruitName] = useState('');
  const [newFruitDesc, setNewFruitDesc] = useState('');
  const [newFruitAuthor, setNewFruitAuthor] = useState('');
  const [newFruitIcon, setNewFruitIcon] = useState('🍎');

  useEffect(() => {
    saveState('tree_fruits', fruits);
  }, [fruits]);

  const handleAddFruit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFruitName.trim()) return;

    const newFruit: TreeFruit = {
      id: `custom_${Date.now()}`,
      name: newFruitName.trim(),
      desc: newFruitDesc.trim() || 'ثمرة مباركة غرسها طالب متميز في شجرة التنوير.',
      icon: newFruitIcon,
      author: newFruitAuthor.trim() || 'طالب تنويري',
      color: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    };

    setFruits((prev) => [...prev, newFruit]);
    setSelectedFruit(newFruit);
    setNewFruitName('');
    setNewFruitDesc('');
    setNewFruitAuthor('');
    setShowAddModal(false);
  };

  return (
    <div className="w-full space-y-6 animate-fadeIn">
      
      {/* Top Banner */}
      <div className="bg-white border border-slate-200/90 p-6 sm:p-8 rounded-3xl text-center space-y-3 shadow-sm relative overflow-hidden">
        <div className="flex items-center justify-center gap-2 flex-wrap">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-100">
            <Trees className="w-4 h-4" />
            <span>شجرة القيم في مدارس التنوير الأهلية</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
            <Check className="w-3.5 h-3.5" />
            <span>يتم الحفظ تلقائياً في الموقع</span>
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
          لو زَرَعْتَ القِيَمَ كَشَجَرَةٍ فِي شَخْصِيَّتِكَ.. فَمَاذَا تَحْصُد؟
        </h2>
        <p className="text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
          «الشجرة المباركة أصلها ثابت وفرعها في السماء؛ نغذي جذورها بالنوايا الصادقة، ونقوي ساقها بالمواقف اليومية، لنقطف ثمارها الطيبة في دنيانا وآخرتنا.»
        </p>
      </div>

      {/* Main Interactive Tree Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Visual Interactive Tree Graphic */}
        <div className="lg:col-span-2 bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-between relative overflow-hidden min-h-[500px] shadow-sm">
          
          {/* Top Canopy with Clickable Fruits */}
          <div className="w-full flex-1 flex flex-col items-center justify-center relative z-10">
            
            {/* Tree Canopy Shape */}
            <div className="relative w-72 sm:w-96 h-64 sm:h-72 bg-gradient-to-b from-emerald-500 via-emerald-600 to-teal-800 rounded-full shadow-xl flex items-center justify-center p-4 border-4 border-emerald-300">
              
              {/* Canopy highlight texture */}
              <div className="absolute inset-2 rounded-full bg-emerald-400/20 blur-sm pointer-events-none"></div>

              <div className="text-center space-y-1">
                <span className="text-[11px] font-black tracking-widest text-emerald-100 uppercase">
                  أوراق وثمار الشخصية المتزنة
                </span>
                <p className="text-xs text-white font-bold max-w-[200px] mx-auto drop-shadow-xs">
                  انقر على أي ثمرة لاستكشاف بركتها!
                </p>
              </div>

              {/* Positioned Fruits on Canopy */}
              {fruits.map((fr, idx) => {
                const total = fruits.length;
                const angle = (idx / total) * 2 * Math.PI - Math.PI / 2;
                const radius = 105;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                const isSelected = selectedFruit?.id === fr.id;

                return (
                  <button
                    key={fr.id}
                    onClick={() => setSelectedFruit(fr)}
                    className={`absolute p-2.5 rounded-full border-2 transition-all transform hover:scale-125 z-20 flex items-center justify-center shadow-lg ${
                      isSelected
                        ? 'bg-amber-400 border-white text-slate-950 scale-125 ring-4 ring-amber-300 animate-bounce'
                        : 'bg-white/95 border-emerald-400 text-slate-900 hover:bg-emerald-50'
                    }`}
                    style={{
                      transform: `translate(${x}px, ${y}px) ${isSelected ? 'scale(1.25)' : ''}`,
                    }}
                    title={fr.name}
                  >
                    <span className="text-xl sm:text-2xl">{fr.icon}</span>
                  </button>
                );
              })}

            </div>

            {/* Tree Trunk (الساق والفروع) */}
            <div className="w-14 sm:w-16 h-28 bg-gradient-to-b from-amber-700 via-amber-800 to-amber-950 rounded-sm border-x-2 border-amber-600 shadow-md flex flex-col items-center justify-center p-1 text-center relative z-0">
              <span className="text-[9px] font-black text-amber-100 leading-tight">
                الساق والفروع: الأفعال اليومية
              </span>
            </div>

            {/* Tree Roots & Soil Layer (الجذور) */}
            <div className="w-full max-w-md bg-gradient-to-r from-amber-950 via-stone-900 to-amber-950 border-t-2 border-amber-500 rounded-t-3xl p-4 text-center shadow-md relative z-10">
              <div className="text-xs font-black text-amber-200 mb-1 flex items-center justify-center gap-1.5">
                <span>🌱</span>
                <span>الجذور (السرائر والنوايا): الإيمان بالله والصدق مع النفس</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed font-medium">
                «أشياء عميقة لا يراها الناس، ولكنها أساس الثبات والرسوخ في كل عواصف الحياة ومواقفها.»
              </p>
            </div>

          </div>

          {/* Add custom fruit button */}
          <div className="w-full mt-4 flex items-center justify-between z-10 border-t border-slate-100 pt-3">
            <span className="text-xs text-slate-600 font-medium">
              عدد الثمار في شجرة مدرستنا: <strong className="text-emerald-700 font-black">{fruits.length} ثمار</strong>
            </span>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-2xs transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>إضافة ثمرة قيمية جديدة</span>
            </button>
          </div>

        </div>

        {/* Selected Fruit Details Inspector */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 space-y-4 text-right shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="text-xs font-bold text-slate-500">تفاصيل الثمرة المختارة</span>
            <span className="text-2xl">{selectedFruit?.icon}</span>
          </div>

          {selectedFruit ? (
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-black text-slate-900 mb-1">{selectedFruit.name}</h3>
                {selectedFruit.author && (
                  <span className="text-[11px] px-2.5 py-1 rounded-full bg-slate-100 text-indigo-700 font-bold">
                    غرس الطالب: {selectedFruit.author}
                  </span>
                )}
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2">
                <h4 className="text-xs font-bold text-emerald-700">ماذا تعني هذه الثمرة في حياتك؟</h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  {selectedFruit.desc}
                </p>
              </div>

              {/* Life application tip */}
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl space-y-1">
                <span className="text-xs font-bold text-amber-900 block">💡 كيف تغذي هذه الثمرة اليوم؟</span>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  ابدأ بموقف صغير في صفك أو بيتك: انصر مظلوماً، ابتسم في وجه عامل، احفظ سر صديق، أو اعترف بخطأ بشجاعة.
                </p>
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-400 text-center py-10">اختر ثمرة من الشجرة لقراءة أثرها.</p>
          )}

          {/* Educational Formula Recap */}
          <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 leading-relaxed font-medium">
            🌿 <strong>تذكير تربوي:</strong> الجذور الصالحة تنتج فروعاً قوية، والأفعال الثابتة تثمر سيرة طيبة ومحبة في قلوب الخلق.
          </div>
        </div>

      </div>

      {/* Add Fruit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-md w-full text-right space-y-4 shadow-2xl">
            <h3 className="font-black text-lg text-slate-900">إضافة ثمرة قيمية جديدة إلى الشجرة</h3>
            <form onSubmit={handleAddFruit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">اسم الثمرة أو القيمة:</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: الشجاعة الأدبية، الكرم، الوفاء..."
                  value={newFruitName}
                  onChange={(e) => setNewFruitName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-indigo-500 focus:bg-white transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">الأثر أو المعنى الجميل للثمرة:</label>
                <textarea
                  rows={2}
                  placeholder="مثال: نشر الأمان في المدرسة، وتقدير الآخرين..."
                  value={newFruitDesc}
                  onChange={(e) => setNewFruitDesc(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-indigo-500 focus:bg-white resize-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">اسمك (صاحب الغرس):</label>
                <input
                  type="text"
                  placeholder="اسم الطالب أو المجموعة..."
                  value={newFruitAuthor}
                  onChange={(e) => setNewFruitAuthor(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-indigo-500 focus:bg-white transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">اختر الرمز للثمرة:</label>
                <div className="flex gap-2">
                  {['🍎', '🍊', '🍇', '🍒', '🌟', '🛡️', '💎'].map((ic) => (
                    <button
                      key={ic}
                      type="button"
                      onClick={() => setNewFruitIcon(ic)}
                      className={`p-2 rounded-xl text-xl border transition ${
                        newFruitIcon === ic ? 'bg-amber-100 border-amber-500' : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      {ic}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-xs"
                >
                  غرس الثمرة
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
