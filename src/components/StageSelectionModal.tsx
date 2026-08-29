import React from 'react';
import { StageId } from '../types';
import { Sparkles, ArrowLeft, Star, Compass } from 'lucide-react';

interface StageSelectionModalProps {
  onSelectStage: (stage: StageId) => void;
  currentStage?: StageId | null;
  onClose?: () => void;
  isOverlay?: boolean;
}

export const StageSelectionModal: React.FC<StageSelectionModalProps> = ({
  onSelectStage,
  currentStage,
  onClose,
  isOverlay = false,
}) => {
  return (
    <div
      className={
        isOverlay
          ? 'fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fadeIn'
          : 'w-full min-h-[75vh] flex items-center justify-center py-6 px-4 animate-fadeIn'
      }
    >
      <div className="w-full max-w-3xl bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden text-center p-6 sm:p-8 relative">
        
        {/* Close button if modal overlay */}
        {isOverlay && onClose && (
          <button
            onClick={onClose}
            className="absolute top-5 left-5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold transition"
            title="إغلاق النافذة"
          >
            ✕ إغلاق
          </button>
        )}

        {/* Top Header */}
        <div className="space-y-2 max-w-xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>مدارس التنوير الأهلية — برنامج «تَذْكِرَة»</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            اختر المرحلة الدراسية
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            محتوى وتفاعل تعليمي مخصص ومناسب لكل فئة عمرية
          </p>
        </div>

        {/* 2 Clean Selection Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-6 text-right">
          
          {/* Stage 1 Card */}
          <div
            onClick={() => onSelectStage('stage1')}
            className={`group cursor-pointer p-5 sm:p-6 rounded-2xl border-2 transition-all duration-200 flex flex-col justify-between hover:shadow-md hover:border-amber-400 hover:bg-amber-50/20 ${
              currentStage === 'stage1'
                ? 'border-amber-400 bg-amber-50/40 ring-2 ring-amber-300'
                : 'border-slate-200 bg-white'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black">
                  🌱 المرحلة الأساسية
                </span>
                <span className="text-2xl">🌟</span>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 group-hover:text-amber-800 transition">
                  المرحلة الأولى (الصف 4 - 6)
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed font-medium">
                  قصص مصورة، ميزان الجواهر، شجرة القيم، وتذكرة بطل الأسبوع.
                </p>
              </div>
            </div>

            <button
              type="button"
              className="w-full mt-4 py-2.5 rounded-xl bg-amber-500 group-hover:bg-amber-600 text-slate-950 font-black text-xs sm:text-sm transition flex items-center justify-center gap-2"
            >
              <span>دخول واجهة المرحلة الأولى</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>

          {/* Stage 2 Card */}
          <div
            onClick={() => onSelectStage('stage2')}
            className={`group cursor-pointer p-5 sm:p-6 rounded-2xl border-2 transition-all duration-200 flex flex-col justify-between hover:shadow-md hover:border-indigo-400 hover:bg-indigo-50/20 ${
              currentStage === 'stage2'
                ? 'border-indigo-500 bg-indigo-50/40 ring-2 ring-indigo-300'
                : 'border-slate-200 bg-white'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-900 text-xs font-black">
                  🦅 المرحلة المتوسطة
                </span>
                <span className="text-2xl">🧭</span>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 group-hover:text-indigo-800 transition">
                  المرحلة الثانية (الصف 7 - 9)
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed font-medium">
                  مصفوفة القرارات والتموضع، الأمانة الرقمية، السايكودراما، وبناء الهوية.
                </p>
              </div>
            </div>

            <button
              type="button"
              className="w-full mt-4 py-2.5 rounded-xl bg-indigo-600 group-hover:bg-indigo-700 text-white font-black text-xs sm:text-sm transition flex items-center justify-center gap-2"
            >
              <span>دخول واجهة المرحلة الثانية</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
