import React, { useState, useEffect } from 'react';
import { StageId, GenderMode } from './types';
import { Header } from './components/Header';
import { StageSelectionModal } from './components/StageSelectionModal';
import { Timer45Min } from './components/Timer45Min';
import { PresentationMode } from './components/PresentationMode';
import { InteractiveScale } from './components/InteractiveScale';
import { CrossroadsScenarios } from './components/CrossroadsScenarios';
import { TreeOfValues } from './components/TreeOfValues';
import { ValuesStore } from './components/ValuesStore';
import { IdentityCardAndTicket } from './components/IdentityCardAndTicket';
import { PraiseChairActivity } from './components/PraiseChairActivity';
import { QuranHadithViewer } from './components/QuranHadithViewer';
import { QuizAssessment } from './components/QuizAssessment';
import { TeacherGuidePlan } from './components/TeacherGuidePlan';
import { LESSON_5E_STAGES } from './data/curriculumData';

export default function App() {
  const [hasSelectedStage, setHasSelectedStage] = useState<boolean>(() => {
    return localStorage.getItem('tanweer_has_selected_stage') === 'true';
  });
  const [currentStage, setCurrentStage] = useState<StageId>(() => {
    return (localStorage.getItem('tanweer_current_stage') as StageId) || 'stage1';
  });
  const [showStageModal, setShowStageModal] = useState<boolean>(false);

  const [genderMode, setGenderMode] = useState<GenderMode>('both');
  const [activeTab, setActiveTab] = useState<string>('slides');
  const [showTimer, setShowTimer] = useState(false);

  // Synchronized 45-Minute Lesson Timer
  const TOTAL_SECONDS = 45 * 60;
  const [secondsRemaining, setSecondsRemaining] = useState<number>(TOTAL_SECONDS);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  const handleSelectInitialStage = (stage: StageId) => {
    setCurrentStage(stage);
    setHasSelectedStage(true);
    setShowStageModal(false);
    setActiveTab('slides');
    localStorage.setItem('tanweer_has_selected_stage', 'true');
    localStorage.setItem('tanweer_current_stage', stage);
  };

  const handleChangeStageFromHeader = (stage: StageId) => {
    setCurrentStage(stage);
    localStorage.setItem('tanweer_current_stage', stage);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining((prev) => Math.max(0, prev - 1));
      }, 1000);
    } else if (secondsRemaining === 0 && isTimerRunning) {
      setIsTimerRunning(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, secondsRemaining]);

  const mins = Math.floor(secondsRemaining / 60);
  const secs = secondsRemaining % 60;
  const timerFormatted = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

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
  const current5EStage = LESSON_5E_STAGES[currentStageIndex];

  // If user hasn't chosen stage yet, show clean Stage Picker
  if (!hasSelectedStage) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-['Cairo',sans-serif]">
        <StageSelectionModal onSelectStage={handleSelectInitialStage} currentStage={currentStage} />
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen font-['Cairo',sans-serif] flex flex-col transition-colors duration-200 ${
        currentStage === 'stage1' ? 'bg-amber-50/20 text-slate-900' : 'bg-slate-50 text-slate-800'
      }`}
    >
      {/* Stage Selection Overlay Modal if triggered */}
      {showStageModal && (
        <StageSelectionModal
          isOverlay={true}
          onClose={() => setShowStageModal(false)}
          onSelectStage={handleSelectInitialStage}
          currentStage={currentStage}
        />
      )}

      {/* Top Header */}
      <Header
        currentStage={currentStage}
        onSelectStage={handleChangeStageFromHeader}
        onOpenStageModal={() => setShowStageModal(true)}
        genderMode={genderMode}
        onSelectGender={setGenderMode}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onToggleTimer={() => setShowTimer(!showTimer)}
        isTimerRunning={isTimerRunning}
        timerFormatted={timerFormatted}
        current5EStageName={current5EStage?.nameEn || '5E'}
      />

      {/* Main Classroom Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-3 sm:px-6 py-5">
        
        {/* Floating 45-Minute Lesson Timer Modal */}
        <Timer45Min
          isOpen={showTimer}
          onClose={() => setShowTimer(false)}
          secondsRemaining={secondsRemaining}
          setSecondsRemaining={setSecondsRemaining}
          isRunning={isTimerRunning}
          setIsRunning={setIsTimerRunning}
        />

        {/* Tab Views */}
        <div className="w-full">
          {activeTab === 'slides' && (
            <PresentationMode
              currentStage={currentStage}
              onNavigateTab={(tab) => setActiveTab(tab)}
            />
          )}

          {activeTab === 'quran' && (
            <QuranHadithViewer />
          )}

          {activeTab === 'scale' && (
            <InteractiveScale currentStage={currentStage} />
          )}

          {activeTab === 'scenarios' && (
            <CrossroadsScenarios currentStage={currentStage} genderMode={genderMode} />
          )}

          {activeTab === 'tree' && (
            <TreeOfValues />
          )}

          {activeTab === 'store' && (
            <ValuesStore onSelectForTicket={() => setActiveTab('cards')} />
          )}

          {activeTab === 'cards' && (
            <IdentityCardAndTicket currentStage={currentStage} />
          )}

          {activeTab === 'praise' && (
            <PraiseChairActivity />
          )}

          {activeTab === 'quiz' && (
            <QuizAssessment currentStage={currentStage} />
          )}

          {activeTab === 'guide' && (
            <TeacherGuidePlan currentStage={currentStage} />
          )}
        </div>

      </main>

      {/* Simple Clean Footer */}
      <footer className="border-t border-slate-200/80 py-4 text-center text-xs text-slate-500 mt-auto bg-white/50">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-bold text-slate-700">
            برنامج «تَذْكِرَة» — مدارس التنوير الأهلية
          </p>
          <p className="text-[11px] text-slate-400">
            نموذج التدريس الخماسي 5E ومعايير الملاحظة الصفية ELIOT
          </p>
        </div>
      </footer>

    </div>
  );
}
