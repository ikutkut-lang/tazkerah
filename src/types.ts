export type StageId = 'stage1' | 'stage2'; // stage1: 4-6, stage2: 7-9
export type GenderMode = 'male' | 'female' | 'both';
export type ActiveTab = 'presentation' | 'scale' | 'scenarios' | 'tree' | 'store' | 'ticket' | 'praise' | 'quran' | 'quiz' | 'guide';

export interface SlideData {
  id: number;
  title: string;
  subtitle?: string;
  tag?: string;
  stage: 'both' | StageId;
  category: 'intro' | 'quran_hadith' | 'scale' | 'concept' | 'scenarios' | 'tree' | 'activity' | 'ticket' | 'conclusion';
  bgGradient?: string;
  content: {
    heading?: string;
    subheading?: string;
    quote?: string;
    source?: string;
    explanation?: string;
    points?: string[];
    comparison?: {
      left: { title: string; desc: string; icon?: string; type: 'precious' | 'cheap' };
      right: { title: string; desc: string; icon?: string; type: 'precious' | 'cheap' };
      conclusion: string;
      lifeLaw: string;
    };
    equation?: {
      thought: string;
      action: string;
      result: string;
      examples: { value: string; behavior: string }[];
    };
    decisionTree?: {
      situation: string;
      leftPath: { action: string; result: string; type: 'negative' };
      rightPath: { action: string; result: string; type: 'positive' };
      revealedValue: string;
    };
    treeData?: {
      roots: string;
      trunk: string;
      fruits: { name: string; desc: string; icon: string }[];
    };
    interactiveActivity?: {
      title: string;
      description: string;
      type: 'identity' | 'store' | 'ticket' | 'praise' | 'drama';
    };
  };
}

export interface Scenario {
  id: string;
  title: string;
  stage: 'both' | StageId;
  genderTarget?: GenderMode;
  location: string;
  story: string;
  context: string;
  cheapReaction: {
    title: string;
    action: string;
    outcome: string;
    costText: string;
  };
  nobleReaction: {
    title: string;
    action: string;
    outcome: string;
    valueEarned: string;
    valueName: string;
  };
  roles?: string[];
  challenge: string;
  targetValue: string;
  isDigital?: boolean;
}

export interface QuizQuestion {
  id: number;
  stage: StageId;
  question: string;
  situation?: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
  category: string;
  tip: string;
}

export interface EliotStandard {
  number: number;
  domain: string;
  text: string;
  targetStage: 'both' | StageId;
  evidence: string;
}

export interface LessonPlanStage {
  id: string;
  name: string;
  nameEn: string;
  durationMinutes: number;
  teacherMinutes: number;
  studentMinutes: number;
  teacherRole: string;
  studentRole: string;
  description: string;
  eliotStandards: number[];
  steps: {
    actor: 'teacher' | 'student';
    action: string;
  }[];
}

export interface ValueCard {
  id: string;
  name: string;
  icon: string;
  definition: string;
  dailyExample: string;
  color: string;
}
