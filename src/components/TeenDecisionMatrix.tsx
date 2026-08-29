import React, { useState, useEffect } from 'react';
import { Compass, ShieldCheck, TrendingUp, AlertTriangle, CheckCircle, RefreshCw, Zap, Award, Target, Flame } from 'lucide-react';
import { loadSavedState, saveState } from '../utils/storage';

interface Dilemma {
  id: string;
  title: string;
  category: string;
  shortScenario: string;
  context: string;
  choiceShortTerm: {
    title: string;
    action: string;
    immediateGain: string;
    hiddenCost: string;
    metrics: { selfRespect: number; reputation: number; peaceOfMind: number; leadership: number };
  };
  choiceLongTerm: {
    title: string;
    action: string;
    immediateChallenge: string;
    strategicGain: string;
    metrics: { selfRespect: number; reputation: number; peaceOfMind: number; leadership: number };
  };
  takeawayQuote: string;
}

const TEEN_DILEMMAS: Dilemma[] = [
  {
    id: 'digital_clout',
    title: '1. الشهرة الرقمية العابرة أم الأمانة وحفظ كرامة الصديق؟',
    category: 'الفضاء الرقمي والسوشيال ميديا',
    shortScenario: 'وصلك فيديو محرج تم تصويره سراً لزميلك في الصف، واقترح أصدقاؤك نشره ليصبح "تريند" ويجلب آلاف المشاهدات.',
    context: 'في عصر السوشيال ميديا، يسهل التضحية بمشاعر الآخرين من أجل لحظة شهرة افتراضية أو ضحك جماعي عابر.',
    choiceShortTerm: {
      title: 'مقايضة رخيصة: نشر الفيديو لكسب التفاعل والشهرة',
      action: 'إعادة نشر المقطع وإرساله للمجموعات لجذب الانتباه والظهور بمظهر صانع المحتوى المضحك.',
      immediateGain: 'ضحكات مؤقتة، إعجابات وإشعارات سريعة، رضا الشلة في تلك الليلة.',
      hiddenCost: 'كسر قلب إنسان بريء، فقدان الأمانة والرجولة، الوقوع في الجريمة الرقمية والإثم، وسقوط مكانتك وهيبتك القيمية.',
      metrics: { selfRespect: 20, reputation: 25, peaceOfMind: 15, leadership: 10 },
    },
    choiceLongTerm: {
      title: 'تموضع قيادي: حذف المقطع وحماية خصوصية الزميل',
      action: 'حذف المقطع فوراً، وتنبيه الأصدقاء بحزم بأن كرامة الزملاء ليست مادة للتسلية، والمؤمن حفيظ على سر أخيه.',
      immediateChallenge: 'قد يصفك البعض بالمبالغة أو "عدم المسايرة" في اللحظة الأولى.',
      strategicGain: 'احترام عميق من الجميع، راحة ضمير مطلقة، ثبات على المروءة، وبناء شخصية قيادية لا تنجرف مع التفاهة.',
      metrics: { selfRespect: 95, reputation: 90, peaceOfMind: 100, leadership: 95 },
    },
    takeawayQuote: '«قيمة الإنسان لا تقاس بعدد المشاهدات والإعجابات، بل بنبل ما يحميه من أعراض الناس عندما لا يراه أحد.»',
  },
  {
    id: 'exam_shortcut',
    title: '2. المعدل المزيف أم الشرف الأكاديمي والنزاهة الحقة؟',
    category: 'النزاهة الأكاديمية والمستقبل المهني',
    shortScenario: 'قبل اختبار مصيري، قام أحد الطلاب بتسريب أسئلة الامتحان في مجموعة سرية، ودعاك للمشاركة فيها لتضمن العلامة الكاملة دون تعب.',
    context: 'الرغبة في التفوق سهلة الإغراء، لكن التفوق المغشوش هو بناء وهمي ينهار عند أول محك حقيقي في الجامعة والحياة.',
    choiceShortTerm: {
      title: 'مقايضة رخيصة: الاستفادة من التسريب والغش',
      action: 'الاطلاع على الإجابات المسربة ودخول الامتحان بثقة مصطنعة للحصول على علامة عالية بلا جهد.',
      immediateGain: 'درجة مرتفعة على ورقة الامتحان وتصفيق سطحي مؤقت.',
      hiddenCost: 'شعور داخلي بالاحتيال والخداع، سرقة لجهد المجتهدين، تعويد النفس على التواكل والسرقة الفكرية.',
      metrics: { selfRespect: 15, reputation: 30, peaceOfMind: 10, leadership: 20 },
    },
    choiceLongTerm: {
      title: 'تموضع قيادي: الاعتماد على الجهد الشخصي ورفض الغش',
      action: 'الخروج من المجموعة، والاعتماد التام على ما ذاكرته وفهمته بصدق، والتسليم بأن البركة في الرزق الحلال.',
      immediateChallenge: 'قد تنقص علامتك درجتين عن الغشاشين في ورقة الامتحان الحالية.',
      strategicGain: 'عقل متقد حقيقي، فخر بالذات لا تشوبه شائبة، ثقة الأهل والمعلمين، وأساس متين يبني مستقبلاً علمياً لامعاً.',
      metrics: { selfRespect: 100, reputation: 95, peaceOfMind: 95, leadership: 90 },
    },
    takeawayQuote: '«العلامة المغشوشة تمنحك ورقة، لكن الصدق والنزاهة يمنحانك شخصية لا تُهزم ومستقبلاً آمناً.»',
  },
  {
    id: 'peer_pressure_bullying',
    title: '3. مسايرة ضغط الشلة أم الشجاعة الأدبية في نصرة المظلوم؟',
    category: 'القيادة والشجاعة الأدبية',
    shortScenario: 'بدأت شلة من الأصدقاء أصحاب النفوذ في المدرسة بالتنمر والسخرية من طالب هادئ جديد بسبب مظهره أو لكنته.',
    context: 'الخوف من النبذ الاجتماعي يدفع الكثيرين للصمت أو مشاركة المتنمرين، والقيادة الحقيقية تبدأ بكسر هذا القطيع.',
    choiceShortTerm: {
      title: 'مقايضة رخيصة: الضحك معهم أو التزام الصمت الجبان',
      action: 'الضحك مع الشلة أو التظاهر بعدم رؤية الموقف خوفاً من أن يوجهوا سخريتهم إليك.',
      immediateGain: 'البقاء ضمن "حماية الشلة" وتجنب الصدام في تلك اللحظة.',
      hiddenCost: 'مشاركة في الظلم وكسر كرامة إنسان، شعور بالجبن وتنازل عن المبادئ لإرضاء بشر مثلك.',
      metrics: { selfRespect: 25, reputation: 35, peaceOfMind: 20, leadership: 15 },
    },
    choiceLongTerm: {
      title: 'تموضع قيادي: التدخل بحكمة وشجاعة لإيقاف السخرية',
      action: 'الوقوف إلى جانب الزميل ومخاطبة الشلة بأدب وحزم: "يا شباب، هذا لا يليق بنا ولا بفروسيتنا، فلنحترم بعضنا".',
      immediateChallenge: 'لحظة توتر وصمت قد تضطر فيها لمواجهة نظرات الاستغراب من بعض المتنمرين.',
      strategicGain: 'إنقاذ نفس بشرية من الألم، فرض هيبة شخصيتك كقائد حقيقي صاحب مبدأ، ونيل احترام الصف بأسره.',
      metrics: { selfRespect: 95, reputation: 100, peaceOfMind: 90, leadership: 100 },
    },
    takeawayQuote: '«ليس الشجاع من يقسو على الضعيف، بل الشجاع من يقف في وجه الأقوياء لينصر الحق.»',
  },
  {
    id: 'material_flex',
    title: '4. التباهي بالمقتنيات المادية أم الجوهر الإنساني والأثر الحقيقي؟',
    category: 'النضج النفسي وتواضع الكبار',
    shortScenario: 'تمتلك أحدث الأجهزة والمقتنيات الفاخرة، والجميع في مجلس الأصدقاء يتنافسون في استعراض ماركات ملابسهم وهواتفهم.',
    context: 'في سن المراهقة، يقع الكثيرون في فخ اعتبار السعر الخارجي هو مقياس قيمة الإنسان بدلاً من عقله ونبله.',
    choiceShortTerm: {
      title: 'مقايضة رخيصة: الاستعراض والتعالي على الآخرين',
      action: 'المشاركة في سباق التباهي والتفاخر بأسعار مقتنياتك وإشعار من لا يملكونها بالنقص والدونية.',
      immediateGain: 'إشباع لحظي لغرور النفس ولفت أنظار الباحثين عن المظاهر السطحية.',
      hiddenCost: 'كسر خواطر الزملاء، خلق بيئة من الحسد والسطحية، والاعتماد على أشياء زائلة لإثبات قيمتك.',
      metrics: { selfRespect: 30, reputation: 40, peaceOfMind: 25, leadership: 20 },
    },
    choiceLongTerm: {
      title: 'تموضع قيادي: التواضع والتركيز على نقاء التعامل والفكر',
      action: 'التعامل بأعلى درجات البساطة، مساعدة الزملاء، والاعتزاز بالقيم والثقافة لا بالماركات والمظاهر.',
      immediateChallenge: 'الابتعاد عن مجاراة الأحاديث السطحية التي تتمحور فقط حول الاستهلاك.',
      strategicGain: 'محبة صادقة من القلوب، شخصية جذابة ومؤثرة تفرض احترامها بعقلها وخلقها أينما حلت.',
      metrics: { selfRespect: 90, reputation: 95, peaceOfMind: 95, leadership: 90 },
    },
    takeawayQuote: '«قيمتك بما تضيفه للعالم من خير ونفع، لا بما ترتديه أو تحمله في جيبك.»',
  },
];

