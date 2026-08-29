import React, { useState, useEffect } from 'react';
import { StageId } from '../types';
import { Award, Ticket, Printer, CheckCircle, Sparkles, User, Calendar, Edit3, ShieldCheck, Check } from 'lucide-react';
import { loadSavedState, saveState } from '../utils/storage';

interface IdentityCardAndTicketProps {
  currentStage: StageId;
}

export const IdentityCardAndTicket: React.FC<IdentityCardAndTicketProps> = ({ currentStage }) => {
  const [activeSubTab, setActiveSubTab] = useState<'ticket' | 'identity'>(() =>
    loadSavedState<'ticket' | 'identity'>('id_active_subtab', 'ticket')
  );

  // Identity Card State
  const [studentName, setStudentName] = useState<string>(() =>
    loadSavedState<string>('student_name', 'طالب تنويري متميز')
  );
  const [gradeSection, setGradeSection] = useState<string>(() =>
    loadSavedState<string>(
      'student_grade_section',
      currentStage === 'stage1' ? 'الصف الخامس (أ)' : 'الصف الثامن (ب)'
    )
  );
  const [selectedAvatar, setSelectedAvatar] = useState<string>(() =>
    loadSavedState<string>('student_avatar', '🎓')
  );
  const [trait1, setTrait1] = useState<string>(() =>
    loadSavedState<string>('student_trait1', 'الصدق والشجاعة في قول الحق')
  );
  const [trait2, setTrait2] = useState<string>(() =>
    loadSavedState<string>('student_trait2', 'الأمانة وحفظ ما ليس لي')
  );
  const [trait3, setTrait3] = useState<string>(() =>
    loadSavedState<string>('student_trait3', 'مساعدة زملائي وإيثارهم')
  );
  const [prideReason, setPrideReason] = useState<string>(() =>
    loadSavedState<string>(
      'student_pride_reason',
      'لأن قيمي هي هويتي الحقيقية التي ترضي ربي وترفع قدري بين الناس.'
    )
  );

  // Commitment Ticket State
  const [ticketValue, setTicketValue] = useState<string>(() =>
    loadSavedState<string>('ticket_value', 'الصدق والشجاعة الأدبية')
  );
  const [ticketAction, setTicketAction] = useState<string>(() =>
    loadSavedState<string>(
      'ticket_action',
      'الاعتراف بالخطأ فوراً دون تقديم أعذار أو إلقاء اللوم على غيري.'
    )
  );
  const [ticketSuccessCriteria, setTicketSuccessCriteria] = useState<string>(() =>
    loadSavedState<string>(
      'ticket_success_criteria',
      'عندما أقول الحقيقة كاملة في أصعب المواقف وأشعر براحة الضمير.'
    )
  );
  const [checkedDays, setCheckedDays] = useState<boolean[]>(() =>
    loadSavedState<boolean[]>('ticket_checked_days', [true, true, false, false, false, false, false])
  );

  // Real-time persistence effects
  useEffect(() => {
    saveState('id_active_subtab', activeSubTab);
  }, [activeSubTab]);

  useEffect(() => {
    saveState('student_name', studentName);
  }, [studentName]);

  useEffect(() => {
    saveState('student_grade_section', gradeSection);
  }, [gradeSection]);

  useEffect(() => {
    saveState('student_avatar', selectedAvatar);
  }, [selectedAvatar]);

  useEffect(() => {
    saveState('student_trait1', trait1);
  }, [trait1]);

  useEffect(() => {
    saveState('student_trait2', trait2);
  }, [trait2]);

  useEffect(() => {
    saveState('student_trait3', trait3);
  }, [trait3]);

  useEffect(() => {
    saveState('student_pride_reason', prideReason);
  }, [prideReason]);

  useEffect(() => {
    saveState('ticket_value', ticketValue);
  }, [ticketValue]);

  useEffect(() => {
    saveState('ticket_action', ticketAction);
  }, [ticketAction]);

  useEffect(() => {
    saveState('ticket_success_criteria', ticketSuccessCriteria);
  }, [ticketSuccessCriteria]);

  useEffect(() => {
    saveState('ticket_checked_days', checkedDays);
  }, [checkedDays]);

  const toggleDay = (index: number) => {
    setCheckedDays((prev) => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full space-y-6 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="bg-white border border-slate-200/90 p-6 sm:p-8 rounded-3xl text-center space-y-3 shadow-sm relative overflow-hidden">
        <div className="flex items-center justify-center gap-2 flex-wrap">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-100">
            <Award className="w-4 h-4" />
            <span>تطبيقات التموضع الذاتي والتعهد السلوكي</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
            <Check className="w-3.5 h-3.5" />
            <span>يتم الحفظ تلقائياً في الموقع</span>
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
          بطاقة الهوية القيمية وتذكرة الالتزام الأسبوعية
        </h2>
        <p className="text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
          «القيم لا تُحفظ في الكتب.. القيم تُعاش في السلوك اليومي»
        </p>

        {/* Sub-tab navigation */}
        <div className="pt-2 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => setActiveSubTab('ticket')}
            className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
              activeSubTab === 'ticket'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Ticket className="w-4 h-4" />
            <span>تذكرة الالتزام الأسبوعية (Commitment Ticket)</span>
          </button>
          <button
            onClick={() => setActiveSubTab('identity')}
            className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
              activeSubTab === 'identity'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>بطاقة الهوية القيمية (من أنت حقاً؟)</span>
          </button>
        </div>
      </div>

      {/* 1. Commitment Ticket Section */}
      {activeSubTab === 'ticket' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            
            {/* Customization Form */}
            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 space-y-4 text-right shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Edit3 className="w-4 h-4 text-indigo-600" />
                  <h3 className="font-black text-sm sm:text-base text-slate-900">تخصيص تذكرة الالتزام</h3>
                </div>
                <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-md font-bold">
                  حفظ تلقائي ✓
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">اسم الطالب:</label>
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:border-indigo-500 focus:bg-white focus:outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">القيمة المختارة لهذا الأسبوع:</label>
                  <input
                    type="text"
                    value={ticketValue}
                    onChange={(e) => setTicketValue(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:border-indigo-500 focus:bg-white focus:outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">سأثبتها عملياً من خلال (سلوك محدد):</label>
                  <textarea
                    rows={2}
                    value={ticketAction}
                    onChange={(e) => setTicketAction(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:border-indigo-500 focus:bg-white focus:outline-none resize-none transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">سأعرف أنني نجحت في التحدي عندما:</label>
                  <textarea
                    rows={2}
                    value={ticketSuccessCriteria}
                    onChange={(e) => setTicketSuccessCriteria(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:border-indigo-500 focus:bg-white focus:outline-none resize-none transition"
                  />
                </div>
              </div>

              <button
                onClick={handlePrint}
                className="w-full py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition"
              >
                <Printer className="w-4 h-4" />
                <span>طباعة تذكرة الالتزام</span>
              </button>
            </div>

            {/* Ticket Preview Render */}
            <div className="lg:col-span-2 flex flex-col items-center">
              <div
                id="printable-ticket"
                className="w-full max-w-xl bg-gradient-to-br from-amber-50/90 via-white to-amber-50/80 text-slate-900 border-4 border-dashed border-amber-600 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 text-right relative overflow-hidden"
              >
                {/* Watermark Logo */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none text-9xl font-black">
                  تذكرة
                </div>

                {/* Top Ticket Header */}
                <div className="flex items-center justify-between border-b-2 border-amber-600/30 pb-3">
                  <div>
                    <span className="text-[11px] font-black text-amber-800 tracking-wider block">
                      مدارس التنوير الأهلية — برنامج القيم
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-serif">
                      تَذْكِرَةُ الالْتِزَامِ الأُسْبُوعِيَّة
                    </h3>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-amber-600 text-white text-xs font-black tracking-widest uppercase">
                    Commitment Ticket
                  </div>
                </div>

                {/* Body Content */}
                <div className="space-y-4 font-['Cairo',sans-serif]">
                  <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-slate-700">
                    <div>الطالب: <span className="text-amber-900 font-extrabold">{studentName}</span></div>
                    <div>المرحلة: <span className="text-amber-900 font-extrabold">{gradeSection}</span></div>
                  </div>

                  <div className="bg-white/90 p-4 rounded-2xl border border-amber-200 shadow-2xs space-y-3">
                    <p className="text-sm sm:text-base font-bold leading-relaxed">
                      🌟 هذا الأسبوع، سأختار أن أعيش قيمة:{' '}
                      <span className="underline decoration-amber-600 decoration-2 text-amber-900 font-black">
                        [ {ticketValue} ]
                      </span>
                    </p>
                    <p className="text-xs sm:text-sm font-semibold leading-relaxed text-slate-800">
                      🎯 سأثبتها عملياً من خلال (سلوك محدد):{' '}
                      <span className="text-slate-950 font-bold bg-amber-100/80 px-2 py-0.5 rounded-lg">
                        {ticketAction}
                      </span>
                    </p>
                    <p className="text-xs sm:text-sm font-semibold leading-relaxed text-slate-800">
                      🏆 سأعرف أنني نجحت في التحدي عندما:{' '}
                      <span className="text-slate-950 font-bold bg-amber-100/80 px-2 py-0.5 rounded-lg">
                        {ticketSuccessCriteria}
                      </span>
                    </p>
                  </div>

                  {/* 7 Days Interactive Checkbox Circles */}
                  <div className="space-y-2">
                    <div className="text-xs font-bold text-slate-700">
                      جدول متابعة الالتزام اليومي (اضغط لتعليم اليوم المنجز):
                    </div>
                    <div className="grid grid-cols-7 gap-1.5 text-center">
                      {['اليوم 1', 'اليوم 2', 'اليوم 3', 'اليوم 4', 'اليوم 5', 'اليوم 6', 'اليوم 7'].map((day, idx) => {
                        const isDone = checkedDays[idx];
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => toggleDay(idx)}
                            className={`p-2 rounded-2xl border-2 transition flex flex-col items-center justify-center space-y-1 ${
                              isDone
                                ? 'bg-amber-500 border-amber-600 text-slate-950 shadow-xs font-black'
                                : 'bg-white/90 border-slate-300 text-slate-600 hover:border-amber-400'
                            }`}
                          >
                            <span className="text-[10px] font-bold">{day}</span>
                            <span className="text-xs">{isDone ? '✅' : '⭕'}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                </div>

                {/* Footer Slogan */}
                <div className="border-t-2 border-amber-600/30 pt-3 text-center">
                  <div className="text-base sm:text-lg font-black text-amber-900 font-['Amiri',serif]">
                    «القِيَمُ لَا تُحْفَظ.. القِيَمُ تُعَاش»
                  </div>
                  <div className="text-[10px] text-slate-600 font-semibold mt-0.5">
                    توقيع الطالب القيمي المتعهد: .......................................
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      )}

      {/* 2. Identity Card Section */}
      {activeSubTab === 'identity' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            
            {/* Customization Form */}
            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 space-y-4 text-right shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Edit3 className="w-4 h-4 text-indigo-600" />
                  <h3 className="font-black text-sm sm:text-base text-slate-900">بيانات بطاقة الهوية القيمية</h3>
                </div>
                <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-md font-bold">
                  حفظ تلقائي ✓
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">اسم الطالب:</label>
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:border-indigo-500 focus:bg-white focus:outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">الصف والشعبة:</label>
                  <input
                    type="text"
                    value={gradeSection}
                    onChange={(e) => setGradeSection(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:border-indigo-500 focus:bg-white focus:outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">الرمز / الصورة الرمزية:</label>
                  <div className="flex gap-2">
                    {['🎓', '🦅', '👑', '🌟', '🛡️', '💎'].map((av) => (
                      <button
                        key={av}
                        onClick={() => setSelectedAvatar(av)}
                        className={`p-2 rounded-xl text-lg border transition ${
                          selectedAvatar === av ? 'bg-indigo-50 border-indigo-500 text-indigo-900' : 'bg-slate-50 border-slate-200'
                        }`}
                      >
                        {av}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">خصلة أتميز بها (1):</label>
                  <input
                    type="text"
                    value={trait1}
                    onChange={(e) => setTrait1(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:border-indigo-500 focus:bg-white focus:outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">خصلة أتميز بها (2):</label>
                  <input
                    type="text"
                    value={trait2}
                    onChange={(e) => setTrait2(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:border-indigo-500 focus:bg-white focus:outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">خصلة أتميز بها (3):</label>
                  <input
                    type="text"
                    value={trait3}
                    onChange={(e) => setTrait3(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:border-indigo-500 focus:bg-white focus:outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">لماذا أفتخر بهذه الهوية؟</label>
                  <textarea
                    rows={2}
                    value={prideReason}
                    onChange={(e) => setPrideReason(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:border-indigo-500 focus:bg-white focus:outline-none resize-none transition"
                  />
                </div>
              </div>

              <button
                onClick={handlePrint}
                className="w-full py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition"
              >
                <Printer className="w-4 h-4" />
                <span>طباعة بطاقة الهوية</span>
              </button>
            </div>

            {/* Badge Preview Render */}
            <div className="lg:col-span-2 flex flex-col items-center">
              
              {/* Lanyard Strap Representation */}
              <div className="w-16 h-12 bg-gradient-to-b from-indigo-700 to-indigo-900 rounded-b-md border-x border-indigo-600 flex items-end justify-center pb-1 shadow-md">
                <div className="w-4 h-2 bg-slate-300 rounded-full"></div>
              </div>

              {/* ID Badge Card */}
              <div
                id="printable-id-card"
                className="w-full max-w-md bg-white text-slate-900 border-2 border-indigo-300 rounded-3xl p-6 shadow-xl space-y-4 text-right relative overflow-hidden"
              >
                {/* Header with School Crest */}
                <div className="flex items-center justify-between border-b border-indigo-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl p-2 rounded-2xl bg-indigo-50 border border-indigo-100">
                      {selectedAvatar}
                    </span>
                    <div>
                      <h4 className="text-base font-black text-slate-900">{studentName}</h4>
                      <span className="text-xs text-indigo-600 font-bold">{gradeSection}</span>
                    </div>
                  </div>
                  <div className="text-left">
                    <span className="text-[10px] font-bold text-amber-600 block">مدارس التنوير الأهلية</span>
                    <span className="text-xs font-black tracking-widest text-indigo-700 uppercase">هويتي القيمية</span>
                  </div>
                </div>

                {/* Traits Section */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2">
                  <span className="text-xs font-bold text-indigo-900 block mb-1">
                    خصال يُثني عليّ بها والداي ومعلمي وأصدقائي:
                  </span>
                  <div className="space-y-1.5 text-xs text-slate-700 font-medium">
                    <div className="flex items-center gap-2">
                      <span className="text-indigo-600 font-black">✦</span>
                      <span>أنا أتميز بـ: <strong className="text-slate-900">{trait1}</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-indigo-600 font-black">✦</span>
                      <span>أنا أتميز بـ: <strong className="text-slate-900">{trait2}</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-indigo-600 font-black">✦</span>
                      <span>أنا أتميز بـ: <strong className="text-slate-900">{trait3}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Reason for Pride */}
                <div className="bg-indigo-50/70 p-3 rounded-2xl border border-indigo-100 text-xs">
                  <span className="font-bold text-indigo-900 block mb-0.5">لماذا أفتخر بهذه الهوية؟</span>
                  <p className="text-slate-700 leading-relaxed font-medium">{prideReason}</p>
                </div>

                {/* Footer Signature */}
                <div className="border-t border-slate-100 pt-2 flex items-center justify-between text-[10px] text-slate-500 font-medium">
                  <span>برنامج القيم: تَذْكِرَة</span>
                  <span className="font-bold text-indigo-700">«قِيمَتُكَ هِيَ قِيَمُك»</span>
                </div>

              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
