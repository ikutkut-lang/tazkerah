import React, { useState, useEffect } from 'react';
import { SLIDES_DATA } from '../data/curriculumData';
import { StageId } from '../types';
import { ChevronRight, ChevronLeft, Maximize2, Minimize2, List, Sparkles, BookOpen, Scale, Trees, Award, HelpCircle } from 'lucide-react';

interface PresentationModeProps {
  currentStage: StageId;
  onNavigateTab: (tab: string) => void;
}

export const PresentationMode: React.FC<PresentationModeProps> = ({ currentStage, onNavigateTab }) => {
  // Filter slides relevant to current stage
  const slides = SLIDES_DATA.filter((s) => s.stage === 'both' || s.stage === currentStage);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [revealedPoints, setRevealedPoints] = useState<number>(3);

  const slide = slides[currentSlideIndex] || slides[0];

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'PageDown' || e.key === ' ') {
        nextSlide();
      } else if (e.key === 'ArrowRight' || e.key === 'PageUp') {
        prevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlideIndex, slides.length]);

  const nextSlide = () => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex((prev) => prev + 1);
      setRevealedPoints(3);
    }
  };

  const prevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex((prev) => prev - 1);
      setRevealedPoints(3);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <div className="relative w-full min-h-[600px] flex flex-col justify-between bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden text-slate-900">
      
      {/* Slide Navigation Header Toolbar */}
      <div className="px-4 sm:px-6 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between z-10">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="px-3 py-1 rounded-full text-xs font-black bg-indigo-600 text-white shadow-2xs">
            شريحة {currentSlideIndex + 1} / {slides.length}
          </span>
          {slide.tag && (
            <span className="hidden sm:inline-block px-3 py-1 rounded-full text-xs font-bold bg-white text-indigo-700 border border-slate-200">
              {slide.tag}
            </span>
          )}
          <span className="text-xs text-slate-600 truncate max-w-xs font-bold">
            {slide.title}
          </span>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => setShowDrawer(!showDrawer)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-xs font-bold text-slate-700 border border-slate-200 shadow-2xs transition"
            title="قائمة الشرائح"
          >
            <List className="w-4 h-4 text-indigo-600" />
            <span className="hidden md:inline">فهرس الشرائح</span>
          </button>
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-2xs transition"
            title="ملء الشاشة"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Slide Canvas */}
      <div className="flex-1 p-6 sm:p-10 md:p-14 flex flex-col justify-center items-center relative overflow-y-auto bg-slate-50/50">
        
        {/* Slide 1: Intro Hero */}
        {slide.category === 'intro' && (
          <div className="max-w-3xl text-center space-y-6 animate-fadeIn">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs sm:text-sm font-bold">
              <Sparkles className="w-4 h-4" />
              <span>مدارس التنوير الأهلية — برنامج بناء الشخصية والأثر</span>
            </div>

            <h2 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-tight">
              بَرْنَامَجُ القِيَمِ <br />
              <span className="text-indigo-600">
                «تَذْكِرَة»
              </span>
            </h2>

            <p className="text-xl sm:text-2xl font-bold text-slate-800 font-['Amiri',serif]">
              {slide.content.quote}
            </p>

            <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed font-medium">
              {slide.content.explanation}
            </p>

            {/* Quick interactive action buttons */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => onNavigateTab('scale')}
                className="px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm shadow-xs flex items-center gap-2 transition"
              >
                <Scale className="w-4 h-4" />
                <span>تجربة ميزان الألماس والحصى</span>
              </button>
              <button
                onClick={() => onNavigateTab('scenarios')}
                className="px-5 py-2.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm border border-slate-200 shadow-2xs flex items-center gap-2 transition"
              >
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>مواقف مفترق الطرق</span>
              </button>
            </div>
          </div>
        )}

        {/* Slide 2: Quran & Hadith (بوصلة السماء) */}
        {slide.category === 'quran_hadith' && (
          <div className="max-w-4xl w-full space-y-6 animate-fadeIn text-right">
            <div className="text-center mb-6">
              <span className="text-xs font-black uppercase px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                بوصلة السماء: مصدر قيمنا
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-3">
                اقتباسات من نور القرآن العظيم والهدي النبوي
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl">🗣️</span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">أدب الخطاب</span>
                </div>
                <p className="text-lg font-bold text-slate-900 font-['Amiri',serif] leading-relaxed">
                  ﴿وَقُولُوا لِلنَّاسِ حُسْنًا﴾
                </p>
                <div className="text-xs text-slate-500 font-medium">سورة البقرة: 83</div>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  توجيه رحماني للتعامل الراقي والكلمة الطيبة التي تبني الجسور وتزيل الشحناء في مجتمع المدرسة.
                </p>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl">⚖️</span>
                  <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full">جامع الفضائل</span>
                </div>
                <p className="text-lg font-bold text-slate-900 font-['Amiri',serif] leading-relaxed">
                  ﴿إِنَّ اللَّهَ يَأْمُرُ بِالْعَدْلِ وَالإِحْسَانِ﴾
                </p>
                <div className="text-xs text-slate-500 font-medium">سورة النحل: 90</div>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  دستور إلهي يرسخ قيم العدالة والتكافل والصلة والإحسان للجميع دون استثناء.
                </p>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl">✨</span>
                  <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full">كمال الخلق</span>
                </div>
                <p className="text-lg font-bold text-slate-900 font-['Amiri',serif] leading-relaxed">
                  ﴿وَإِنَّكَ لَعَلَى خُلُقٍ عَظِيمٍ﴾
                </p>
                <div className="text-xs text-slate-500 font-medium">سورة القلم: 4</div>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  ثناء رباني على سيد الخلق لبيان أن أعظم ما يتحلى به الإنسان هو الخلق القويم.
                </p>
              </div>
            </div>

            {/* Prophet's Quotes */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-right">
              <div>
                <p className="text-sm font-bold text-slate-900 font-['Amiri',serif]">
                  قال رسول الله ﷺ: «إِنَّمَا بُعِثْتُ لِأُتَمِّمَ مَكَارِمَ الْأَخْلَاقِ»
                </p>
                <p className="text-xs text-slate-500 mt-1 font-medium">
                  «أَحَبُّ عِبَادِ اللَّهِ إِلَى اللَّهِ: أَحْسَنُهُمْ خُلُقاً»
                </p>
              </div>
              <button
                onClick={() => onNavigateTab('quran')}
                className="px-4 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold border border-emerald-200 shrink-0 transition"
              >
                استعراض بوصلة السماء بالتفصيل
              </button>
            </div>
          </div>
        )}

        {/* Slide 3: Interactive Scale Comparison (ميزان العقل) */}
        {slide.category === 'scale' && slide.content.comparison && (
          <div className="max-w-4xl w-full space-y-6 animate-fadeIn text-center">
            <div>
              <span className="text-xs font-black uppercase px-3.5 py-1.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                السؤال المحفز (Engage)
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 mt-3">
                ميزان العقل: هل يستقيم هذا التبادل؟!
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4 text-right">
              {/* Left comparison: Diamond vs Dead leaves */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs space-y-3 relative overflow-hidden">
                <div className="text-4xl mb-2 text-center">💎 ↔️ 🍂</div>
                <h3 className="text-base font-black text-slate-900">
                  {slide.content.comparison.left.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200/80 font-medium">
                  {slide.content.comparison.left.desc}
                </p>
                <div className="text-xs text-indigo-600 font-bold text-center pt-2">
                  هل يقبل عاقل مبادلة الجوهرة بأوراق ذابلة؟
                </div>
              </div>

              {/* Right comparison: Palace vs Pebble Stones */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs space-y-3 relative overflow-hidden">
                <div className="text-4xl mb-2 text-center">🏰 ↔️ 🪨</div>
                <h3 className="text-base font-black text-slate-900">
                  {slide.content.comparison.right.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200/80 font-medium">
                  {slide.content.comparison.right.desc}
                </p>
                <div className="text-xs text-indigo-600 font-bold text-center pt-2">
                  هل يُشترى القصر العظيم بحفنة من الحصى؟
                </div>
              </div>
            </div>

            {/* Big Conclusion Box */}
            <div className="bg-indigo-50 border border-indigo-200 p-5 rounded-3xl text-center space-y-1">
              <div className="text-base sm:text-lg font-black text-indigo-900">
                {slide.content.comparison.conclusion}
              </div>
              <div className="text-xs sm:text-sm text-indigo-700 font-bold">
                {slide.content.comparison.lifeLaw}
              </div>
            </div>

            <div>
              <button
                onClick={() => onNavigateTab('scale')}
                className="px-6 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm shadow-xs inline-flex items-center gap-2 transition"
              >
                <Scale className="w-4 h-4" />
                <span>فتح المختبر التفاعلي لميزان الألماس والحصى</span>
              </button>
            </div>
          </div>
        )}

        {/* Slide: Equation (معادلة القيم) for Stage 2 */}
        {slide.content.equation && (
          <div className="max-w-4xl w-full space-y-6 animate-fadeIn text-center">
            <div>
              <span className="text-xs font-black uppercase px-3.5 py-1.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                المرحلة 2 (الصف 7 - 9)
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 mt-3">
                معادلة القيم: القيمة ليست مجرد كلمة
              </h2>
            </div>

            {/* Interactive Equation Blocks */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-3 my-6">
              <div className="w-full md:w-56 bg-white border border-slate-200/90 p-5 rounded-3xl shadow-2xs">
                <span className="text-xs text-sky-700 font-bold block mb-1">الركن الأول</span>
                <span className="text-base font-black text-slate-900">{slide.content.equation.thought}</span>
              </div>

              <span className="text-2xl font-black text-indigo-600">+</span>

              <div className="w-full md:w-56 bg-white border border-slate-200/90 p-5 rounded-3xl shadow-2xs">
                <span className="text-xs text-emerald-700 font-bold block mb-1">الركن الثاني</span>
                <span className="text-base font-black text-slate-900">{slide.content.equation.action}</span>
              </div>

              <span className="text-2xl font-black text-indigo-600">=</span>

              <div className="w-full md:w-60 bg-indigo-50 border border-indigo-200 p-5 rounded-3xl shadow-2xs">
                <span className="text-xs text-indigo-700 font-bold block mb-1">النتيجة الراسخة</span>
                <span className="text-lg font-black text-indigo-900">{slide.content.equation.result}</span>
              </div>
            </div>

            {/* Practical Examples */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-right">
              {slide.content.equation.examples.map((ex, idx) => (
                <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-200/90 flex items-start gap-3 shadow-2xs">
                  <span className="px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 font-bold text-xs shrink-0">
                    {ex.value}
                  </span>
                  <span className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                    {ex.behavior}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Slide: Decision Tree & Crossroads */}
        {slide.content.decisionTree && (
          <div className="max-w-4xl w-full space-y-6 animate-fadeIn text-center">
            <div>
              <span className="text-xs font-black uppercase px-3.5 py-1.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                مفترق طرق قيمي
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-3">
                {slide.title}
              </h2>
            </div>

            <div className="bg-slate-50 border border-slate-200/90 p-5 rounded-3xl text-right max-w-2xl mx-auto text-sm sm:text-base font-bold text-slate-800">
              {slide.content.decisionTree.situation}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-right">
              {/* Negative path */}
              <div className="bg-rose-50 border border-rose-200 p-6 rounded-3xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-rose-800 bg-rose-100 px-2.5 py-0.5 rounded-full">رد الفعل الرخيص</span>
                  <span className="text-xl">❌</span>
                </div>
                <div className="text-sm font-black text-slate-900">
                  {slide.content.decisionTree.leftPath.action}
                </div>
                <p className="text-xs text-rose-700 leading-relaxed font-medium">
                  {slide.content.decisionTree.leftPath.result}
                </p>
              </div>

              {/* Positive path */}
              <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-3xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">رد الفعل الثمين</span>
                  <span className="text-xl">💎</span>
                </div>
                <div className="text-sm font-black text-slate-900">
                  {slide.content.decisionTree.rightPath.action}
                </div>
                <p className="text-xs text-emerald-800 leading-relaxed font-medium">
                  {slide.content.decisionTree.rightPath.result}
                </p>
              </div>
            </div>

            <div className="bg-indigo-50 border border-indigo-200 p-3 rounded-2xl inline-block">
              <span className="text-xs text-indigo-700 font-bold ml-2">القيمة التي تجلت:</span>
              <span className="text-sm font-black text-slate-900">{slide.content.decisionTree.revealedValue}</span>
            </div>
          </div>
        )}

        {/* Slide: Tree of Values */}
        {slide.content.treeData && (
          <div className="max-w-4xl w-full space-y-6 animate-fadeIn text-center">
            <div>
              <span className="text-xs font-black uppercase px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                شجرة القيم في مدارس التنوير
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-3">
                شجرة القيم: ماذا نحصد؟
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-right">
              {slide.content.treeData.fruits.map((fr, idx) => (
                <div key={idx} className="bg-white border border-slate-200/90 p-5 rounded-3xl shadow-2xs space-y-1 hover:border-emerald-300 transition">
                  <div className="text-3xl mb-1">{fr.icon}</div>
                  <h4 className="text-sm font-black text-slate-900">{fr.name}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">{fr.desc}</p>
                </div>
              ))}
            </div>

            <div className="bg-slate-50 p-5 rounded-3xl border border-slate-200/90 text-right space-y-2 text-xs sm:text-sm font-medium">
              <div className="text-amber-800 font-bold">
                🌱 {slide.content.treeData.roots}
              </div>
              <div className="text-slate-700">
                🌿 {slide.content.treeData.trunk}
              </div>
            </div>

            <button
              onClick={() => onNavigateTab('tree')}
              className="px-6 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm inline-flex items-center gap-2 shadow-xs transition"
            >
              <Trees className="w-4 h-4" />
              <span>استكشاف شجرة القيم التفاعلية وقطف الثمار</span>
            </button>
          </div>
        )}

        {/* Slide: General Points or Concept */}
        {slide.content.points && !slide.content.comparison && (
          <div className="max-w-3xl w-full space-y-6 animate-fadeIn text-right">
            <div className="text-center mb-4">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-50 text-indigo-700">
                {slide.tag || 'رؤية البرنامج'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">{slide.title}</h2>
              {slide.subtitle && <p className="text-xs sm:text-sm text-slate-500 font-medium">{slide.subtitle}</p>}
            </div>

            {slide.content.explanation && (
              <div className="bg-indigo-50/70 p-5 rounded-3xl border border-indigo-100 text-slate-800 text-sm font-semibold text-center leading-relaxed">
                {slide.content.explanation}
              </div>
            )}

            <div className="space-y-3">
              {slide.content.points.map((pt, idx) => (
                <div
                  key={idx}
                  className="bg-white p-5 rounded-3xl border border-slate-200/90 hover:border-indigo-200 flex items-start gap-3 shadow-2xs transition"
                >
                  <span className="w-6 h-6 rounded-full bg-indigo-50 text-indigo-700 text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                    {pt}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Slide: Interactive Activity Launcher */}
        {slide.content.interactiveActivity && (
          <div className="max-w-2xl text-center space-y-6 animate-fadeIn">
            <div className="w-16 h-16 rounded-3xl bg-indigo-50 border border-indigo-100 text-indigo-600 mx-auto flex items-center justify-center text-3xl shadow-xs">
              {slide.content.interactiveActivity.type === 'identity' ? '🪪' : slide.content.interactiveActivity.type === 'store' ? '🏪' : '🎟️'}
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-slate-900">
              {slide.content.interactiveActivity.title}
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed bg-white p-6 rounded-3xl border border-slate-200/90 font-medium shadow-2xs">
              {slide.content.interactiveActivity.description}
            </p>

            <div>
              {slide.content.interactiveActivity.type === 'identity' && (
                <button
                  onClick={() => onNavigateTab('cards')}
                  className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm shadow-xs inline-flex items-center gap-2 transition"
                >
                  <Award className="w-5 h-5" />
                  <span>توليد وتخصيص بطاقة الهوية القيمية</span>
                </button>
              )}
              {slide.content.interactiveActivity.type === 'store' && (
                <button
                  onClick={() => onNavigateTab('store')}
                  className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-xs inline-flex items-center gap-2 transition"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>دخول متجر استعارة القيم</span>
                </button>
              )}
              {slide.content.interactiveActivity.type === 'ticket' && (
                <button
                  onClick={() => onNavigateTab('cards')}
                  className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm shadow-xs inline-flex items-center gap-2 transition"
                >
                  <Award className="w-5 h-5" />
                  <span>تعبئة تذكرة الالتزام الأسبوعية (Commitment Ticket)</span>
                </button>
              )}
            </div>
          </div>
        )}

      </div>

      {/* Slide Navigation Footer Bar */}
      <div className="px-4 sm:px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between z-10">
        
        {/* Previous button (Right arrow in RTL) */}
        <button
          onClick={prevSlide}
          disabled={currentSlideIndex === 0}
          className={`flex items-center gap-1 px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold border transition ${
            currentSlideIndex === 0
              ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
              : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200 shadow-2xs'
          }`}
        >
          <ChevronRight className="w-4 h-4" />
          <span>السابق</span>
        </button>

        {/* Progress dots / slider */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-[200px] sm:max-w-md px-2 py-1 no-scrollbar">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlideIndex(idx)}
              className={`h-2 rounded-full transition-all shrink-0 ${
                idx === currentSlideIndex
                  ? 'w-6 bg-indigo-600'
                  : 'w-2 bg-slate-300 hover:bg-slate-400'
              }`}
              title={`الشريحة ${idx + 1}`}
            />
          ))}
        </div>

        {/* Next button (Left arrow in RTL) */}
        <button
          onClick={nextSlide}
          disabled={currentSlideIndex === slides.length - 1}
          className={`flex items-center gap-1 px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold border transition ${
            currentSlideIndex === slides.length - 1
              ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white border-indigo-600 font-extrabold shadow-xs'
          }`}
        >
          <span>التالي</span>
          <ChevronLeft className="w-4 h-4" />
        </button>

      </div>

      {/* Slide Drawer Modal */}
      {showDrawer && (
        <div className="absolute inset-0 z-30 bg-slate-900/40 backdrop-blur-xs p-6 overflow-y-auto animate-fadeIn flex flex-col">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xl flex-1 flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <h3 className="font-black text-lg text-slate-900">فهرس شرائح درس برنامج القيم</h3>
              <button
                onClick={() => setShowDrawer(false)}
                className="px-3.5 py-1.5 rounded-xl bg-slate-100 text-xs font-bold text-slate-700 hover:bg-slate-200 transition"
              >
                إغلاق الفهرس ✕
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 overflow-y-auto">
              {slides.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => {
                    setCurrentSlideIndex(idx);
                    setShowDrawer(false);
                  }}
                  className={`p-4 rounded-2xl border text-right transition flex flex-col justify-between h-28 ${
                    idx === currentSlideIndex
                      ? 'bg-indigo-50 border-indigo-500 text-indigo-900 font-bold shadow-xs'
                      : 'bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="font-mono font-bold">#{idx + 1}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white border border-slate-200 font-medium">{s.tag || s.category}</span>
                  </div>
                  <h4 className="text-xs font-black text-slate-900 line-clamp-2">{s.title}</h4>
                  <div className="text-[10px] text-slate-500 truncate">{s.subtitle || ''}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
