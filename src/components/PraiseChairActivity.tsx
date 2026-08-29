import React, { useState, useEffect } from 'react';
import { Users, Heart, Lightbulb, Send, Check } from 'lucide-react';
import { loadSavedState, saveState } from '../utils/storage';

interface PraiseEntry {
  id: string;
  studentName: string;
  praiseTexts: string[];
  date: string;
}

interface SuggestionEntry {
  id: string;
  studentName: string;
  grade: string;
  proposedValue: string;
  activityIdea: string;
  date: string;
}

const DEFAULT_PRAISE_LIST: PraiseEntry[] = [
  {
    id: 'p_demo_1',
    studentName: 'عمر خالد',
    praiseTexts: [
      'موقفه الشجاع في إعادة محفظة النقود التي وجدها عند المقصف.',
      'مبادرته الدائمة في مساعدة زملائه بحل مسائل الرياضيات الصعبة.',
      'هدوؤه وكظمه للغيظ عندما حدثت مشادة في ملعب كرة القدم.',
      'ابتسامته الصادقة وكلماته اللطيفة مع عامل النظافة يومياً.',
    ],
    date: 'اليوم',
  },
];

const DEFAULT_SUGGESTIONS: SuggestionEntry[] = [
  {
    id: 's_demo_1',
    studentName: 'فاطمة أحمد',
    grade: 'الصف الثامن',
    proposedValue: 'الشجاعة الأدبية والذب عن الغائب',
    activityIdea: 'تخصيص إذاعة مدرسية صامتة أو صندوق سري لفرسان النزاهة لتكريم المواقف النبيلة دون إحراج.',
    date: 'اليوم',
  },
];

