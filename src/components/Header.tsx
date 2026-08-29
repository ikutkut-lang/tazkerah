import React from 'react';
import { StageId, GenderMode } from '../types';
import { Clock, RefreshCw } from 'lucide-react';

interface HeaderProps {
  currentStage: StageId;
  onSelectStage: (stage: StageId) => void;
  onOpenStageModal: () => void;
  genderMode: GenderMode;
  onSelectGender: (mode: GenderMode) => void;
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onToggleTimer: () => void;
  isTimerRunning: boolean;
  timerFormatted: string;
  current5EStageName: string;
}

export const Header: React.FC<HeaderProps> = ({
  currentStage,
  onSelectStage,
  onOpenStageModal,
  genderMode,
  onSelectGender,
  activeTab,
  onSelectTab,
  onToggleTimer,
  isTimerRunning,
  timerFormatted,
  current5EStageName,
}) => {
  // Stage 1 (Kids) Tabs: Clean, friendly, essential
  const stage1Tabs = [
    { id: 'slides', label: '🎬 قصة الدرس' },
    { id: 'scale', label: '⚖️ ميزان الجواهر' },
    { id: 'scenarios', label: '🎭 مواقف الأبطال' },
    { id: 'tree', label: '🌳 شجرة القيم' },
    { id: 'cards', label: '🎟️ تذكرة بطل الأسبوع' },
    { id: 'store', label: '🏪 متجر القيم' },
    { id: 'praise', label: '⭐ كرسي النجوم' },
    { id: 'quiz', label: '🏆 المسابقة والشهادة' },
    { id: 'guide', label: '📖 دليل المعلم' },
  ];

  // Stage 2 (Teens) Tabs: Clear, focused
  const stage2Tabs = [
    { id: 'slides', label: '🎬 عرض الدرس' },
    { id: 'scale', label: '🧭 مصفوفة القرارات' },
    { id: 'scenarios', label: '🎭 مفترق الطرق' },
    { id: 'tree', label: '🌳 شجرة القيم' },
    { id: 'cards', label: '🎟️ تذكرة الالتزام' },
    { id: 'quran', label: '📖 بوصلة السماء' },
    { id: 'store', label: '🏪 متجر القيم' },
    { id: 'praise', label: '⭐ كرسي الإطراء' },
    { id: 'quiz', label: '🏆 الاختبار والشهادة' },
    { id: 'guide', label: '📋 دليل المعلم' },
  ];

  const activeTabsList = currentStage === 'stage1' ? stage1Tabs : stage2Tabs;

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      
      {/* Top Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3">
        
        {/* Left: Simple Title & Stage Badge */}
        <div className="flex items-center gap-3">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg font-black shrink-0 ${
              currentStage === 'stage1' ? 'bg-amber-100 text-amber-800' : 'bg-indigo-100 text-indigo-800'
            }`}
          >
            {currentStage === 'stage1' ? '🌟' : 'ت'}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-slate-900">مدارس التنوير الأهلية</span>
              <span className="text-slate-300">|</span>
              <span className="text-xs font-bold text-indigo-700">برنامج «تَذْكِرَة»</span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
              {currentStage === 'stage1' ? 'المرحلة الأولى (الصف 4 - 6)' : 'المرحلة الثانية (الصف 7 - 9)'}
            </p>
          </div>
        </div>

        {/* Right Controls: Stage Switcher + Timer */}
        <div className="flex items-center gap-2">
          
          {/* Stage Switcher */}
          <div className="bg-slate-100 p-0.5 rounded-xl flex items-center text-xs font-bold">
            <button
              onClick={() => onSelectStage('stage1')}
              className={`px-2.5 py-1 rounded-lg transition ${
                currentStage === 'stage1'
                  ? 'bg-amber-400 text-slate-950 font-black shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              المرحلة الأولى (4 - 6)
            </button>
            <button
              onClick={() => onSelectStage('stage2')}
              className={`px-2.5 py-1 rounded-lg transition ${
                currentStage === 'stage2'
                  ? 'bg-indigo-600 text-white font-black shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              المرحلة الثانية (7 - 9)
            </button>
          </div>

          {/* Gender Filter (Discreet) */}
          <div className="hidden md:flex bg-slate-100 p-0.5 rounded-xl text-[11px] font-bold text-slate-600">
            <button
              onClick={() => onSelectGender('both')}
              className={`px-2 py-1 rounded-lg ${genderMode === 'both' ? 'bg-white text-slate-900 shadow-2xs font-black' : ''}`}
            >
              الكل
            </button>
            <button
              onClick={() => onSelectGender('male')}
              className={`px-2 py-1 rounded-lg ${genderMode === 'male' ? 'bg-sky-500 text-white font-black' : ''}`}
            >
              بنين
            </button>
            <button
              onClick={() => onSelectGender('female')}
              className={`px-2 py-1 rounded-lg ${genderMode === 'female' ? 'bg-rose-500 text-white font-black' : ''}`}
            >
              بنات
            </button>
          </div>

          {/* 45-min Timer Button */}
          <button
            onClick={onToggleTimer}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition border ${
              isTimerRunning
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300 animate-pulse'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
            }`}
            title="مؤقت الحصة 45 دقيقة"
          >
            <Clock className="w-3.5 h-3.5 text-indigo-600" />
            <span className="font-mono font-bold text-xs">{timerFormatted}</span>
          </button>

        </div>

      </div>

      {/* Clean Single Navigation Bar */}
      <div className="border-t border-slate-100 bg-slate-50/70 overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-1 py-1 min-w-max">
          {activeTabsList.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  isActive
                    ? currentStage === 'stage1'
                      ? 'bg-amber-400 text-slate-950 font-black shadow-xs'
                      : 'bg-indigo-600 text-white font-black shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

    </header>
  );
};
