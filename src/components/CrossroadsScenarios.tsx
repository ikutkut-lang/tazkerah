import React, { useState } from 'react';
import { REAL_LIFE_SCENARIOS } from '../data/curriculumData';
import { StageId, GenderMode, Scenario } from '../types';
import { GitFork, Smartphone, ShieldCheck, AlertTriangle, Users, Sparkles, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';

interface CrossroadsScenariosProps {
  currentStage: StageId;
  genderMode: GenderMode;
}

export const CrossroadsScenarios: React.FC<CrossroadsScenariosProps> = ({ currentStage, genderMode }) => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('canteen_change');
  const [chosenPath, setChosenPath] = useState<'cheap' | 'noble' | null>(null);
  const [digitalChoiceMade, setDigitalChoiceMade] = useState<'forward' | 'delete' | null>(null);

  // Filter scenarios
  const filteredScenarios = REAL_LIFE_SCENARIOS.filter((sc) => {
    const stageMatch = sc.stage === 'both' || sc.stage === currentStage;
    const genderMatch = genderMode === 'both' || !sc.genderTarget || sc.genderTarget === 'both' || sc.genderTarget === genderMode;
    return stageMatch && genderMatch;
  });

  const currentScenario = filteredScenarios.find((s) => s.id === selectedScenarioId) || filteredScenarios[0] || REAL_LIFE_SCENARIOS[0];

  const handleSelectScenario = (sc: Scenario) => {
    setSelectedScenarioId(sc.id);
    setChosenPath(null);
    setDigitalChoiceMade(null);
  };

  return (
    <div className="w-full space-y-6 animate-fadeIn">
      
      {/* Top Banner */}
      <div className="bg-white border border-slate-200/90 p-6 sm:p-8 rounded-3xl text-center space-y-3 shadow-sm relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-100">
          <GitFork className="w-4 h-4" />
          <span>مفترق الطرق القيمي ومسرحة السلوك (السايكودراما)</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
          مواقف من واقع الحياة: اختبر بوصلتك الداخلية
        </h2>
        <p className="text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
          «القيم الحقيقية تُمتحن في لحظات الضغط ومفترقات الطرق؛ عندما تكون بمفردك أو أمام ضغط الزملاء. أي طريق ستختار؟»
        </p>
      </div>

      {/* Scenarios Horizontal Selector Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {filteredScenarios.map((sc) => {
          const isSelected = sc.id === currentScenario.id;
          return (
            <button
              key={sc.id}
              onClick={() => handleSelectScenario(sc)}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition border shrink-0 flex items-center gap-2 ${
                isSelected
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {sc.isDigital ? <Smartphone className="w-4 h-4 text-sky-500" /> : <Sparkles className="w-4 h-4 text-amber-500" />}
              <span>{sc.title}</span>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Stage for Selected Scenario */}
      {currentScenario.isDigital ? (
        /* Digital Smartphone Simulator */
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row items-center justify-center gap-8 shadow-sm">
          
          {/* Mock Smartphone Frame */}
          <div className="w-full max-w-xs bg-slate-900 rounded-[36px] border-4 border-slate-700 shadow-2xl overflow-hidden flex flex-col h-[520px]">
            {/* Phone Speaker & Camera Notch */}
            <div className="h-6 bg-slate-950 flex items-center justify-center">
              <div className="w-16 h-3 bg-slate-800 rounded-full"></div>
            </div>

            {/* Chat App Header */}
            <div className="p-3 bg-emerald-800 text-white flex items-center gap-2 border-b border-emerald-700">
              <div className="w-8 h-8 rounded-full bg-emerald-950 flex items-center justify-center font-bold text-xs">
                👥
              </div>
              <div className="flex-1 text-right">
                <div className="text-xs font-bold leading-tight">مجموعة الصف — دردشة الطلاب</div>
                <div className="text-[10px] text-emerald-200">متصل الآن (28 عضواً)</div>
              </div>
            </div>

            {/* Chat Message Bubble Canvas */}
            <div className="flex-1 p-3 bg-slate-950 overflow-y-auto space-y-3 text-right">
              <div className="bg-slate-900 border border-slate-800 p-2.5 rounded-2xl rounded-tr-none text-xs text-slate-300 max-w-[85%] mr-auto">
                <div className="text-[10px] text-amber-400 font-bold mb-1">أحد الزملاء:</div>
                <p>يا شباب شوفوا هالصورة المضحكة عن فلان! انشروها للكل 😂📲</p>
                <div className="mt-2 bg-slate-950 p-2 rounded border border-rose-500/30 text-rose-300 text-[11px] flex items-center gap-2">
                  <span>📸</span>
                  <span>[صورة محرجة تم التقاطها سراً للزميل]</span>
                </div>
              </div>

              {digitalChoiceMade === 'forward' && (
                <div className="bg-rose-950/80 border border-rose-500 p-2.5 rounded-2xl rounded-tl-none text-xs text-rose-200 max-w-[85%] ml-auto animate-fadeIn">
                  <div className="text-[10px] text-rose-400 font-bold mb-1">أنت (خيار خاطئ):</div>
                  <p>تمت إعادة التوجيه إلى 4 مجموعات أخرى ❌</p>
                  <div className="text-[10px] text-rose-300 mt-1 font-bold">انتهاك للخصوصية ومشاركة في الظلم والغيبة!</div>
                </div>
              )}

              {digitalChoiceMade === 'delete' && (
                <div className="bg-emerald-950/80 border border-emerald-500 p-2.5 rounded-2xl rounded-tl-none text-xs text-emerald-200 max-w-[85%] ml-auto animate-fadeIn">
                  <div className="text-[10px] text-emerald-400 font-bold mb-1">أنت (خيار قيمي عظيم):</div>
                  <p>تم حذف الصورة فوراً ✅</p>
                  <p className="text-[11px] text-amber-300 mt-1">«يا شباب، المؤمن حفيظ على سر أخيه، ولا يجوز نشر ما يسوء زميلنا الغائب.»</p>
                </div>
              )}
            </div>

            {/* Smartphone Bottom Interactive Action Bar */}
            <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2">
              <button
                onClick={() => setDigitalChoiceMade('forward')}
                className={`flex-1 py-2 rounded-xl text-xs font-black transition ${
                  digitalChoiceMade === 'forward'
                    ? 'bg-rose-600 text-white'
                    : 'bg-slate-800 hover:bg-rose-900/50 text-rose-300 border border-rose-500/40'
                }`}
              >
                إرسال (Forward)
              </button>
              <button
                onClick={() => setDigitalChoiceMade('delete')}
                className={`flex-1 py-2 rounded-xl text-xs font-black transition ${
                  digitalChoiceMade === 'delete'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-emerald-900/60 hover:bg-emerald-800 text-emerald-300 border border-emerald-500'
                }`}
              >
                حذف وإيقاف الأذى 🛡️
              </button>
            </div>

          </div>

          {/* Explanation & Lessons learned for Digital Dilemma */}
          <div className="flex-1 max-w-lg space-y-4 text-right">
            <div className="bg-slate-50 border border-slate-200/80 p-6 rounded-3xl space-y-2">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                اختبار العالم الرقمي والخصوصية
              </span>
              <h3 className="text-lg font-black text-slate-900">
                أمانتك الرقمية عندما لا يراك أحد خلف الشاشة
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                {currentScenario.story}
              </p>
            </div>

            {digitalChoiceMade === 'delete' ? (
              <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-3xl space-y-2 text-right animate-fadeIn">
                <div className="flex items-center gap-2 text-emerald-700 font-black text-sm">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>انتصار قيمي حقيقي!</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  «أوقفتَ سلسلة الأذى، وحفظتَ سر أخيك وعرضه، وأثبتَّ أن التموضع الذاتي وقيمك ثابتة حتى في العالم الرقمي الافتراضي.»
                </p>
                <div className="pt-2 text-xs font-bold text-emerald-800">
                  القيمة التي تجلت: {currentScenario.targetValue}
                </div>
              </div>
            ) : digitalChoiceMade === 'forward' ? (
              <div className="bg-rose-50 border border-rose-200 p-6 rounded-3xl space-y-2 text-right animate-fadeIn">
                <div className="flex items-center gap-2 text-rose-700 font-black text-sm">
                  <AlertTriangle className="w-5 h-5" />
                  <span>ثمن رخيص كالحصى!</span>
                </div>
                <p className="text-xs text-rose-900 leading-relaxed font-medium">
                  «إعادة التوجيه لمجرد الضحك العابر تسببت في جرح مشاعر زميل وكسر قلبه، وتنازلت فيها عن أمانتك الرقمية من أجل مسايرة الكثرة.»
                </p>
              </div>
            ) : (
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-500 text-center font-medium">
                اضغط على أحد الزرين في الهاتف الذكي لمعرفة النتيجة القيمية للقرار.
              </div>
            )}
          </div>

        </div>
      ) : (
        /* Standard Visual Crossroads Scenario */
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 space-y-6 text-right shadow-sm">
          
          {/* Story Header */}
          <div className="bg-slate-50 border border-slate-200/80 p-6 rounded-3xl space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                📍 المكان: {currentScenario.location}
              </span>
              <span className="text-xs font-bold text-slate-500">
                القيمة المستهدفة: <strong className="text-slate-900">{currentScenario.targetValue}</strong>
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900">
              {currentScenario.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
              {currentScenario.context}
            </p>
            <p className="text-xs sm:text-sm text-slate-800 font-semibold leading-relaxed bg-white p-4 rounded-2xl border border-slate-200">
              💬 <strong>القصة والتحدي:</strong> {currentScenario.story}
            </p>
          </div>

          {/* Roleplay Roles (If Psychodrama) */}
          {currentScenario.roles && (
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <Users className="w-4 h-4 text-indigo-600" />
                <span>أدوار مسرحة القيم والسايكودراما (لعب أدوار صفية):</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {currentScenario.roles.map((r, i) => (
                  <span key={i} className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100 text-xs font-bold">
                    🎭 {r}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Crossroads Choice Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Cheap Reaction Card */}
            <button
              onClick={() => setChosenPath('cheap')}
              className={`p-5 rounded-3xl border text-right transition flex flex-col justify-between space-y-3 ${
                chosenPath === 'cheap'
                  ? 'bg-rose-50 border-rose-400 ring-2 ring-rose-300 shadow-sm'
                  : 'bg-white border-slate-200/90 hover:border-rose-300 shadow-2xs'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-xs font-black px-2.5 py-1 rounded-full bg-rose-100 text-rose-800 border border-rose-200">
                  {currentScenario.cheapReaction.title}
                </span>
                <span className="text-xl">🍂 🪨</span>
              </div>
              <div>
                <h4 className="text-sm font-black text-slate-900 mb-1">
                  {currentScenario.cheapReaction.action}
                </h4>
                <p className="text-xs text-rose-700 leading-relaxed font-medium">
                  {currentScenario.cheapReaction.outcome}
                </p>
              </div>
              <div className="text-[11px] font-bold text-rose-600 pt-2 border-t border-rose-100">
                الثمن: {currentScenario.cheapReaction.costText}
              </div>
            </button>

            {/* Noble Reaction Card */}
            <button
              onClick={() => setChosenPath('noble')}
              className={`p-5 rounded-3xl border text-right transition flex flex-col justify-between space-y-3 ${
                chosenPath === 'noble'
                  ? 'bg-emerald-50 border-emerald-400 ring-2 ring-emerald-300 shadow-sm'
                  : 'bg-white border-slate-200/90 hover:border-emerald-300 shadow-2xs'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-xs font-black px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                  {currentScenario.nobleReaction.title}
                </span>
                <span className="text-xl">💎 👑</span>
              </div>
              <div>
                <h4 className="text-sm font-black text-slate-900 mb-1">
                  {currentScenario.nobleReaction.action}
                </h4>
                <p className="text-xs text-emerald-800 leading-relaxed font-medium">
                  {currentScenario.nobleReaction.outcome}
                </p>
              </div>
              <div className="text-[11px] font-bold text-emerald-700 pt-2 border-t border-emerald-100">
                القيمة التي تجلت: {currentScenario.nobleReaction.valueEarned}
              </div>
            </button>

          </div>

          {/* Result Banner when picked */}
          {chosenPath && (
            <div
              className={`p-5 rounded-3xl border text-right animate-fadeIn flex items-center justify-between gap-4 ${
                chosenPath === 'noble'
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  : 'bg-rose-50 border-rose-200 text-rose-900'
              }`}
            >
              <div className="space-y-1">
                <div className="font-black text-sm text-slate-900">
                  {chosenPath === 'noble' ? '🌟 خيار الفرسان والتموضع الذاتي الأصيل!' : '⚠️ خيار التفريط ومجاراة الكثرة السلبية!'}
                </div>
                <p className="text-xs leading-relaxed font-medium">
                  {chosenPath === 'noble'
                    ? 'أثبتَّ أن قيمتك لا تُباع ولا تتغير بتغير الأماكن أو غياب الرقيب. هذه هي شخصية طالب التنوير.'
                    : 'التنازل عن النزاهة أو الرحمة من أجل كسب مؤقت هو استبدال لألماسة القيمة بحفنة حصى رخيصة.'}
                </p>
              </div>
              <button
                onClick={() => setChosenPath(null)}
                className="px-3.5 py-2 rounded-xl bg-white text-xs font-bold text-slate-700 border border-slate-200 shadow-2xs hover:bg-slate-50 shrink-0 transition"
              >
                إعادة المحاولة
              </button>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