export const PraiseChairActivity: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'praise' | 'partnership'>(() =>
    loadSavedState<'praise' | 'partnership'>('praise_active_tab', 'praise')
  );

  // Praise chair state
  const [praiseTargetName, setPraiseTargetName] = useState<string>(() =>
    loadSavedState<string>('praise_draft_target', '')
  );
  const [p1, setP1] = useState<string>(() => loadSavedState<string>('praise_draft_p1', ''));
  const [p2, setP2] = useState<string>(() => loadSavedState<string>('praise_draft_p2', ''));
  const [p3, setP3] = useState<string>(() => loadSavedState<string>('praise_draft_p3', ''));
  const [p4, setP4] = useState<string>(() => loadSavedState<string>('praise_draft_p4', ''));

  const [praiseList, setPraiseList] = useState<PraiseEntry[]>(() =>
    loadSavedState<PraiseEntry[]>('praise_list', DEFAULT_PRAISE_LIST)
  );

  // Partnership proposals state
  const [partnerStudent, setPartnerStudent] = useState<string>(() =>
    loadSavedState<string>('partner_draft_student', '')
  );
  const [partnerGrade, setPartnerGrade] = useState<string>(() =>
    loadSavedState<string>('partner_draft_grade', 'الصف السابع')
  );
  const [proposedValue, setProposedValue] = useState<string>(() =>
    loadSavedState<string>('partner_draft_value', '')
  );
  const [activityIdea, setActivityIdea] = useState<string>(() =>
    loadSavedState<string>('partner_draft_idea', '')
  );

  const [suggestions, setSuggestions] = useState<SuggestionEntry[]>(() =>
    loadSavedState<SuggestionEntry[]>('partner_suggestions', DEFAULT_SUGGESTIONS)
  );

  // Persistence Effects
  useEffect(() => {
    saveState('praise_active_tab', activeTab);
  }, [activeTab]);

  useEffect(() => {
    saveState('praise_list', praiseList);
  }, [praiseList]);

  useEffect(() => {
    saveState('partner_suggestions', suggestions);
  }, [suggestions]);

  useEffect(() => {
    saveState('praise_draft_target', praiseTargetName);
    saveState('praise_draft_p1', p1);
    saveState('praise_draft_p2', p2);
    saveState('praise_draft_p3', p3);
    saveState('praise_draft_p4', p4);
  }, [praiseTargetName, p1, p2, p3, p4]);

  useEffect(() => {
    saveState('partner_draft_student', partnerStudent);
    saveState('partner_draft_grade', partnerGrade);
    saveState('partner_draft_value', proposedValue);
    saveState('partner_draft_idea', activityIdea);
  }, [partnerStudent, partnerGrade, proposedValue, activityIdea]);

  const handleAddPraise = (e: React.FormEvent) => {
    e.preventDefault();
    if (!praiseTargetName.trim()) return;

    const texts = [p1, p2, p3, p4].filter((t) => t.trim().length > 0);
    if (texts.length === 0) return;

    const newEntry: PraiseEntry = {
      id: `p_${Date.now()}`,
      studentName: praiseTargetName.trim(),
      praiseTexts: texts,
      date: 'الآن',
    };

    setPraiseList((prev) => [newEntry, ...prev]);
    setPraiseTargetName('');
    setP1('');
    setP2('');
    setP3('');
    setP4('');
  };

  const handleAddSuggestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!proposedValue.trim()) return;

    const newSuggestion: SuggestionEntry = {
      id: `s_${Date.now()}`,
      studentName: partnerStudent.trim() || 'طالب مشارك',
      grade: partnerGrade,
      proposedValue: proposedValue.trim(),
      activityIdea: activityIdea.trim() || 'مقترح لتطوير تطبيق تذكرة في الصف والمدرسة.',
      date: 'الآن',
    };

    setSuggestions((prev) => [newSuggestion, ...prev]);
    setPartnerStudent('');
    setProposedValue('');
    setActivityIdea('');
  };

  return (
    <div className="w-full space-y-6 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="bg-white border border-slate-200/90 p-6 sm:p-8 rounded-3xl text-center space-y-3 shadow-sm relative overflow-hidden">
        <div className="flex items-center justify-center gap-2 flex-wrap">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-100">
            <Users className="w-4 h-4" />
            <span>الأنشطة التشاركية وصناعة الأثر (Elaborate)</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
            <Check className="w-3.5 h-3.5" />
            <span>يتم الحفظ تلقائياً في الموقع</span>
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
          كرسي الإطراء والإلهام وجلسة شركاء البناء
        </h2>
        <p className="text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
          «تعزيز الصورة الإيجابية للأقران، وإشراك الطلاب كقادة حقيقيين في تطوير برنامج القيم بمدارس التنوير.»
        </p>

        {/* Tab switcher */}
        <div className="pt-2 flex justify-center gap-3">
          <button
            onClick={() => setActiveTab('praise')}
            className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
              activeTab === 'praise'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>كرسي الإطراء والإلهام (Praise Chair)</span>
          </button>
          <button
            onClick={() => setActiveTab('partnership')}
            className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
              activeTab === 'partnership'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Lightbulb className="w-4 h-4" />
            <span>جلسة شركاء البناء (مقترحات الطلاب)</span>
          </button>
        </div>
      </div>

      {/* 1. Praise Chair Activity */}
      {activeTab === 'praise' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* Praise Form */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 space-y-4 text-right shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🪑</span>
                <div>
                  <h3 className="font-black text-base text-slate-900">جلسة كرسي الإطراء</h3>
                  <p className="text-[11px] text-slate-500">يجلس طالب في المنتصف ليذكر زملاؤه 4 مواقف نبيلة قام بها</p>
                </div>
              </div>
              <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-md font-bold">
                حفظ تلقائي ✓
              </span>
            </div>

            <form onSubmit={handleAddPraise} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">اسم الطالب الجالس على كرسي الإطراء:</label>
                <input
                  type="text"
                  required
                  placeholder="اسم الزميل..."
                  value={praiseTargetName}
                  onChange={(e) => setPraiseTargetName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs focus:border-indigo-500 focus:outline-none focus:bg-white transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-indigo-700 mb-1">1. موقف قيمي نبيل يذكره الزميل الأول:</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: ساعدني عندما تعثرت، أو صدقه عند الخطأ..."
                  value={p1}
                  onChange={(e) => setP1(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs focus:border-indigo-500 focus:outline-none focus:bg-white transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-indigo-700 mb-1">2. موقف نبيل يذكره الزميل الثاني:</label>
                <input
                  type="text"
                  placeholder="موقف آخر حقيقي..."
                  value={p2}
                  onChange={(e) => setP2(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs focus:border-indigo-500 focus:outline-none focus:bg-white transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-indigo-700 mb-1">3. موقف نبيل يذكره الزميل الثالث:</label>
                <input
                  type="text"
                  placeholder="موقف آخر حقيقي..."
                  value={p3}
                  onChange={(e) => setP3(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs focus:border-indigo-500 focus:outline-none focus:bg-white transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-indigo-700 mb-1">4. موقف نبيل يذكره الزميل الرابع:</label>
                <input
                  type="text"
                  placeholder="موقف رابع حقيقي..."
                  value={p4}
                  onChange={(e) => setP4(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs focus:border-indigo-500 focus:outline-none focus:bg-white transition"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-1.5 pt-2 transition"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>تسجيل بطاقة الإطراء والإلهام</span>
              </button>
            </form>
          </div>

          {/* Praise Feed & Cards */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-slate-800 text-sm">سجل الإطراءات والاعتزاز بالأقران</h3>
              <span className="text-xs text-slate-500 font-medium">{praiseList.length} سجلات مسجلة</span>
            </div>

            <div className="space-y-3">
              {praiseList.map((entry) => (
                <div
                  key={entry.id}
                  className="bg-white border border-slate-200/90 rounded-3xl p-5 text-right space-y-3 shadow-sm"
                >
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100 flex items-center justify-center font-bold text-sm">
                        🪑
                      </span>
                      <h4 className="font-black text-base text-slate-900">إطراء الزملاء للبطل: {entry.studentName}</h4>
                    </div>
                    <span className="text-[10px] text-slate-400 font-semibold">{entry.date}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {entry.praiseTexts.map((txt, i) => (
                      <div key={i} className="bg-slate-50 p-3 rounded-2xl border border-slate-100 flex items-start gap-2">
                        <span className="text-indigo-600 text-xs font-bold shrink-0">{i + 1}.</span>
                        <p className="text-xs text-slate-700 leading-relaxed font-medium">{txt}</p>
                      </div>
                    ))}
                  </div>

                  <div className="text-[11px] text-emerald-700 font-bold pt-1">
                    ✨ الأثر النفسي: تعزيز الصورة الإيجابية عن الذات وتحفيز استمرارية السلوك القويم.
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* 2. Partnership Proposals Section */}
      {activeTab === 'partnership' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* Proposal Submission Form */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 space-y-4 text-right shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-emerald-600" />
                <div>
                  <h3 className="font-black text-base text-slate-900">أنت شريك في بناء البرنامج</h3>
                  <p className="text-[11px] text-slate-500">قدم مقترحاتك لتطوير فعاليات تذكرة في مدرستنا</p>
                </div>
              </div>
              <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-md font-bold">
                حفظ تلقائي ✓
              </span>
            </div>

            <form onSubmit={handleAddSuggestion} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">اسمك (أو اسم مجموعتك):</label>
                <input
                  type="text"
                  placeholder="اسم الطالب أو المجموعة..."
                  value={partnerStudent}
                  onChange={(e) => setPartnerStudent(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs focus:border-emerald-500 focus:outline-none focus:bg-white transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">الصف:</label>
                <select
                  value={partnerGrade}
                  onChange={(e) => setPartnerGrade(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs focus:border-emerald-500 focus:outline-none focus:bg-white transition"
                >
                  <option value="الصف الرابع">الصف الرابع</option>
                  <option value="الصف الخامس">الصف الخامس</option>
                  <option value="الصف السادس">الصف السادس</option>
                  <option value="الصف السابع">الصف السابع</option>
                  <option value="الصف الثامن">الصف الثامن</option>
                  <option value="الصف التاسع">الصف التاسع</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-emerald-700 mb-1">قيمة هامة تقترح إضافتها للبرنامج:</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: الشجاعة الأدبية، الانضباط في الصف، حماية الخصوصية..."
                  value={proposedValue}
                  onChange={(e) => setProposedValue(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs focus:border-emerald-500 focus:outline-none focus:bg-white transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-emerald-700 mb-1">فكرة تطبيق أو نشاط مدرسي مقترح:</label>
                <textarea
                  rows={3}
                  required
                  placeholder="مثال: لجان طلابية لفض النزاعات في الملعب بروح رياضية، مسابقة أسبوعية..."
                  value={activityIdea}
                  onChange={(e) => setActivityIdea(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs focus:border-emerald-500 focus:outline-none focus:bg-white resize-none transition"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-1.5 transition"
              >
                <Send className="w-4 h-4" />
                <span>إرسال المقترح لفريق القيم بالمدارس</span>
              </button>
            </form>
          </div>

          {/* Proposals Feed */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-slate-800 text-sm">أفكار ومقترحات فرسان التنوير</h3>
              <span className="text-xs text-slate-500 font-medium">{suggestions.length} مقترحات مقدمة</span>
            </div>

            <div className="space-y-3">
              {suggestions.map((sug) => (
                <div
                  key={sug.id}
                  className="bg-white border border-slate-200/90 rounded-3xl p-5 text-right space-y-3 shadow-sm"
                >
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 font-bold text-xs">
                        {sug.grade}
                      </span>
                      <h4 className="font-extrabold text-sm text-slate-900">مقدم الفكرة: {sug.studentName}</h4>
                    </div>
                    <span className="text-[10px] text-slate-400 font-semibold">{sug.date}</span>
                  </div>

                  <div>
                    <span className="text-xs font-bold text-indigo-700 block mb-0.5">القيمة المقترحة:</span>
                    <p className="text-sm font-black text-slate-900">{sug.proposedValue}</p>
                  </div>

                  <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                    <span className="text-xs font-bold text-emerald-700 block mb-1">فكرة التطبيق المدرسي:</span>
                    <p className="text-xs text-slate-700 leading-relaxed font-medium">{sug.activityIdea}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
