import React, { useState } from 'react';
import { BookOpen, Sparkles, Heart, Compass, CheckCircle } from 'lucide-react';

export const QuranHadithViewer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'quran' | 'hadith' | 'wisdom'>('quran');

  const quranVerses = [
    {
      id: 'verse1',
      title: 'أدب الخطاب والكلمة الطيبة',
      surah: 'سورة البقرة: آية 83',
      arabicText: '﴿وَقُولُوا لِلنَّاسِ حُسْنًا﴾',
      tafseer: 'توجيه رباني للتعامل الراقي والكلمة الطيبة التي تبني الجسور وتزيل الشحناء وتغرس الألفة بين جميع أفراد المجتمع.',
      dailyImpact: 'التحدث بلطف مع الزملاء، وتجنب السخرية أو الألقاب الجارحة، والتلفظ بالطيب في الصف والملعب والبيت.',
      tag: 'أدب اللسان',
      badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200/60',
    },
    {
      id: 'verse2',
      title: 'جامع الفضائل والدستور الإلهي',
      surah: 'سورة النحل: آية 90',
      arabicText: '﴿إِنَّ اللَّهَ يَأْمُرُ بِالْعَدْلِ وَالإِحْسَانِ وَإِيتَاءِ ذِي الْقُرْبَىٰ وَيَنْهَىٰ عَنِ الْفَحْشَاءِ وَالْمُنكَرِ وَالْبَغْيِ﴾',
      tafseer: 'دستور إلهي يرسخ قيم العدالة الشاملة، الإحسان في العمل، التكافل الاجتماعي، وحماية المجتمع من الظلم والعدوان.',
      dailyImpact: 'الإنصاف في اللعب، مساعدة الزميل الضعيف، ونصرة المظلوم، والبعد عن التعدي على حقوق الآخرين.',
      tag: 'العدل والإحسان',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200/60',
    },
    {
      id: 'verse3',
      title: 'كمال الخلق والقدوة العظمى',
      surah: 'سورة القلم: آية 4',
      arabicText: '﴿وَإِنَّكَ لَعَلَىٰ خُلُقٍ عَظِيمٍ﴾',
      tafseer: 'ثناء إلهي خالد على رسول الله ﷺ لبيان أن جوهر الرسالة السماوية وأعظم زينة يتحلى بها الإنسان هي القيم والفضائل الرفيعة.',
      dailyImpact: 'الاقتداء برسول الله ﷺ في الصدق، الرحمة بالصغير، توقير الكبير، والأمانة في المعاملة.',
      tag: 'الخلق والقيم',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200/60',
    },
  ];

  const hadiths = [
    {
      id: 'h1',
      title: 'غاية البعثة النبوية',
      narrator: 'رواه أحمد وصححه الألباني',
      hadithText: '«إِنَّمَا بُعِثْتُ لِأُتَمِّمَ صَالِحَ الْأَخْلَاقِ» (وفي رواية: مَكَارِمَ الْأَخْلَاقِ)',
      explanation: 'الغاية الكبرى من إرسال النبي محمد ﷺ هي تكميل محاسن القيم وتثبيتها كسلوك عملي يعيشه المسلم.',
      application: 'أن نجعل كل قيمة نتعلمها (كالصدق والأمانة) تطبيقاً عملياً ننال به محبة النبي ﷺ وشفاعته.',
    },
    {
      id: 'h2',
      title: 'أحب العباد إلى الله',
      narrator: 'صحيح الترغيب',
      hadithText: 'سُئِلَ رَسُولُ اللَّهِ ﷺ: مَنْ أَحَبُّ عِبَادِ اللَّهِ إِلَى اللَّهِ؟ قَالَ: «أَحْسَنُهُمْ خُلُقًا»',
      explanation: 'القيمة الإنسانية والمنزلة الربانية ترتفع بحسن المعاملة والأمانة مع الخلق وليس فقط بالشعارات.',
      application: 'التنافس في نقاء المعاملة والابتسامة الصادقة وخدمة الناس ليكون الطالب من أحب عباد الله إلى الله.',
    },
    {
      id: 'h3',
      title: 'أعظم صفقة في الوجود',
      narrator: 'سنن الترمذي',
      hadithText: '«أَلَا إِنَّ سِلْعَةَ اللَّهِ غَالِيَةٌ.. أَلَا إِنَّ سِلْعَةَ اللَّهِ الْجَنَّةُ»',
      explanation: 'سلعة الله النفيسة لا تُشترى بالتهاون والكذب والتفريط، وإنما بالهمم العالية والصدق والأمانة.',
      application: 'استشعار أن القيم الأصيلة هي الثمن الحقيقي الذي نبذله لنيل الدرجات العلى من الجنة.',
    },
    {
      id: 'h4',
      title: 'القوة الحقيقية عند الغضب',
      narrator: 'متفق عليه',
      hadithText: '«لَيْسَ الشَّدِيدُ بِالصُّرَعَةِ، إِنَّمَا الشَّدِيدُ الَّذِي يَمْلِكُ نَفْسَهُ عِنْدَ الْغَضَبِ»',
      explanation: 'الرجولة الحقة والشخصية القوية لا تكمن في الصراخ والضرب، بل في ضبط النفس والتحكم بالانفعالات.',
      application: 'كظم الغيظ في الملعب والمشاجرات والترفع عن الشتائم وإيثار العفو عند المقدرة.',
    },
  ];

  const wisdoms = [
    {
      quote: '«إنما الأممُ الأخلاقُ ما بَقِيَتْ .. فإنْ هُمُ ذَهَبَتْ أخلاقُهُمْ ذَهَبُوا»',
      author: 'أمير الشعراء أحمد شوقي',
      insight: 'قوة أي مدرسة أو مجتمع تقاس بمدى التزام أبنائها بمبادئ الحق والأمانة، والتمسك بالقيم الحية هو صمام أمان الأمم.',
    },
    {
      quote: '«القيم ليست كلمات نرددها في الصباح، بل مواقف نعيشها في كل لحظة.»',
      author: 'منهج برنامج تذكرة - مدارس التنوير الأهلية',
      insight: 'التموضع القيمي الحقيقي يتجلى في ردود أفعالنا تحت الضغط وفي الخفاء عندما لا يرانا إلا الله.',
    },
    {
      quote: '«ليست القوة في كثرة ما تملك، بل في نُبل ما تُعطي وجمال ما تترك في قلوب الآخرين.»',
      author: 'حكمة تربوية تنويرية',
      insight: 'الأثر الحقيقي للإنسان يبقى بأفعاله الطيبة وتواضعه وجبره لخواطر الزملاء والمحتاجين.',
    },
  ];

  return (
    <div className="w-full space-y-6 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="bg-white border border-slate-200/90 p-6 sm:p-8 rounded-3xl text-center space-y-3 shadow-sm relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-100">
          <Compass className="w-4 h-4" />
          <span>بوصلة السماء: مصدر قيمنا التنويرية</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
          التأصيل الشرعي والإيماني لبرنامج تذكرة
        </h2>
        <p className="text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
          «إذا كانت هذه أوامر السماء.. فكيف تظهر في تفاصيل حياتنا المدرسية واليومية؟»
        </p>

        {/* Tab Switcher */}
        <div className="pt-2 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setActiveTab('quran')}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition ${
              activeTab === 'quran'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            📖 اقتباسات من نور القرآن (3 آيات)
          </button>
          <button
            onClick={() => setActiveTab('hadith')}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition ${
              activeTab === 'hadith'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            ✨ معين الهدي النبوي (4 أحاديث)
          </button>
          <button
            onClick={() => setActiveTab('wisdom')}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition ${
              activeTab === 'wisdom'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            📜 حكم وأقوال خالدة
          </button>
        </div>
      </div>

      {/* Quran Verses Display */}
      {activeTab === 'quran' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {quranVerses.map((v) => (
            <div
              key={v.id}
              className="bg-white border border-slate-200/90 hover:border-indigo-300 p-6 rounded-3xl shadow-sm flex flex-col justify-between space-y-4 text-right transition"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${v.badgeColor}`}>
                    {v.tag}
                  </span>
                  <span className="text-xs font-bold text-slate-500">{v.surah}</span>
                </div>

                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 text-center">
                  <p className="text-xl sm:text-2xl font-black text-indigo-900 font-['Amiri',serif] leading-loose">
                    {v.arabicText}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-indigo-700 mb-1">المعنى والتوجيه الرباني:</h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">{v.tafseer}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 bg-indigo-50/50 p-3.5 rounded-2xl border border-indigo-100/50">
                <h5 className="text-[11px] font-bold text-indigo-900 mb-1">تطبيقها في يومك بالمدرسة:</h5>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">{v.dailyImpact}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Hadiths Display */}
      {activeTab === 'hadith' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {hadiths.map((h) => (
            <div
              key={h.id}
              className="bg-white border border-slate-200/90 hover:border-emerald-300 p-6 rounded-3xl shadow-sm space-y-4 text-right transition flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-black text-slate-900">{h.title}</h3>
                  <span className="text-[10px] text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/70 font-bold">
                    {h.narrator}
                  </span>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center">
                  <p className="text-base sm:text-lg font-bold text-emerald-950 font-['Amiri',serif] leading-relaxed">
                    {h.hadithText}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-700 mb-1">الشرح والأثر التربوي:</h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">{h.explanation}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 bg-emerald-50/50 p-3.5 rounded-2xl border border-emerald-100/50">
                <h5 className="text-[11px] font-bold text-emerald-900 mb-1">الواجب العملي التنويري:</h5>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">{h.application}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Wisdoms Display */}
      {activeTab === 'wisdom' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {wisdoms.map((w, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200/90 hover:border-amber-300 p-6 rounded-3xl shadow-sm space-y-3 text-right transition flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="text-2xl text-amber-500 font-serif">❝</div>
                <p className="text-base font-bold text-slate-900 leading-relaxed font-['Amiri',serif]">
                  {w.quote}
                </p>
                <div className="text-xs text-indigo-700 font-bold">— {w.author}</div>
              </div>
              <div className="pt-3 border-t border-slate-100 text-xs text-slate-600 leading-relaxed font-medium">
                {w.insight}
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
