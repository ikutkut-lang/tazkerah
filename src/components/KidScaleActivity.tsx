import React, { useState, useEffect } from 'react';
import { CheckCircle2, AlertCircle, RotateCcw, Star, Heart, Trophy, Gift, Save } from 'lucide-react';
import { loadSavedState, saveState } from '../utils/storage';

interface KidItem {
  id: string;
  name: string;
  category: 'diamond' | 'pebble';
  weight: number;
  icon: string;
  simpleStory: string;
}

const DEFAULT_LEFT_ITEMS: KidItem[] = [
  {
    id: 'diamond_truth',
    name: 'ألماسة الصدق الجميلة',
    category: 'diamond',
    weight: 10,
    icon: '💎',
    simpleStory: 'قلت الحقيقة لمعلمي بكل شجاعة وابتسامة!',
  },
];

const DEFAULT_RIGHT_ITEMS: KidItem[] = [
  {
    id: 'leaves_lie',
    name: 'أوراق شجر يابسة (كذبة صغيرة)',
    category: 'pebble',
    weight: 2,
    icon: '🍂',
    simpleStory: 'الهروب من الاعتراف بالخطأ، ورقة تطير مع الريح!',
  },
];

export const KidScaleActivity: React.FC = () => {
  const [leftItems, setLeftItems] = useState<KidItem[]>(() =>
    loadSavedState<KidItem[]>('kid_scale_left_items', DEFAULT_LEFT_ITEMS)
  );

  const [rightItems, setRightItems] = useState<KidItem[]>(() =>
    loadSavedState<KidItem[]>('kid_scale_right_items', DEFAULT_RIGHT_ITEMS)
  );

  useEffect(() => {
    saveState('kid_scale_left_items', leftItems);
  }, [leftItems]);

  useEffect(() => {
    saveState('kid_scale_right_items', rightItems);
  }, [rightItems]);

  const kidItemsCatalog: KidItem[] = [
    {
      id: 'palace_heaven',
      name: 'قصر الجنة الجميل',
      category: 'diamond',
      weight: 12,
      icon: '🏰',
      simpleStory: 'بيت رائع في الجنة أبنيه بقيمي وصلاتي وطاعتي لأمي وأبي.',
    },
    {
      id: 'pebbles_cheat',
      name: 'حفنة حصى عادية',
      category: 'pebble',
      weight: 1,
      icon: '🪨',
      simpleStory: 'حجارة صغيرة في الطريق لا تنفع ولا تبني قصراً!',
    },
    {
      id: 'share_umbrella',
      name: 'مشاركة المظلة مع صديقي',
      category: 'diamond',
      weight: 9,
      icon: '☂️',
      simpleStory: 'أحميت زميلي من المطر ومشينا معاً فرحين حتى الصف.',
    },
    {
      id: 'take_toy',
      name: 'أخذ لعبة زميلي دون إذنه',
      category: 'pebble',
      weight: 2,
      icon: '🧸',
      simpleStory: 'تصرف يزعل صديقي ويفقدني محبته.',
    },
    {
      id: 'canteen_honesty',
      name: 'إرجاع النقود الزائدة في المقصف',
      category: 'diamond',
      weight: 10,
      icon: '💰',
      simpleStory: 'أرجعت الباقي لعمو بائع المقصف فدعا لي بالبركة وابتسم!',
    },
    {
      id: 'laugh_friend',
      name: 'الضحك على صديق تعثر في الساحة',
      category: 'pebble',
      weight: 1,
      icon: '🙈',
      simpleStory: 'سلوك يجرح قلب زميلي بدل أن أمد يدي لمساعدته.',
    },
    {
      id: 'help_cleaner',
      name: 'تقديم ماء بارد لعامل المدرسة',
      category: 'diamond',
      weight: 8,
      icon: '🧃',
      simpleStory: 'قلت له "شكراً يا عمو" بابتسامة طيبة وأسعدت قلبه.',
    },
    {
      id: 'boast_toy',
      name: 'التفاخر بلعبة غالية أمام زملائي',
      category: 'pebble',
      weight: 2,
      icon: '🏎️',
      simpleStory: 'أتباهى بلعبتي وأحزن قلوب أصدقائي الذين لا يملكونها.',
    },
  ];

  const leftWeight = leftItems.reduce((acc, it) => acc + it.weight, 0);
  const rightWeight = rightItems.reduce((acc, it) => acc + it.weight, 0);
  const diff = leftWeight - rightWeight;
  const tiltAngle = Math.max(-14, Math.min(14, diff * -2.5));

  const addItemToLeft = (item: KidItem) => {
    if (!leftItems.some((i) => i.id === item.id)) {
      setLeftItems((prev) => [...prev, item]);
    }
  };

  const addItemToRight = (item: KidItem) => {
    if (!rightItems.some((i) => i.id === item.id)) {
      setRightItems((prev) => [...prev, item]);
    }
  };

  const removeItem = (id: string, side: 'left' | 'right') => {
    if (side === 'left') {
      setLeftItems((prev) => prev.filter((i) => i.id !== id));
    } else {
      setRightItems((prev) => prev.filter((i) => i.id !== id));
    }
  };

  const handleReset = () => {
    setLeftItems(DEFAULT_LEFT_ITEMS);
    setRightItems(DEFAULT_RIGHT_ITEMS);
  };

  return (
    <div className="w-full space-y-6 animate-fadeIn text-right">
      
      {/* Joyful Kid Header Banner */}
      <div className="bg-gradient-to-r from-amber-100 via-white to-sky-100 border-2 border-amber-300 p-6 sm:p-8 rounded-3xl text-center space-y-3 shadow-md relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400 text-slate-950 text-xs font-black shadow-xs">
          <Star className="w-4 h-4 fill-amber-300 text-slate-900" />
          <span>لعبة ميزان الجواهر والقيم النفيسة</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-amber-950">
          ⚖️ ميزان الكنوز: هل نبادل الألماسة بحبة حصى؟!
        </h2>
        <p className="text-xs sm:text-sm text-slate-700 max-w-xl mx-auto leading-relaxed font-bold">
          يا بطل! ضع <strong className="text-amber-700">الأشياء الغالية (الجواهر والقيم الحلوة)</strong> في كفة، وضع <strong className="text-slate-600">الأشياء الرخيصة (الحصى والأوراق الذابلة)</strong> في الكفة الثانية وشوف شو رح يصير!
        </p>
      </div>

      {/* Visual Animated Child-Friendly Scale */}
      <div className="bg-white border-2 border-amber-200 rounded-3xl p-6 sm:p-10 flex flex-col items-center justify-center relative shadow-md">
        
        <div className="w-full max-w-xl relative flex flex-col items-center">
          
          {/* Main Scale Beam */}
          <div
            className="w-full h-5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 rounded-full shadow-lg relative flex items-center justify-between transition-transform duration-700 ease-out z-20"
            style={{ transform: `rotate(${tiltAngle}deg)` }}
          >
            {/* Center Pivot Star */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border-2 border-amber-500 flex items-center justify-center text-lg shadow-md">
              ⭐
            </div>

            {/* Left Pan (Precious / Diamonds) */}
            <div className="absolute left-3 top-2 flex flex-col items-center origin-top">
              <div className="w-1 h-14 bg-amber-400"></div>
              <div className="w-36 sm:w-44 min-h-[100px] bg-amber-50 border-3 border-amber-400 rounded-3xl p-2.5 shadow-md flex flex-col items-center justify-center text-center">
                <span className="text-xs font-black text-amber-900 block mb-1">
                  💎 كفة الجواهر والكنوز
                </span>
                <div className="flex flex-wrap gap-1 justify-center">
                  {leftItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => removeItem(item.id, 'left')}
                      className="px-2 py-1 rounded-xl bg-amber-200 hover:bg-rose-200 text-xs font-bold text-amber-950 flex items-center gap-1 transition"
                      title="اضغط للإزالة"
                    >
                      <span>{item.icon}</span>
                      <span className="text-[10px]">{item.name.split(' ')[0]}</span>
                      <span className="text-slate-500 font-black">×</span>
                    </button>
                  ))}
                  {leftItems.length === 0 && (
                    <span className="text-[10px] text-slate-400 font-bold">الكفة فاضية!</span>
                  )}
                </div>
                <div className="text-[10px] font-black text-amber-700 mt-1">قوة الكنوز: {leftWeight} ⭐</div>
              </div>
            </div>

            {/* Right Pan (Cheap / Pebbles) */}
            <div className="absolute right-3 top-2 flex flex-col items-center origin-top">
              <div className="w-1 h-14 bg-slate-300"></div>
              <div className="w-36 sm:w-44 min-h-[100px] bg-slate-50 border-3 border-slate-300 rounded-3xl p-2.5 shadow-md flex flex-col items-center justify-center text-center">
                <span className="text-xs font-black text-slate-600 block mb-1">
                  🪨 كفة الحصى الرخيص
                </span>
                <div className="flex flex-wrap gap-1 justify-center">
                  {rightItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => removeItem(item.id, 'right')}
                      className="px-2 py-1 rounded-xl bg-slate-200 hover:bg-rose-200 text-xs font-bold text-slate-800 flex items-center gap-1 transition"
                      title="اضغط للإزالة"
                    >
                      <span>{item.icon}</span>
                      <span className="text-[10px]">{item.name.split(' ')[0]}</span>
                      <span className="text-slate-500 font-black">×</span>
                    </button>
                  ))}
                  {rightItems.length === 0 && (
                    <span className="text-[10px] text-slate-400 font-bold">الكفة فاضية!</span>
                  )}
                </div>
                <div className="text-[10px] font-black text-slate-500 mt-1">قوة الحصى: {rightWeight} 🪨</div>
              </div>
            </div>

          </div>

          {/* Pillar */}
          <div className="w-8 h-32 bg-gradient-to-b from-amber-500 to-amber-700 rounded-sm shadow-md mt-[-6px]"></div>
          <div className="w-48 h-8 bg-amber-800 rounded-t-2xl border-t-2 border-amber-300 shadow-md flex items-center justify-center text-xs font-black text-amber-100">
            مدارس التنوير الأهلية 🌟
          </div>

        </div>

        {/* Fun Status Banner */}
        <div className="mt-8 text-center max-w-md">
          {leftWeight > rightWeight ? (
            <div className="p-4 bg-emerald-100 border-2 border-emerald-300 rounded-2xl text-emerald-900 text-xs sm:text-sm font-black flex items-center justify-center gap-2 shadow-sm animate-bounce">
              <Trophy className="w-5 h-5 text-emerald-700 shrink-0" />
              <span>رائع يا بطل! كفة القيم والجواهر فازت! أنت بطل حقيقي! 👑</span>
            </div>
          ) : leftWeight < rightWeight ? (
            <div className="p-4 bg-rose-100 border-2 border-rose-300 rounded-2xl text-rose-900 text-xs sm:text-sm font-black flex items-center justify-center gap-2 shadow-sm">
              <AlertCircle className="w-5 h-5 text-rose-700 shrink-0" />
              <span>انتبه يا بطل! الحصى الرخيص لا يشتري قصراً في الجنة! أضف جواهر!</span>
            </div>
          ) : (
            <div className="p-3.5 bg-slate-100 border border-slate-300 rounded-2xl text-slate-700 text-xs font-bold">
              الكفتان متساويتان! جرب تضيف جواهر حلوة لتفوز!
            </div>
          )}
        </div>

      </div>

      {/* Catalog for Kids */}
      <div className="bg-white border-2 border-amber-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Gift className="w-5 h-5 text-amber-600" />
            <h3 className="font-black text-base text-slate-900">صندوق الكنوز والمواقف اليومية</h3>
          </div>
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs font-black text-slate-700 hover:text-slate-950 px-3.5 py-2 rounded-2xl bg-amber-100 hover:bg-amber-200 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>إعادة اللعبة من البداية</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {kidItemsCatalog.map((item) => {
            const isUsed = leftItems.some((i) => i.id === item.id) || rightItems.some((i) => i.id === item.id);
            return (
              <div
                key={item.id}
                className={`p-4 rounded-3xl border-2 transition flex flex-col justify-between ${
                  item.category === 'diamond'
                    ? 'bg-amber-50/70 border-amber-300 hover:bg-amber-100/60'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div>
                  <div className="text-3xl mb-2 text-center">{item.icon}</div>
                  <h4 className="text-xs sm:text-sm font-black text-slate-900 text-center mb-1">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-slate-600 text-center leading-relaxed font-bold mb-3">
                    {item.simpleStory}
                  </p>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-slate-200">
                  <button
                    disabled={isUsed}
                    onClick={() => addItemToLeft(item)}
                    className={`w-full py-2 rounded-xl text-xs font-black transition ${
                      isUsed
                        ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        : 'bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-2xs'
                    }`}
                  >
                    + كفة الجواهر 💎
                  </button>
                  <button
                    disabled={isUsed}
                    onClick={() => addItemToRight(item)}
                    className={`w-full py-1.5 rounded-xl text-[11px] font-bold transition ${
                      isUsed
                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
                    }`}
                  >
                    + كفة الحصى 🪨
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