export const TeenDecisionMatrix: React.FC = () => {
  const [selectedDilemmaId, setSelectedDilemmaId] = useState<string>(() =>
    loadSavedState<string>('teen_selected_dilemma', 'digital_clout')
  );
  const [chosenPath, setChosenPath] = useState<'short' | 'long' | null>(() =>
    loadSavedState<'short' | 'long' | null>('teen_chosen_path', null)
  );

  useEffect(() => {
    saveState('teen_selected_dilemma', selectedDilemmaId);
  }, [selectedDilemmaId]);

  useEffect(() => {
    saveState('teen_chosen_path', chosenPath);
  }, [chosenPath]);

  const dilemma = TEEN_DILEMMAS.find((d) => d.id === selectedDilemmaId) || TEEN_DILEMMAS[0];

  const currentMetrics =
    chosenPath === 'short'
      ? dilemma.choiceShortTerm.metrics
      : chosenPath === 'long'
      ? dilemma.choiceLongTerm.metrics
      : { selfRespect: 50, reputation: 50, peaceOfMind: 50, leadership: 50 };

  return (
    <div className="w-full space-y-6 animate-fadeIn text-right">
      
      {/* Header Banner for Older Students */}
      <div className="bg-white border border-slate-200/90 p-6 sm:p-8 rounded-3xl space-y-3 shadow-sm relative overflow-hidden text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-black border border-indigo-100">
          <Compass className="w-4 h-4 text-indigo-600" />
          <span>مصفوفة التموضع الذاتي ومقايضة القرارات (Strategic Decision Matrix)</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
          بوصلة النزاهة: معادلة المكسب اللحظي مقابل الأثر الاستراتيجي
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
          «في الحياة لا توجد قرارات مجانية.. كل قرار تتخذه هو مقايضة إما أن تبني بها هيبتك وكرامتك، أو تفرط فيها من أجل مكسب لحظي رخيص.»
        </p>
      </div>

      {/* Dilemma Selector Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {TEEN_DILEMMAS.map((item) => {
          const isSelected = item.id === dilemma.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setSelectedDilemmaId(item.id);
                setChosenPath(null);
              }}
              className={`px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition border shrink-0 flex items-center gap-2 ${
                isSelected
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Target className="w-4 h-4" />
              <span>{item.title}</span>
            </button>
          );
        })}
      </div>

      {/* Main Dilemma Simulation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left 2 Columns: Dilemma Scenario & Choice Cards */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Situation Box */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 space-y-3 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                🏷️ {dilemma.category}
              </span>
              <span className="text-xs font-bold text-indigo-600">
                موقف حقيقي من واقع الحياة المدرسية
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-black text-slate-900">
              {dilemma.title}
            </h3>

            <p className="text-xs sm:text-sm text-slate-700 bg-slate-50 p-4 rounded-2xl border border-slate-200/80 leading-relaxed font-medium">
              💬 <strong>السيناريو:</strong> {dilemma.shortScenario}
            </p>

            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              🔍 <strong>العمق النفسي للموقف:</strong> {dilemma.context}
            </p>
          </div>

          {/* Interactive Trade-off Choice Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* 1. Short-term Cheap Choice */}
            <div
              onClick={() => setChosenPath('short')}
              className={`p-6 rounded-3xl border-2 cursor-pointer transition-all duration-200 flex flex-col justify-between space-y-4 text-right ${
                chosenPath === 'short'
                  ? 'border-rose-500 bg-rose-50/70 ring-2 ring-rose-300 shadow-md'
                  : 'border-slate-200 bg-white hover:border-rose-300 hover:bg-rose-50/20'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black px-2.5 py-1 rounded-full bg-rose-100 text-rose-800 border border-rose-200">
                    ⚠️ مقايضة المكسب اللحظي السريع
                  </span>
                  <span className="text-xl">🍂 ⚡</span>
                </div>
                <h4 className="text-sm sm:text-base font-black text-slate-900">
                  {dilemma.choiceShortTerm.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {dilemma.choiceShortTerm.action}
                </p>
              </div>

              <div className="space-y-2 pt-3 border-t border-rose-100/80 text-xs">
                <div className="bg-white/80 p-2.5 rounded-xl border border-rose-100">
                  <div className="text-[11px] font-bold text-amber-700 mb-0.5">✨ الإغراء السريع (Dopamine):</div>
                  <div className="text-slate-700 font-medium">{dilemma.choiceShortTerm.immediateGain}</div>
                </div>
                <div className="bg-rose-100/50 p-2.5 rounded-xl border border-rose-200 text-rose-900">
                  <div className="text-[11px] font-black text-rose-800 mb-0.5">💥 الثمن الخفي الحقيقي (Loss):</div>
                  <div className="font-semibold">{dilemma.choiceShortTerm.hiddenCost}</div>
                </div>
              </div>

              <button
                type="button"
                className={`w-full py-2.5 rounded-xl text-xs font-black transition ${
                  chosenPath === 'short'
                    ? 'bg-rose-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-rose-100'
                }`}
              >
                {chosenPath === 'short' ? '✓ تم تحديد خيار التنازل' : 'اختر هذا المسار للاختبار'}
              </button>
            </div>

            {/* 2. Strategic Long-term Integrity Choice */}
            <div
              onClick={() => setChosenPath('long')}
              className={`p-6 rounded-3xl border-2 cursor-pointer transition-all duration-200 flex flex-col justify-between space-y-4 text-right ${
                chosenPath === 'long'
                  ? 'border-emerald-500 bg-emerald-50/70 ring-2 ring-emerald-300 shadow-md'
                  : 'border-slate-200 bg-white hover:border-emerald-300 hover:bg-emerald-50/20'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                    👑 خيار التموضع والكرامة الاستراتيجية
                  </span>
                  <span className="text-xl">💎 🛡️</span>
                </div>
                <h4 className="text-sm sm:text-base font-black text-slate-900">
                  {dilemma.choiceLongTerm.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {dilemma.choiceLongTerm.action}
                </p>
              </div>

              <div className="space-y-2 pt-3 border-t border-emerald-100/80 text-xs">
                <div className="bg-white/80 p-2.5 rounded-xl border border-emerald-100">
                  <div className="text-[11px] font-bold text-slate-600 mb-0.5">⏳ التحدي اللحظي (Friction):</div>
                  <div className="text-slate-700 font-medium">{dilemma.choiceLongTerm.immediateChallenge}</div>
                </div>
                <div className="bg-emerald-100/60 p-2.5 rounded-xl border border-emerald-200 text-emerald-900">
                  <div className="text-[11px] font-black text-emerald-800 mb-0.5">🌟 العائد الاستراتيجي الدائم (Identity):</div>
                  <div className="font-semibold">{dilemma.choiceLongTerm.strategicGain}</div>
                </div>
              </div>

              <button
                type="button"
                className={`w-full py-2.5 rounded-xl text-xs font-black transition ${
                  chosenPath === 'long'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-emerald-100'
                }`}
              >
                {chosenPath === 'long' ? '✓ تم تحديد خيار المبادئ' : 'اختر هذا المسار للاختبار'}
              </button>
            </div>

          </div>

          {/* Strategic Takeaway Banner */}
          <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 text-white p-6 rounded-3xl shadow-md space-y-2 border border-indigo-800">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
              <Zap className="w-4 h-4" />
              <span>خلاصة التموضع الذاتي:</span>
            </div>
            <p className="text-sm sm:text-base font-bold leading-relaxed font-serif text-slate-100">
              {dilemma.takeawayQuote}
            </p>
          </div>

        </div>

        {/* Right 1 Column: Live Character Radar & Impact Meters */}
        <div className="space-y-6">
          
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 space-y-6 shadow-sm">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-indigo-600" />
                <h4 className="font-black text-sm text-slate-900">مؤشر رصيدك القيمي</h4>
              </div>
              <span className="text-[11px] font-bold text-slate-500">
                {chosenPath === 'long' ? '📈 نمو متصاعد' : chosenPath === 'short' ? '📉 نزيف قيمي' : '⚖️ في حالة تقييم'}
              </span>
            </div>

            {/* Metrics Bars */}
            <div className="space-y-4">
              
              {/* 1. Self Respect */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-700">عزة النفس واحترام الذات (Self-Respect)</span>
                  <span className={currentMetrics.selfRespect >= 70 ? 'text-emerald-600 font-black' : 'text-rose-600 font-black'}>
                    {currentMetrics.selfRespect}%
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 rounded-full ${
                      currentMetrics.selfRespect >= 70 ? 'bg-emerald-500' : 'bg-rose-500'
                    }`}
                    style={{ width: `${currentMetrics.selfRespect}%` }}
                  />
                </div>
              </div>

              {/* 2. Credibility */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-700">المصداقية والسمعة المستدامة (Credibility)</span>
                  <span className={currentMetrics.reputation >= 70 ? 'text-emerald-600 font-black' : 'text-rose-600 font-black'}>
                    {currentMetrics.reputation}%
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 rounded-full ${
                      currentMetrics.reputation >= 70 ? 'bg-emerald-500' : 'bg-rose-500'
                    }`}
                    style={{ width: `${currentMetrics.reputation}%` }}
                  />
                </div>
              </div>

              {/* 3. Peace of Mind */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-700">راحة البال والضمير (Peace of Mind)</span>
                  <span className={currentMetrics.peaceOfMind >= 70 ? 'text-emerald-600 font-black' : 'text-rose-600 font-black'}>
                    {currentMetrics.peaceOfMind}%
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 rounded-full ${
                      currentMetrics.peaceOfMind >= 70 ? 'bg-emerald-500' : 'bg-rose-500'
                    }`}
                    style={{ width: `${currentMetrics.peaceOfMind}%` }}
                  />
                </div>
              </div>

              {/* 4. Leadership */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-700">الأثر القيادي الحقيقي (Leadership Impact)</span>
                  <span className={currentMetrics.leadership >= 70 ? 'text-emerald-600 font-black' : 'text-rose-600 font-black'}>
                    {currentMetrics.leadership}%
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 rounded-full ${
                      currentMetrics.leadership >= 70 ? 'bg-emerald-500' : 'bg-rose-500'
                    }`}
                    style={{ width: `${currentMetrics.leadership}%` }}
                  />
                </div>
              </div>

            </div>

            {/* Diagnostic Message */}
            <div
              className={`p-4 rounded-2xl border text-xs leading-relaxed font-medium transition-all ${
                chosenPath === 'long'
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                  : chosenPath === 'short'
                  ? 'bg-rose-50 border-rose-200 text-rose-950'
                  : 'bg-slate-50 border-slate-200 text-slate-600'
              }`}
            >
              {chosenPath === 'long' && (
                <div>
                  <strong className="block font-black text-emerald-800 mb-1">🌟 تموضع العظماء والفرسان:</strong>
                  تحملت مشقة اللحظة الأولى لتكسب حصانة دائمة وسمعة نقية لا تشترى بكنوز الأرض. هذه هي الشخصية التنويرية الاستثنائية.
                </div>
              )}
              {chosenPath === 'short' && (
                <div>
                  <strong className="block font-black text-rose-800 mb-1">⚠️ فخ الانحدار والتبعية:</strong>
                  تنازلت عن مبادئك لإرضاء نزوة عابرة أو ضغط الشلة؛ النتيجة هي تأنيب ضمير ونزيف مستمر في احترامك لذاتك.
                </div>
              )}
              {!chosenPath && (
                <div>
                  اضغط على أحد المسارين (المكسب السريع أو التموضع القيادي) لمشاهدة تأثير القرار على مؤشرات شخصيتك ومستقبلك.
                </div>
              )}
            </div>

            {chosenPath && (
              <button
                onClick={() => setChosenPath(null)}
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>إعادة ضبط الميزان</span>
              </button>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};
