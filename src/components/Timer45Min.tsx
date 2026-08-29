import React, { useState } from 'react';
import { LESSON_5E_STAGES } from '../data/curriculumData';
import { Play, Pause, RotateCcw, SkipForward, Volume2, VolumeX, X, User, Users, BellRing } from 'lucide-react';

interface Timer45MinProps {
  isOpen: boolean;
  onClose: () => void;
  secondsRemaining: number;
  setSecondsRemaining: React.Dispatch<React.SetStateAction<number>>;
  isRunning: boolean;
  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Timer45Min: React.FC<Timer45MinProps> = ({
  isOpen,
  onClose,
  secondsRemaining,
  setSecondsRemaining,
  isRunning,
  setIsRunning,
}) => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const TOTAL_SECONDS = 45 * 60; // 2700 seconds

  // Calculate current stage
  const elapsed = TOTAL_SECONDS - secondsRemaining;
  let currentStageIndex = 0;
  let accumulated = 0;

  for (let i = 0; i < LESSON_5E_STAGES.length; i++) {
    const stageDurationSec = LESSON_5E_STAGES[i].durationMinutes * 60;
    if (elapsed < accumulated + stageDurationSec) {
      currentStageIndex = i;
      break;
    }
    accumulated += stageDurationSec;
    if (i === LESSON_5E_STAGES.length - 1) {
      currentStageIndex = i;
    }
  }

  const currentStage = LESSON_5E_STAGES[currentStageIndex];

  // Helper sound tone with Web Audio API
  const playChime = () => {
    if (!soundEnabled) return;
    try {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const audioCtx = new AudioCtxClass();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.3); // A5
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.6);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.6);
    } catch {
      // Audio fallback
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setSecondsRemaining(TOTAL_SECONDS);
  };

  const handleSkipToNextStage = () => {
    let nextStageStartAccum = 0;
    for (let i = 0; i <= currentStageIndex; i++) {
      nextStageStartAccum += LESSON_5E_STAGES[i].durationMinutes * 60;
    }
    const newRemaining = Math.max(0, TOTAL_SECONDS - nextStageStartAccum);
    setSecondsRemaining(newRemaining);
    playChime();
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-xl bg-white border border-slate-200/90 rounded-3xl shadow-2xl overflow-hidden text-slate-800 flex flex-col">
        
        {/* Header */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-100">
              <BellRing className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">مؤقت الحصة التفاعلية (45 دقيقة)</h3>
              <p className="text-xs text-slate-500 font-medium">نموذج 5E المتكامل مع معايير ELIOT العالمية</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 shadow-xs"
              title={soundEnabled ? 'كتم الصوت' : 'تفعيل التنبيه الصوتي'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-slate-800 shadow-xs"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main Countdown Display */}
        <div className="p-6 text-center bg-white flex flex-col items-center">
          
          {/* Big Digits */}
          <div className="font-mono text-6xl sm:text-7xl font-black text-indigo-600 tracking-wider my-2">
            {formatTime(secondsRemaining)}
          </div>
          <div className="text-xs text-slate-500 font-semibold mb-4">
            المتبقي من إجمالي زمن الحصة (45:00)
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3 mb-6">
            <button
              id="btn-timer-toggle-play"
              onClick={() => {
                setIsRunning(!isRunning);
                if (!isRunning) playChime();
              }}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-white transition shadow-sm ${
                isRunning
                  ? 'bg-amber-600 hover:bg-amber-700'
                  : 'bg-emerald-600 hover:bg-emerald-700'
              }`}
            >
              {isRunning ? (
                <>
                  <Pause className="w-5 h-5" />
                  <span>إيقاف مؤقت</span>
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  <span>بدء الحصة</span>
                </>
              )}
            </button>

            <button
              onClick={handleSkipToNextStage}
              className="flex items-center gap-1.5 px-4 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs border border-slate-200 transition"
              title="الانتقال للمرحلة التالية"
            >
              <SkipForward className="w-4 h-4" />
              <span>المرحلة التالية</span>
            </button>

            <button
              onClick={handleReset}
              className="p-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200 transition"
              title="إعادة تعيين إلى 45 دقيقة"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Current Stage Card */}
          <div className="w-full bg-slate-50 border border-slate-200/90 rounded-2xl p-4 text-right mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                المرحلة الحالية {currentStageIndex + 1} من 5 ({currentStage.nameEn})
              </span>
              <span className="text-xs font-semibold text-slate-500">
                المدة المقررة: {currentStage.durationMinutes} دقائق
              </span>
            </div>
            <h4 className="text-base font-extrabold text-slate-900 mb-1">
              {currentStage.name}
            </h4>
            <p className="text-xs text-slate-600 mb-3 leading-relaxed">
              {currentStage.description}
            </p>

            {/* Effort Distribution Indicator (75% student vs 25% teacher) */}
            <div className="bg-white p-3 rounded-xl border border-slate-200 flex flex-col gap-2 shadow-xs">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
                  <Users className="w-3.5 h-3.5" />
                  جهد الطالب ({currentStage.studentMinutes} د - 75%):
                </span>
                <span className="flex items-center gap-1.5 text-indigo-700 font-bold">
                  <User className="w-3.5 h-3.5" />
                  جهد المعلم ({currentStage.teacherMinutes} د - 25%):
                </span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden flex border border-slate-200">
                <div className="bg-emerald-500 h-full" style={{ width: '75%' }} title="75% جهد الطلاب"></div>
                <div className="bg-indigo-500 h-full" style={{ width: '25%' }} title="25% جهد المعلم"></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-700 mt-1">
                <div className="bg-emerald-50/70 p-2 rounded-lg border border-emerald-200/60">
                  <strong className="text-emerald-800 block mb-0.5">دور الطلاب:</strong>
                  {currentStage.studentRole}
                </div>
                <div className="bg-indigo-50/70 p-2 rounded-lg border border-indigo-200/60">
                  <strong className="text-indigo-800 block mb-0.5">دور المعلم:</strong>
                  {currentStage.teacherRole}
                </div>
              </div>
            </div>
          </div>

          {/* 5E Timeline Progress Bar */}
          <div className="w-full grid grid-cols-5 gap-1.5">
            {LESSON_5E_STAGES.map((st, idx) => {
              const isPassed = idx < currentStageIndex;
              const isCurrent = idx === currentStageIndex;
              return (
                <div
                  key={st.id}
                  className={`p-2 rounded-xl text-center border transition ${
                    isCurrent
                      ? 'bg-indigo-50 border-indigo-300 text-indigo-800 font-bold shadow-xs'
                      : isPassed
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                      : 'bg-slate-50 border-slate-200 text-slate-400'
                  }`}
                >
                  <div className="text-[10px] uppercase tracking-wider font-semibold">{st.nameEn}</div>
                  <div className="text-xs truncate font-bold">{st.name.split('.')[1] || st.name}</div>
                  <div className="text-[10px] opacity-80">{st.durationMinutes} د</div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </div>
  );
};
