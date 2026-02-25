
import React, { createContext, useState, useContext, ReactNode, useMemo, useEffect } from 'react';

const supportedLanguages = {
  en: 'English',
  es: 'Español',
  ar: 'العربية',
  nl: 'Nederlands',
  fr: 'Français',
  de: 'Deutsch',
  it: 'Italiano',
  'zh-CN': '简体中文',
  ja: '日本語',
  ko: '한국어',
};

const uiStrings: Record<string, Record<string, string>> = {
    // Header
    schoolDivisions: {
        en: 'School Divisions', es: 'Divisiones Escolares', ar: 'أقسام المدرسة', nl: 'Schoolafdelingen',
        fr: 'Divisions Scolaires', de: 'Schulabteilungen', it: 'Divisioni Scolastiche', 'zh-CN': '学校部门', ja: '学校部門', ko: '학교 부서',
    },
    getStarted: {
        en: 'Get Started', es: 'Comenzar', ar: 'ابدأ', nl: 'Beginnen',
        fr: 'Commencer', de: 'Loslegen', it: 'Iniziare', 'zh-CN': '开始', ja: '始める', ko: '시작하기',
    },
    ptso: {
        en: 'PTSO', es: 'PTSO', ar: 'منظمة الآباء والمعلمين والطلاب', nl: 'PTSO',
        fr: 'PTSO', de: 'PTSO', it: 'PTSO', 'zh-CN': '家校学生组织', ja: 'PTSO', ko: 'PTSO',
    },
    boosterClub: {
        en: 'Booster Club', es: 'Club de Apoyo', ar: 'نادي الداعمين', nl: 'Booster Club',
        fr: 'Booster Club', de: 'Booster Club', it: 'Booster Club', 'zh-CN': '助推俱乐部', ja: 'ブースタークラブ', ko: '부스터 클럽',
    },
    adminLogin: {
        en: 'Admin Login', es: 'Acceso Admin', ar: 'دخول المسؤول', nl: 'Admin Login',
        fr: 'Connexion Admin', de: 'Admin-Login', it: 'Accesso Admin', 'zh-CN': '管理员登录', ja: '管理者ログイン', ko: '관리자 로그인',
    },
    adminDashboard: {
        en: 'Admin Dashboard', es: 'Panel de Admin', ar: 'لوحة تحكم المسؤول', nl: 'Admin Dashboard',
        fr: 'Tableau de Bord Admin', de: 'Admin-Dashboard', it: 'Dashboard Admin', 'zh-CN': '管理仪表盘', ja: '管理者ダッシュボード', ko: '관리자 대시보드',
    },
    elementarySchool: {
        en: 'Elementary School', es: 'Primaria', ar: 'المدرسة الابتدائية', nl: 'Basisschool',
        fr: 'École Élémentaire', de: 'Grundschule', it: 'Scuola Elementare', 'zh-CN': '小学', ja: '小学校', ko: '초등학교',
    },
    middleSchool: {
        en: 'Middle School', es: 'Secundaria', ar: 'المدرسة المتوسطة', nl: 'Middelbare School',
        fr: 'Collège', de: 'Mittelschule', it: 'Scuola Media', 'zh-CN': '中学', ja: '中学校', ko: '중학교',
    },
    highSchool: {
        en: 'High School', es: 'Bachillerato', ar: 'المدرسة الثانوية', nl: 'Bovenbouw',
        fr: 'Lycée', de: 'Oberschule', it: 'Scuola Superiore', 'zh-CN': '高中', ja: '高校', ko: '고등학교',
    },

    // Home Page
    welcomeTitle: {
        en: 'The Launchpad: Ready, Set, AIS-R!', es: 'Bienvenido al Portal de Bienvenida para Nuevas Familias de AISR', ar: 'مرحباً بكم في بوابة تأهيل الأسر الجديدة في المدرسة الأمريكية الدولية بالرياض', nl: 'Welkom bij het AISR Onboarding Portaal voor Nieuwe Gezinnen',
        fr: 'Bienvenue sur le portail d\'accueil des nouvelles familles de l\'AISR', de: 'Willkommen im Onboarding-Portal für neue Familien der AISR', it: 'Benvenuti nel Portale di Onboarding per le Nuove Famiglie AISR', 'zh-CN': '欢迎来到AISR新家庭入学门户', ja: 'AISR新家族向けオンボーディングポータルへようこそ', ko: 'AISR 새로운 가족 온보딩 포털에 오신 것을 환영합니다',
    },
    welcomeMessage: {
        en: 'Welcome Aboard! Joining the AIS-R community is an exciting journey, and we’re here to ensure you have a smooth start. We’ve gathered every essential detail—from ordering uniforms and lunch IDs to understanding dismissal times—right here in one hub. Fasten your seatbelts and let’s get you ready for Day One!', es: 'Estamos encantados de darle la bienvenida a nuestra comunidad. Por favor, seleccione su período de inscripción para comenzar.', ar: 'يسعدنا أن نرحب بكم في مجتمعنا. يرجى تحديد فترة التسجيل الخاصة بكم للبدء.', nl: 'We zijn verheugd u te verwelkomen in onze gemeenschap. Selecteer uw inschrijvingsperiode om te beginnen.',
        fr: 'Nous sommes ravis de vous accueillir dans notre communauté. Veuillez sélectionner votre période d\'inscription pour commencer.', de: 'Wir freuen uns, Sie in unserer Gemeinschaft willkommen zu heißen. Bitte wählen Sie Ihren Anmeldezeitraum aus, um zu beginnen.', it: 'Siamo lieti di darvi il benvenuto nella nostra comunità. Selezionate il vostro periodo di iscrizione per iniziare.', 'zh-CN': '我们很高兴欢迎您加入我们的社区。请选择您的入学期间以开始。', ja: '私たちのコミュニティへようこそ。登録期間を選択して開始してください。', ko: '우리 커뮤니티에 오신 것을 환영합니다. 등록 기간을 선택하여 시작하십시오.',
    },
};


interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  supportedLanguages: typeof supportedLanguages;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<string>(() => {
    return localStorage.getItem('aisr-lang') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('aisr-lang', language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const setLanguage = (lang: string) => {
    if (supportedLanguages[lang as keyof typeof supportedLanguages]) {
      setLanguageState(lang);
    }
  };

  const t = useMemo(() => (key: string): string => {
    const keyStrings = uiStrings[key];
    if (!keyStrings) {
        console.warn(`Translation key "${key}" not found.`);
        return key;
    }
    return keyStrings[language] || keyStrings['en'];
  }, [language]);
  
  const value = { language, setLanguage, supportedLanguages, t };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
