import React, { useState, useEffect } from 'react';
import { LESSON_5E_STAGES, ELIOT_STANDARDS } from '../data/curriculumData';
import { StageId } from '../types';
import { FileText, Printer, CheckSquare, Clock, Users, Award, Shield, Layers, HelpCircle, Check } from 'lucide-react';
import { loadSavedState, saveState } from '../utils/storage';

interface TeacherGuidePlanProps {
  currentStage: StageId;
}

export const TeacherGuidePlan: React.FC<TeacherGuidePlanProps> = ({ currentStage }) => {
  const [activeSection, setActiveSection] = useState<'timeline' | 'eliot' | 'rubric' | 'differentiation' | 'reflection'>(() =>
    loadSavedState<'timeline' | 'eliot' | 'rubric' | 'differentiation' | 'reflection'>('teacher_active_sec', 'timeline')
  );

  // Reflection states
  const [successReflection, setSuccessReflection] = useState<string>(() =>
    loadSavedState<string>('teacher_refl_success', '')
  );
  const [challengesReflection, setChallengesReflection] = useState<string>(() =>
    loadSavedState<string>('teacher_refl_challenges', '')
  );
  const [improvementReflection, setImprovementReflection] = useState<string>(() =>
    loadSavedState<string>('teacher_refl_improvement', '')
  );
  const [reflectionSaved, setReflectionSaved] = useState<boolean>(false);

  // Self Checklist checkboxes
  const [selfChecklist, setSelfChecklist] = useState<boolean[]>(() =>
    loadSavedState<boolean[]>('teacher_student_self_checklist', [true, true, true, true])
  );

  useEffect(() => {
    saveState('teacher_active_sec', activeSection);
  }, [activeSection]);

  useEffect(() => {
    saveState('teacher_refl_success', successReflection);
    saveState('teacher_refl_challenges', challengesReflection);
    saveState('teacher_refl_improvement', improvementReflection);
  }, [successReflection, challengesReflection, improvementReflection]);

  useEffect(() => {
    saveState('teacher_student_self_checklist', selfChecklist);
  }, [selfChecklist]);

  const toggleChecklist = (idx: number) => {
    setSelfChecklist((prev) => {
      const updated = [...prev];
      updated[idx] = !updated[idx];
      return updated;
    });
  };

  const handleManualSaveReflection = () => {
    saveState('teacher_refl_success', successReflection);
    saveState('teacher_refl_challenges', challengesReflection);
    saveState('teacher_refl_improvement', improvementReflection);
    setReflectionSaved(true);
    setTimeout(() => setReflectionSaved(false), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  const isStage1 = currentStage === 'stage1';

  return (
    <div className="w-full space-y-6 animate-fadeIn">
      
      {/* Top Banner */}
      <div className="bg-white border border-slate-200/90 p-6 sm:p-8 rounded-3xl text-center space-y-3 shadow-sm relative overflow-hidden">
        <div className="flex items-center justify-center gap-2 flex-wrap">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-100">
            <FileText className="w-4 h-4" />
            <span>الدليل التربوي الشامل والتحضير المتكامل (معايير ELIOT الـ 18)</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
            <Check className="w-3.5 h-3.5" />
            <span>يتم الحفظ تلقائياً في الموقع</span>
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
          خطة اللقاء التعريفي الأول لبرنامج «تَذْكِرَة» القيمي (45 دقيقة)
        </h2>
        <p className="text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
          {isStage1
            ? 'خطة المرحلة الأولى (الصف 4 - 6): «ميزان الألماس والحصى: قِيمَتِي هِيَ أَثْمَنُ مَا أَمْلِك»'
            : 'خطة المرحلة الثانية (الصف 7 - 9): «معادلة القيم والتموضع الذاتي: هُوِيَّتِي القِيَمِيَّة ثَابِتَة لَا تَتَغَيَّر»'}
        </p>

        {/* Section Navigation Tabs & Print Button */}
        <div className="pt-3 flex flex-wrap justify-center items-center gap-2">
          <button
            onClick={() => setActiveSection('timeline')}
            className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition ${
              activeSection === 'timeline'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            ⏱️ سيناريو الحصة (5E - 45 دقيقة)
          </button>
          <button
            onClick={() => setActiveSection('eliot')}
            className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition ${
              activeSection === 'eliot'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            📋 معايير ELIOT الـ 18
          </button>
          <button
            onClick={() => setActiveSection('rubric')}
            className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition ${
              activeSection === 'rubric'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            📊 سلم التقدير وقائمة الشطب
          </button>
          <button
            onClick={() => setActiveSection('differentiation')}
            className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition ${
              activeSection === 'differentiation'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            🎯 مصفوفة التمايز والفروق
          </button>
          <button
            onClick={() => setActiveSection('reflection')}
            className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition ${
              activeSection === 'reflection'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            🧠 التأمل الذاتي للمعلم
          </button>
          <button
            onClick={handlePrint}
            className="px-3.5 py-2 rounded-2xl bg-white text-indigo-700 border border-indigo-200 hover:bg-indigo-50 text-xs font-bold flex items-center gap-1 shadow-xs transition"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>طباعة التحضير</span>
          </button>
        </div>
      </div>

      {/* Lesson Metadata Summary Box */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-5 text-right grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs shadow-sm">
        <div className="space-y-1">
          <span className="text-slate-500 block font-medium">المبحث:</span>
          <strong className="text-slate-900 font-black">التربية القيمية (تذكرة)</strong>
        </div>
        <div className="space-y-1">
          <span className="text-slate-500 block font-medium">المرحلة والصفوف:</span>
          <strong className="text-indigo-600 font-bold">{isStage1 ? 'الرابع - السادس الأساسي' : 'السابع - التاسع الأساسي'}</strong>
        </div>
        <div className="space-y-1">
          <span className="text-slate-500 block font-medium">زمن اللقاء:</span>
          <strong className="text-emerald-700 font-bold">45 دقيقة (75% نشاط الطلاب)</strong>
        </div>
        <div className="space-y-1">
          <span className="text-slate-500 block font-medium">المرجعية المعيارية:</span>
          <strong className="text-slate-800 font-bold">نموذج 5E + معايير ELIOT</strong>
        </div>
      </div>

      {/* 1. Timeline & 5E Scenario */}
      {activeSection === 'timeline' && (
        <div className="space-y-4 text-right">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-slate-900 text-base">
              سيناريو اللقاء الإجرائي بالدقائق (5E Instructional Model)
            </h3>
            <span className="text-xs text-indigo-700 font-bold bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
              إجمالي: 45 دقيقة
            </span>
          </div>

          <div className="space-y-4">
            {LESSON_5E_STAGES.map((stage, idx) => (
              <div
                key={stage.id}
                className="bg-white border border-slate-200/90 hover:border-indigo-200 rounded-3xl p-6 space-y-3 transition shadow-sm"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-xl bg-indigo-50 text-indigo-700 font-black text-xs flex items-center justify-center border border-indigo-100">
                      {idx + 1}
                    </span>
                    <h4 className="font-black text-base text-slate-900">{stage.name}</h4>
                    <span className="text-xs text-slate-400 font-mono">({stage.nameEn})</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-100">
                      جهد الطالب: {stage.studentMinutes} د
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 font-bold border border-indigo-100">
                      جهد المعلم: {stage.teacherMinutes} د
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-800 font-bold">
                      الإجمالي: {stage.durationMinutes} د
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  {stage.description}
                </p>

                {/* Steps */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2">
                  <div className="text-[11px] font-bold text-slate-500">الإجراءات والخطوات الصفية:</div>
                  <div className="space-y-1.5 text-xs">
                    {stage.steps.map((st, i) => (
                      <div key={i} className="flex items-start gap-2 text-slate-700 font-medium">
                        <span
                          className={`px-2 py-0.5 rounded-lg text-[10px] font-bold shrink-0 ${
                            st.actor === 'teacher' ? 'bg-indigo-100 text-indigo-800' : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {st.actor === 'teacher' ? 'المعلم' : 'الطلاب'}
                        </span>
                        <span className="leading-relaxed">{st.action}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-500 pt-1">
                  <span className="font-bold text-indigo-700">معايير ELIOT المستهدفة في هذه المرحلة:</span>
                  {stage.eliotStandards.map((stNum) => (
                    <span key={stNum} className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold border border-slate-200">
                      ELIOT #{stNum}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. ELIOT Standards Checklist */}
      {activeSection === 'eliot' && (
        <div className="space-y-4 text-right">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-slate-900 text-base">
              مصفوفة معايير أداة الملاحظة الصفية العالمية ELIOT (18 معياراً)
            </h3>
            <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">مطابقة لمعايير الاعتماد التربوي</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ELIOT_STANDARDS.map((std) => (
              <div
                key={std.number}
                className="bg-white border border-slate-200/90 p-5 rounded-3xl space-y-2.5 text-right shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100">
                    معيار ELIOT #{std.number}
                  </span>
                  <span className="text-[11px] text-slate-500 font-semibold">{std.domain}</span>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-relaxed">{std.text}</h4>
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-[11px] text-slate-700 leading-relaxed font-medium">
                  <strong className="text-indigo-800 block mb-0.5">الدليل الإجرائي الملموس داخل الصف:</strong>
                  {std.evidence}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Rubric & Self Checklist */}
      {activeSection === 'rubric' && (
        <div className="space-y-6 text-right">
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 space-y-4 shadow-sm">
            <h3 className="font-black text-base text-slate-900">
              أداة تقييم أداء المجموعة والالتزام القيمي (Cooperative Rubric)
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-right border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-700 border-b border-slate-200">
                    <th className="p-3 font-black">المعيار</th>
                    <th className="p-3 font-black text-emerald-700">متميز (4 نقاط)</th>
                    <th className="p-3 font-black text-indigo-700">جيد جداً (3 نقاط)</th>
                    <th className="p-3 font-black text-amber-700">مقبول (2 نقطتان)</th>
                    <th className="p-3 font-black text-rose-700">بحاجة لتحسين (1)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-600 font-medium">
                  <tr>
                    <td className="p-3 font-bold text-slate-900">نسبة التفاعل (75% للطلبة)</td>
                    <td className="p-3">شارك جميع الطلاب بحماس وقادوا الأنشطة بأنفسهم بحرية كاملة.</td>
                    <td className="p-3">شارك معظم الطلاب (4 من 5) بوضوح مع تدخل بسيط من المعلم.</td>
                    <td className="p-3">شارك نصف الطلاب وتطلب الأمر توجيهاً مستمراً من المعلم.</td>
                    <td className="p-3">انفرد طالب بالعمل وساد الصمت على بقية أفراد المجموعة.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-slate-900">تمثيل السلوك والسايكودراما</td>
                    <td className="p-3">قدمت المجموعة حلاً قيمياً عبقرياً يعكس التموضع الذاتي العميق.</td>
                    <td className="p-3">قدمت المجموعة حلاً مناسباً يميز بوضوح بين السلبي والإيجابي.</td>
                    <td className="p-3">تم تمثيل الموقف بصورة شكلية دون مناقشة للعمق القيمي.</td>
                    <td className="p-3">عجزت المجموعة عن تمثيل الموقف أو تحديد القيمة.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-slate-900">إدارة الوقت والانضباط</td>
                    <td className="p-3">التزام حديدي وصارم بالأدوار وإنهاء المهام قبل انتهاء الوقت.</td>
                    <td className="p-3">التزام جيد بالأدوار وتم إنهاء المهام في الوقت تماماً.</td>
                    <td className="p-3">فوضى جزئية وتم إنهاء العمل بعد الوقت المحدد بدقيقة.</td>
                    <td className="p-3">غياب لتوزيع الأدوار وساد تشتت الوقت والفوضى.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Student Self Checklist */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 space-y-3 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h4 className="font-black text-slate-900 text-sm">
                قائمة الشطب الفردية للتأمل والتقييم الذاتي للطالب (Self-Checklist)
              </h4>
              <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-md font-bold">
                حفظ تلقائي ✓
              </span>
            </div>

            <div className="space-y-2 text-xs text-slate-700 font-medium">
              {[
                'أستطيع أن أشرح لزملائي لماذا تعتبر القيم كالألماس النفيس وأن التخلي عنها كاستبدال الألماس بالحصى الرخيص.',
                'أستطيع تحديد المواقف اليومية التي تحتاج مني قراراً شجاعاً وسلوكاً قيمياً حتى لو لم يرني أحد.',
                'أستطيع أن أحدد قيمة واحدة تميز هويتي وتجعل والدي ومعلمي يفخرون بي في المدرسة والبيت.',
                'ألتزم بصدق بتنفيذ ومتابعة تحدي الأسبوع القيمي في بطاقة "تذكرة الالتزام" الخاصة بي.',
              ].map((text, idx) => (
                <label
                  key={idx}
                  onClick={() => toggleChecklist(idx)}
                  className={`flex items-start gap-2.5 p-3 rounded-2xl border transition cursor-pointer ${
                    selfChecklist[idx]
                      ? 'bg-emerald-50/60 border-emerald-300 text-slate-900'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={!!selfChecklist[idx]}
                    onChange={() => {}}
                    className="mt-0.5 rounded accent-emerald-600 w-4 h-4"
                  />
                  <span>{text}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. Differentiation Matrix */}
      {activeSection === 'differentiation' && (
        <div className="space-y-4 text-right">
          <h3 className="font-black text-slate-900 text-base">
            مصفوفة التمايز وتلبية الفروق الفردية (Differentiation Matrix - ELIOT 7)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white border border-indigo-200 p-6 rounded-3xl space-y-3 shadow-sm">
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                المتميزون قيميّاً وقياديّاً
              </span>
              <h4 className="text-sm font-black text-slate-900">فرسان التأثير والقيادة</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                <strong>الإجراء والدعم:</strong> تكليفهم بقيادة السايكودراما المعقدة، وقيادة المناظرات الأكاديمية حول التموضع الذاتي، وصياغة مقترحات تطوير البرنامج.
              </p>
              <div className="text-[11px] text-indigo-800 bg-indigo-50/70 p-3 rounded-2xl border border-indigo-100 font-medium">
                <strong>المخرج المتوقع:</strong> إنتاج مشهد مسرحي مبتكر يعالج قضية معقدة كالتنمر الرقمي.
              </div>
            </div>

            <div className="bg-white border border-emerald-200 p-6 rounded-3xl space-y-3 shadow-sm">
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                المسار العام (المتوسط)
              </span>
              <h4 className="text-sm font-black text-slate-900">رواد التطبيق المنهجي</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                <strong>الإجراء والدعم:</strong> تنفيذ الأنشطة المنهجية الاعتيادية: إلصاق ثمار القيم على الشجرة، تعبئة بطاقة الهوية، والمشاركة كعناصر فاعلة في المشاهد.
              </p>
              <div className="text-[11px] text-emerald-800 bg-emerald-50/70 p-3 rounded-2xl border border-emerald-100 font-medium">
                <strong>المخرج المتوقع:</strong> شجرة قيم مكتملة وبطاقة هوية وتذكرة التزام دقيقة.
              </div>
            </div>

            <div className="bg-white border border-amber-200 p-6 rounded-3xl space-y-3 shadow-sm">
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-100">
                الخجولون أو ذوو الصعوبات
              </span>
              <h4 className="text-sm font-black text-slate-900">أبطال الاندماج والتعزيز</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                <strong>الإجراء والدعم:</strong> تقديم بطاقات مصورة مدعمة بمواقف بصرية سهلة، وتكليفهم بأدوار آمنة (حارس المواد، ضبط الوقت)، ودعمهم في كرسي الإطراء.
              </p>
              <div className="text-[11px] text-amber-800 bg-amber-50/70 p-3 rounded-2xl border border-amber-100 font-medium">
                <strong>المخرج المتوقع:</strong> التعبير الصادق عن القيمة والمشاركة الآمنة دون ضغط.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. Post-Lesson Teacher Reflection */}
      {activeSection === 'reflection' && (
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 space-y-4 text-right shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🧠</span>
              <div>
                <h3 className="font-black text-base text-slate-900">قسم التأمل الذاتي والتقييم اللاحق للمعلم</h3>
                <p className="text-[11px] text-slate-500 font-medium">يُحفظ تلقائياً في المتصفح لضمان التغذية الراجعة المستمرة</p>
              </div>
            </div>
            <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-md font-bold">
              حفظ تلقائي ✓
            </span>
          </div>

          <div className="space-y-4 text-xs sm:text-sm">
            <div className="space-y-1.5">
              <label className="font-bold text-slate-800 block">
                1. أبرز نجاحات اللقاء التفاعلية (نسبة الـ 75% للطلاب):
              </label>
              <textarea
                rows={2}
                value={successReflection}
                onChange={(e) => setSuccessReflection(e.target.value)}
                placeholder="كيف استجاب الطلاب لتجربة ميزان الألماس والحصى الحسية؟ وهل نجحت شارات الأدوار في تقليل تدخل المعلم؟"
                className="w-full p-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 text-xs focus:border-indigo-500 focus:bg-white focus:outline-none resize-none transition"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-800 block">
                2. التحديات السلوكية أو الإدارية أثناء التطبيق:
              </label>
              <textarea
                rows={2}
                value={challengesReflection}
                onChange={(e) => setChallengesReflection(e.target.value)}
                placeholder="هل التزم الطلاب بمؤقتات الساعة الرقمية في المجموعات؟ هل واجه بعض الطلاب خجلاً في كرسي الإطراء؟"
                className="w-full p-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 text-xs focus:border-indigo-500 focus:bg-white focus:outline-none resize-none transition"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-800 block">
                3. خطة التحسين والتطوير للقاء القادم:
              </label>
              <textarea
                rows={2}
                value={improvementReflection}
                onChange={(e) => setImprovementReflection(e.target.value)}
                placeholder="كيف سأعزز ثقة الطلاب المنطوين؟ وما هي آليات المتابعة لتذاكر الالتزام الأسبوعية؟"
                className="w-full p-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 text-xs focus:border-indigo-500 focus:bg-white focus:outline-none resize-none transition"
              />
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <button
              onClick={handleManualSaveReflection}
              className="px-6 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>{reflectionSaved ? 'تم حفظ التعديلات!' : 'تأكيد وحفظ التأمل الذاتي'}</span>
            </button>
            {reflectionSaved && (
              <span className="text-xs text-emerald-700 font-bold">
                ✓ تم حفظ الملاحظات في المتصفح بنجاح!
              </span>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
