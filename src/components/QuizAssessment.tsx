import React, { useState, useEffect } from 'react';
import { QUIZ_QUESTIONS } from '../data/curriculumData';
import { StageId } from '../types';
import confetti from 'canvas-confetti';
import { CheckCircle2, XCircle, Award, RotateCcw, ArrowLeft, ArrowRight, Printer, Sparkles, Trophy, HelpCircle, Check } from 'lucide-react';
import { loadSavedState, saveState } from '../utils/storage';

interface QuizAssessmentProps {
  currentStage: StageId;
}

export const QuizAssessment: React.FC<QuizAssessmentProps> = ({ currentStage }) => {
  const questions = QUIZ_QUESTIONS.filter((q) => q.stage === currentStage);

  const [currentQIndex, setCurrentQIndex] = useState<number>(() =>
    loadSavedState<number>(`quiz_q_idx_${currentStage}`, 0)
  );
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>(() =>
    loadSavedState<Record<number, string>>(`quiz_answers_${currentStage}`, {})
  );
  const [isSubmitted, setIsSubmitted] = useState<boolean>(() =>
    loadSavedState<boolean>(`quiz_submitted_${currentStage}`, false)
  );
  const [studentCertificateName, setStudentCertificateName] = useState<string>(() =>
    loadSavedState<string>('quiz_cert_name', 'طالب التنوير القيمي')
  );

  const safeIndex = Math.min(Math.max(0, currentQIndex), Math.max(0, questions.length - 1));
  const question = questions[safeIndex] || questions[0];
  const totalQuestions = questions.length;

  useEffect(() => {
    saveState(`quiz_q_idx_${currentStage}`, currentQIndex);
  }, [currentQIndex, currentStage]);

  useEffect(() => {
    saveState(`quiz_answers_${currentStage}`, selectedAnswers);
  }, [selectedAnswers, currentStage]);

  useEffect(() => {
    saveState(`quiz_submitted_${currentStage}`, isSubmitted);
  }, [isSubmitted, currentStage]);

  useEffect(() => {
    saveState('quiz_cert_name', studentCertificateName);
  }, [studentCertificateName]);

  const handleSelectOption = (optionId: string) => {
    if (isSubmitted || !question) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [question.id]: optionId,
    }));
  };

  const handleFinishQuiz = () => {
    setIsSubmitted(true);
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // Confetti fallback
    }
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setCurrentQIndex(0);
    saveState(`quiz_answers_${currentStage}`, {});
    saveState(`quiz_submitted_${currentStage}`, false);
    saveState(`quiz_q_idx_${currentStage}`, 0);
  };

  // Calculate score
  let correctCount = 0;
  questions.forEach((q) => {
    const selected = selectedAnswers[q.id];
    const correctOpt = q.options.find((o) => o.isCorrect);
    if (selected && correctOpt && selected === correctOpt.id) {
      correctCount++;
    }
  });

  const percentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

  const handlePrintCertificate = () => {
    window.print();
  };

  return (
    <div className="w-full space-y-6 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="bg-white border border-slate-200/90 p-6 sm:p-8 rounded-3xl text-center space-y-3 shadow-sm relative overflow-hidden">
        <div className="flex items-center justify-center gap-2 flex-wrap">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-100">
            <Award className="w-4 h-4" />
            <span>نظام التقييم السريع والتحقق من الاستيعاب (Evaluate)</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
            <Check className="w-3.5 h-3.5" />
            <span>يتم الحفظ تلقائياً في الموقع</span>
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
          اختبار استيعاب مفاهيم برنامج «تذكرة» القيمي
        </h2>
        <p className="text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
          {currentStage === 'stage1'
            ? 'تقييم قصير وممتع لطلبة المرحلة الأولى (الصف 4 - 6) حول ميزان الألماس والحصى وشجرة القيم والمواقف الحياتية.'
            : 'تقييم تحليلي لطلبة المرحلة الثانية (الصف 7 - 9) حول معادلة القيم، التموضع الذاتي، وضغوط الكثرة والأمانة الرقمية.'}
        </p>
      </div>

      {!isSubmitted && question ? (
        /* Active Quiz Interface */
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 space-y-6 text-right max-w-3xl mx-auto shadow-sm">
          
          {/* Top Progress Counter */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
              السؤال {safeIndex + 1} من {totalQuestions}
            </span>
            <span className="text-xs font-bold text-slate-500">
              مجال: <strong className="text-slate-900">{question.category}</strong>
            </span>
          </div>

          {/* Question Text */}
          <div className="space-y-2">
            <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-relaxed">
              {question.question}
            </h3>
            {question.tip && (
              <p className="text-xs text-amber-700 font-medium flex items-center gap-1.5 bg-amber-50 p-2 rounded-xl border border-amber-200/60">
                <HelpCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>إضاءة مساعدة: {question.tip}</span>
              </p>
            )}
          </div>

          {/* Options Grid */}
          <div className="space-y-3 pt-2">
            {question.options.map((opt) => {
              const isSelected = selectedAnswers[question.id] === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption(opt.id)}
                  className={`w-full p-4 rounded-2xl border text-right transition flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-indigo-50 border-indigo-500 text-indigo-900 ring-2 ring-indigo-400/30 shadow-xs'
                      : 'bg-slate-50 border-slate-200 hover:border-indigo-200 text-slate-700 hover:bg-white'
                  }`}
                >
                  <span className="text-xs sm:text-sm font-bold leading-relaxed">
                    {opt.text}
                  </span>
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 text-xs font-bold ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-600 text-white'
                        : 'border-slate-300 text-slate-500 bg-white'
                    }`}
                  >
                    {opt.id.toUpperCase()}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between border-t border-slate-100 pt-4">
            <button
              onClick={() => setCurrentQIndex((prev) => Math.max(0, prev - 1))}
              disabled={safeIndex === 0}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-xs font-bold border ${
                safeIndex === 0
                  ? 'bg-slate-50 text-slate-400 border-slate-200 cursor-not-allowed'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border-slate-200 shadow-xs'
              }`}
            >
              <ArrowRight className="w-4 h-4" />
              <span>السابق</span>
            </button>

            {safeIndex < totalQuestions - 1 ? (
              <button
                onClick={() => setCurrentQIndex((prev) => prev + 1)}
                disabled={!selectedAnswers[question.id]}
                className={`flex items-center gap-1.5 px-5 py-2.5 rounded-2xl text-xs font-black border transition ${
                  !selectedAnswers[question.id]
                    ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white border-indigo-600 shadow-xs'
                }`}
              >
                <span>السؤال التالي</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleFinishQuiz}
                disabled={Object.keys(selectedAnswers).length < totalQuestions}
                className={`flex items-center gap-1.5 px-6 py-2.5 rounded-2xl text-xs font-black border transition ${
                  Object.keys(selectedAnswers).length < totalQuestions
                    ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-600 shadow-xs'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>إنهاء الاختبار وعرض النتيجة</span>
              </button>
            )}
          </div>

        </div>
      ) : (
        /* Results & Certificate Display */
        <div className="space-y-8">
          
          {/* Result Score Card */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 text-center space-y-4 max-w-2xl mx-auto shadow-sm">
            <div className="w-20 h-20 rounded-full bg-amber-50 border-2 border-amber-400 text-amber-600 mx-auto flex items-center justify-center text-4xl shadow-xs">
              🏆
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
              {percentage >= 80 ? 'أحسنت صنعاً يا فارس القيم!' : 'مجهود طيب، راجع الإجابات لتعزيز فهمك!'}
            </h3>

            <div className="flex justify-center items-baseline gap-2 font-mono">
              <span className="text-5xl sm:text-6xl font-black text-indigo-600">{percentage}%</span>
              <span className="text-sm text-slate-500 font-bold">
                ({correctCount} من {totalQuestions} أسئلة صحيحة)
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed font-medium">
              «أثبتَّ أنك تدرك عمق مفهوم (قِيمَتُكَ هِيَ قِيَمُك) وأن القيم النفيسة لا تُبادل بالمكاسب الرخيصة.»
            </p>

            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <button
                onClick={handleRestart}
                className="px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold border border-slate-200 flex items-center gap-1.5 transition"
              >
                <RotateCcw className="w-4 h-4" />
                <span>إعادة الاختبار</span>
              </button>
              <button
                onClick={handlePrintCertificate}
                className="px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs flex items-center gap-1.5 transition"
              >
                <Printer className="w-4 h-4" />
                <span>طباعة شهادة التميز القيمي</span>
              </button>
            </div>
          </div>

          {/* Detailed Question Review List */}
          <div className="space-y-4 max-w-3xl mx-auto text-right">
            <h4 className="font-black text-slate-900 text-base">مراجعة الأسئلة والشروحات التربوية:</h4>
            {questions.map((q, idx) => {
              const userAns = selectedAnswers[q.id];
              const correctOpt = q.options.find((o) => o.isCorrect);
              const isCorrect = userAns === correctOpt?.id;
              const selectedOptObj = q.options.find((o) => o.id === userAns);

              return (
                <div
                  key={q.id}
                  className={`p-5 rounded-3xl border text-right space-y-2 shadow-xs ${
                    isCorrect
                      ? 'bg-emerald-50/70 border-emerald-200'
                      : 'bg-rose-50/70 border-rose-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">سؤال #{idx + 1}</span>
                    <span className={`text-xs font-bold flex items-center gap-1 ${isCorrect ? 'text-emerald-700' : 'text-rose-700'}`}>
                      {isCorrect ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                      <span>{isCorrect ? 'إجابة صحيحة' : 'إجابة غير دقيقة'}</span>
                    </span>
                  </div>

                  <h5 className="text-sm font-black text-slate-900">{q.question}</h5>

                  <div className="text-xs text-slate-700 space-y-1 pt-1 font-medium">
                    <div>إجابتك: <strong className="text-slate-900">{selectedOptObj?.text || 'لم يتم الاختيار'}</strong></div>
                    {!isCorrect && (
                      <div>الإجابة النموذجية: <strong className="text-emerald-800">{correctOpt?.text}</strong></div>
                    )}
                    <div className="bg-white p-3 rounded-2xl border border-slate-200/80 text-slate-700 text-[11px] mt-1 shadow-2xs">
                      💡 <strong>التبرير:</strong> {correctOpt?.explanation}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Official Printable Certificate of Honor (شهادة فرسان القيم التنويرية) */}
          <div className="flex flex-col items-center pt-6">
            <div className="w-full max-w-2xl bg-white border border-slate-200 p-4 rounded-3xl mb-4 text-right shadow-xs">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                اسم الطالب لإصداره على الشهادة:
              </label>
              <input
                type="text"
                value={studentCertificateName}
                onChange={(e) => setStudentCertificateName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs focus:border-indigo-500 focus:outline-none focus:bg-white transition"
              />
            </div>

            <div
              id="printable-certificate"
              className="w-full max-w-2xl bg-gradient-to-br from-amber-50/80 via-white to-amber-50/60 text-slate-900 border-8 border-double border-amber-600 rounded-3xl p-8 sm:p-12 shadow-xl space-y-6 text-center relative overflow-hidden"
            >
              {/* Corner Ornaments */}
              <div className="absolute top-2 left-2 text-2xl text-amber-700">❖</div>
              <div className="absolute top-2 right-2 text-2xl text-amber-700">❖</div>
              <div className="absolute bottom-2 left-2 text-2xl text-amber-700">❖</div>
              <div className="absolute bottom-2 right-2 text-2xl text-amber-700">❖</div>

              {/* School Header */}
              <div className="space-y-1">
                <span className="text-xs font-extrabold text-amber-900 tracking-wider uppercase block">
                  المملكة الأردنية الهاشمية — مدارس التنوير الأهلية
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif">
                  شَهَادَةُ تَمَيُّزٍ قِيَمِيّ
                </h3>
                <p className="text-xs font-bold text-amber-800">برنامج القيم التنويري: تَذْكِرَة</p>
              </div>

              {/* Certificate Body */}
              <div className="space-y-4 font-['Cairo',sans-serif] text-slate-800">
                <p className="text-sm">
                  تشهد إدارة مدارس التنوير الأهلية وفريق الإشراف القيمي بأن الطالب المتميز:
                </p>

                <div className="text-2xl sm:text-3xl font-black text-amber-950 font-serif border-b-2 border-amber-600/40 inline-block px-8 pb-1">
                  {studentCertificateName}
                </div>

                <p className="text-xs sm:text-sm leading-relaxed max-w-lg mx-auto font-medium">
                  قد أتم بنجاح متألق ورشة واختبار استيعاب مفاهيم <strong className="text-amber-900">برنامج «تذكرة» القيمي</strong> بنتيجة <strong className="text-amber-900">{percentage}%</strong>، وتعهد بالتموضع الذاتي الثابت وتطبيق شعار: <br />
                  <span className="text-base sm:text-lg font-black text-amber-900 font-['Amiri',serif] block mt-1">
                    «قِيمَتُكَ هِيَ قِيَمُك»
                  </span>
                </p>
              </div>

              {/* Official Seal & Signatures */}
              <div className="grid grid-cols-3 gap-2 border-t-2 border-amber-600/30 pt-4 text-xs font-bold text-slate-700">
                <div>
                  <span className="block text-[10px] text-slate-500">ميسر القيم الصفي</span>
                  <span className="text-amber-950 font-extrabold mt-1 block">معلم الحصة</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full border-2 border-amber-700 text-amber-800 flex flex-col items-center justify-center text-[8px] font-black uppercase tracking-tighter rotate-[-12deg] shadow-inner bg-amber-200/50">
                    <span>مدارس التنوير</span>
                    <span className="text-[10px]">★ 2026 ★</span>
                    <span>معتمد</span>
                  </div>
                </div>
                <div>
                  <span className="block text-[10px] text-slate-500">إدارة المدارس</span>
                  <span className="text-amber-950 font-extrabold mt-1 block">فريق برنامج تذكرة</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      )}

    </div>
  );
};
