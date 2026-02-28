import React from 'react';
import { 
  LayoutDashboard, 
  FilePlus, 
  HelpCircle, 
  Map, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Sprout,
  AlertCircle,
  CheckCircle2,
  Clock,
  ChevronLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
// --- Constants ---
const ALGERIA_WILAYAS = [
  "01- أدرار", "02- الشلف", "03- الأغواط", "04- أم البواقي", "05- باتنة", "06- بجاية", "07- بسكرة", "08- بشار", "09- البليدة", "10- البويرة",
  "11- تمنراست", "12- تبسة", "13- تلمسان", "14- تيارت", "15- تيزي وزو", "16- الجزائر", "17- الجلفة", "18- جيجل", "19- سطيف", "20- سعيدة",
  "21- سكيكدة", "22- سيدي بلعباس", "23- عنابة", "24- قالمة", "25- قسنطينة", "26- المدية", "27- مستغانم", "28- المسيلة", "29- معسكر", "30- ورقلة",
  "31- وهران", "32- البيض", "33- إليزي", "34- برج بوعريريج", "35- بومرداس", "36- الطارف", "37- تندوف", "38- تسمسيلت", "39- الوادي", "40- خنشلة",
  "41- سوق أهراس", "42- تيبازة", "43- ميلة", "44- عين الدفلى", "45- النعامة", "46- عين تموشنت", "47- غرداية", "48- غليزان", "49- تيميمون", "50- برج باجي مختار",
  "51- أولاد جلال", "52- بني عباس", "53- عين صالح", "54- عين قزام", "55- تقرت", "56- جانت", "57- المغير", "58- المنيعة"
];

const PROBLEM_SOLUTIONS: Record<string, { title: string, action: string }> = {
  "نقص الوثائق القانونية": {
    title: "تسوية الوضعية الإدارية",
    action: "يجب عليك التقدم بطلب 'شهادة الحيازة' على مستوى البلدية (APC) أو الاتصال بمديرية أملاك الدولة لاستخراج الدفتر العقاري."
  },
  "مشاكل المسح العقاري": {
    title: "الطعن في المسح",
    action: "توجه إلى المحافظة العقارية لتقديم شكوى رسمية أو طلب إعادة معاينة من طرف الوكالة الوطنية للمسح العقاري."
  },
  "نزاعات بين الورثة": {
    title: "الوساطة القانونية",
    action: "ننصح باللجوء إلى موثق لإعداد 'الفريضة' أو طلب وساطة قضائية لتقسيم الاستغلال ودياً لضمان استمرارية الإنتاج."
  },
  "غياب الإمكانيات المادية": {
    title: "التمويل الفلاحي",
    action: "يمكنك الاستفادة من قروض 'الرفيق' أو 'التحدي' عبر بنك الفلاحة والتنمية الريفية (BADR). تواصل مع الغرفة الفلاحية لولايتك."
  },
  "عراقيل تقنية (كهرباء، ماء)": {
    title: "طلب تراخيص التجهيز",
    action: "يمكنك تقديم طلب عبر قسم 'التراخيص' في منصتنا للحصول على رخصة حفر بئر أو الربط بالكهرباء الفلاحية."
  },
  "أخرى": {
    title: "مراجعة المصالح الفلاحية",
    action: "يرجى التقدم بطلب مقابلة مع مديرية المصالح الفلاحية (DSA) لشرح وضعيتك الخاصة والحصول على توجيه دقيق."
  }
};

const PERMIT_TYPES = [
  { 
    id: 'well', 
    title: 'رخصة حفر بئر', 
    icon: HelpCircle, 
    desc: 'للحصول على الموارد المائية الضرورية للسقي.',
    docs: [
      'طلب خطي موجه لمدير الموارد المائية.',
      'نسخة من بطاقة التعريف الوطنية.',
      'نسخة من عقد الملكية أو شهادة الحيازة أو عقد الامتياز.',
      'مخطط بياني للموقع (Plan de situation) مقياس 1/5000 أو 1/25000.',
      'تقرير تقني أولي من مهندس مختص في الهيدرولوجيا.'
    ]
  },
  { 
    id: 'elec', 
    title: 'كهرباء فلاحية', 
    icon: Settings, 
    desc: 'ربط المستثمرة بالشبكة الكهربائية لتشغيل المعدات.',
    docs: [
      'نسخة من عقد الملكية أو عقد الامتياز الفلاحي.',
      'نسخة من بطاقة الفلاح سارية المفعول.',
      'مخطط الكتلة (Plan de masse) يوضح موقع المحول الكهربائي.',
      'دراسة تقنية أولية من طرف مصالح سونلغاز.',
      'شهادة مطابقة للمنشآت (في حالة وجود بناء).'
    ]
  },
  { 
    id: 'build', 
    title: 'بناء ريفي/مخزن', 
    icon: Map, 
    desc: 'ترخيص لبناء مستودعات تبريد أو غرف تخزين.',
    docs: [
      'نسخة من عقد الملكية أو الامتياز.',
      'مخطط هندسي للمبنى معد من طرف مهندس معماري معتمد.',
      'بطاقة فلاح.',
      'تقرير يبرر الحاجة للمنشأة (تخزين، تبريد، تربية مواشي).',
      'الموافقة المسبقة من مديرية المصالح الفلاحية (DSA).'
    ]
  },
  { 
    id: 'fence', 
    title: 'تسييج الأرض', 
    icon: CheckCircle2, 
    desc: 'حماية المحاصيل والمواشي من الاعتداءات.',
    docs: [
      'طلب خطي يشرح دواعي التسييج.',
      'نسخة من عقد الملكية أو شهادة الحيازة.',
      'مخطط يوضح حدود الأرض والمسار المخصص للسياج.',
      'تعهد بعدم تغيير طبيعة الأرض أو بناء منشآت غير مرخصة.'
    ]
  },
];

type View = 'landing' | 'dashboard' | 'report' | 'admin' | 'permits';

interface LandReport {
  id: string;
  ownerName: string;
  location: string;
  area: string;
  problemType: string;
  status: 'pending' | 'analyzing' | 'resolved';
  date: string;
}

// --- Components ---

const Navbar = ({ currentView, setView }: { currentView: View, setView: (v: View) => void }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('landing')}>
            <div className="bg-emerald-600 p-2 rounded-lg">
              <Sprout className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-bold text-emerald-900">Ardi Filahia DZ</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => setView('landing')} className={`text-sm font-medium ${currentView === 'landing' ? 'text-emerald-600' : 'text-stone-600 hover:text-emerald-600'}`}>الرئيسية</button>
            <button onClick={() => setView('dashboard')} className={`text-sm font-medium ${currentView === 'dashboard' ? 'text-emerald-600' : 'text-stone-600 hover:text-emerald-600'}`}>لوحة التحكم</button>
            <button onClick={() => setView('permits')} className={`text-sm font-medium ${currentView === 'permits' ? 'text-emerald-600' : 'text-stone-600 hover:text-emerald-600'}`}>التراخيص</button>
            <button onClick={() => setView('report')} className="bg-emerald-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-emerald-700 transition-colors">تسجيل أرض</button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-stone-600">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white border-b border-stone-200 p-4 space-y-4"
          >
            <button onClick={() => { setView('landing'); setIsOpen(false); }} className="block w-full text-right px-4 py-2 text-stone-600">الرئيسية</button>
            <button onClick={() => { setView('dashboard'); setIsOpen(false); }} className="block w-full text-right px-4 py-2 text-stone-600">لوحة التحكم</button>
            <button onClick={() => { setView('permits'); setIsOpen(false); }} className="block w-full text-right px-4 py-2 text-stone-600">التراخيص</button>
            <button onClick={() => { setView('report'); setIsOpen(false); }} className="block w-full text-right px-4 py-2 text-emerald-600 font-bold">تسجيل أرض</button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ onStart }: { onStart: () => void }) => (
  <section className="relative pt-32 pb-20 overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="text-center max-w-3xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-extrabold text-stone-900 leading-tight mb-6"
        >
          نحو استغلال أمثل <span className="text-emerald-600">للأراضي الفلاحية</span> في الجزائر
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-stone-600 mb-10 leading-relaxed"
        >
          منصة رقمية تهدف إلى معالجة مشكل الأراضي غير المستغلة، وتوفير الدعم التقني والقانوني للمزارعين لإعادة إدماج أراضيهم في الدورة الإنتاجية.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <button 
            onClick={onStart}
            className="bg-emerald-600 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200"
          >
            ابدأ الآن - تسجيل أرض
          </button>
          <button className="bg-white text-stone-700 border border-stone-200 px-8 py-4 rounded-full text-lg font-bold hover:bg-stone-50 transition-all">
            اكتشف المزيد
          </button>
        </motion.div>
      </div>
    </div>
    
    {/* Background Decorative Elements */}
    <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-emerald-100/50 rounded-full blur-3xl -z-10" />
    <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-amber-100/50 rounded-full blur-3xl -z-10" />
  </section>
);

const FeatureCard = ({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) => (
  <div className="bg-white p-8 rounded-3xl border border-stone-100 card-shadow hover:border-emerald-200 transition-all group">
    <div className="bg-emerald-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 transition-colors">
      <Icon className="text-emerald-600 w-7 h-7 group-hover:text-white transition-colors" />
    </div>
    <h3 className="text-xl font-bold text-stone-900 mb-3">{title}</h3>
    <p className="text-stone-600 leading-relaxed">{desc}</p>
  </div>
);

const LandForm = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
  const [step, setStep] = React.useState(1);
  const [problemType, setProblemType] = React.useState("نقص الوثائق القانونية");

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 md:p-12 rounded-[2rem] border border-stone-100 shadow-xl">
      <div className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-stone-900">تسجيل أرض فلاحية</h2>
          <span className="text-sm font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">الخطوة {step} من 3</span>
        </div>
        <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${(step / 3) * 100}%` }}
            className="bg-emerald-600 h-full"
          />
        </div>
      </div>

      <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); if(step < 3) setStep(step + 1); else onSubmit({}); }}>
        {step === 1 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-stone-700 mb-2">اسم المالك أو المستغل</label>
              <input type="text" className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all" placeholder="الاسم الكامل" required />
            </div>
            <div>
              <label className="block text-sm font-bold text-stone-700 mb-2">رقم الهاتف</label>
              <input type="tel" className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all" placeholder="0XXXXXXXXX" required />
            </div>
            <div>
              <label className="block text-sm font-bold text-stone-700 mb-2">الولاية</label>
              <select className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all" required>
                <option value="">اختر الولاية</option>
                {ALGERIA_WILAYAS.map(w => <option key={w} value={w}>{w}</option>)}
              </select>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-stone-700 mb-2">مساحة الأرض (هكتار)</label>
              <input type="number" className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all" placeholder="0.00" required />
            </div>
            <div>
              <label className="block text-sm font-bold text-stone-700 mb-2">طبيعة العقار</label>
              <select className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all">
                <option>ملك خاص</option>
                <option>عقار الدولة (امتياز)</option>
                <option>عقار عرشي</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-stone-700 mb-2">مدة التوقف عن الاستغلال</label>
              <input type="text" className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all" placeholder="مثال: سنتين" required />
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-stone-700 mb-2">سبب عدم الاستغلال</label>
              <select 
                value={problemType}
                onChange={(e) => setProblemType(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
              >
                {Object.keys(PROBLEM_SOLUTIONS).map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            
            {/* Instant Solution Feedback */}
            <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl">
              <div className="flex items-center gap-2 mb-2 text-emerald-700">
                <AlertCircle className="w-5 h-5" />
                <span className="font-bold">{PROBLEM_SOLUTIONS[problemType].title}</span>
              </div>
              <p className="text-sm text-emerald-800 leading-relaxed">
                {PROBLEM_SOLUTIONS[problemType].action}
              </p>
            </div>

            <div>
              <label className="block text-sm font-bold text-stone-700 mb-2">شرح إضافي للمشكل</label>
              <textarea className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all h-32" placeholder="اكتب تفاصيل أكثر هنا..."></textarea>
            </div>
          </motion.div>
        )}

        <div className="flex gap-4 pt-6">
          {step > 1 && (
            <button 
              type="button"
              onClick={() => setStep(step - 1)}
              className="flex-1 px-6 py-3 rounded-xl border border-stone-200 text-stone-600 font-bold hover:bg-stone-50 transition-all"
            >
              السابق
            </button>
          )}
          <button 
            type="submit"
            className="flex-2 bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100"
          >
            {step === 3 ? 'إرسال الطلب' : 'التالي'}
          </button>
        </div>
      </form>
    </div>
  );
};

const PermitsView = () => {
  const [selectedPermit, setSelectedPermit] = React.useState<any>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-stone-900 mb-4">التراخيص الفلاحية</h1>
        <p className="text-stone-600 max-w-2xl mx-auto">تقدم بطلبك للحصول على التراخيص اللازمة لتجهيز مستثمرتك الفلاحية بأحدث الوسائل.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {PERMIT_TYPES.map((permit) => (
          <div key={permit.id} className="bg-white p-8 rounded-[2rem] border border-stone-100 card-shadow flex flex-col items-center text-center group hover:border-emerald-500 transition-all">
            <div className="bg-emerald-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 transition-colors">
              <permit.icon className="text-emerald-600 w-8 h-8 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-xl font-bold text-stone-900 mb-3">{permit.title}</h3>
            <p className="text-sm text-stone-500 mb-6 leading-relaxed">{permit.desc}</p>
            <button 
              onClick={() => setSelectedPermit(permit)}
              className="mt-auto w-full bg-stone-50 text-stone-700 py-3 rounded-xl font-bold hover:bg-emerald-600 hover:text-white transition-all"
            >
              عرض الملف المطلوب
            </button>
          </div>
        ))}
      </div>

      {/* Modal for Required Documents */}
      <AnimatePresence>
        {selectedPermit && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPermit(null)}
              className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white w-full max-w-lg rounded-[2.5rem] p-8 md:p-10 shadow-2xl overflow-hidden"
            >
              <button 
                onClick={() => setSelectedPermit(null)}
                className="absolute top-6 left-6 text-stone-400 hover:text-stone-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex items-center gap-4 mb-8">
                <div className="bg-emerald-50 p-4 rounded-2xl">
                  <selectedPermit.icon className="text-emerald-600 w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-stone-900">{selectedPermit.title}</h3>
                  <p className="text-stone-500 text-sm">قائمة الوثائق المطلوبة لتكوين الملف</p>
                </div>
              </div>

              <ul className="space-y-4 mb-10">
                {selectedPermit.docs.map((doc: string, i: number) => (
                  <li key={i} className="flex gap-3 text-stone-700 leading-relaxed">
                    <div className="mt-1.5 w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>

              <div className="flex gap-4">
                <button 
                  onClick={() => setSelectedPermit(null)}
                  className="flex-1 bg-emerald-600 text-white py-4 rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100"
                >
                  فهمت، شكراً
                </button>
                <button className="flex-1 border border-stone-200 text-stone-600 py-4 rounded-2xl font-bold hover:bg-stone-50 transition-all">
                  تحميل القائمة PDF
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="mt-16 bg-amber-50 border border-amber-100 p-8 rounded-[2rem] flex flex-col md:flex-row items-center gap-8">
        <div className="bg-amber-100 p-4 rounded-2xl">
          <AlertCircle className="text-amber-600 w-10 h-10" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-amber-900 mb-2">ملاحظة هامة حول التراخيص</h3>
          <p className="text-amber-800 leading-relaxed">
            جميع طلبات التراخيص تخضع لمعاينة ميدانية من طرف المصالح الفلاحية المختصة. يرجى التأكد من صحة الوثائق المرفقة لتسريع عملية المعالجة.
          </p>
        </div>
      </div>
    </div>
  );
};

const InvestorsView = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
    <div className="text-center mb-16">
      <h1 className="text-4xl font-bold text-stone-900 mb-4">فرص الاستثمار والشراكة</h1>
      <p className="text-stone-600 max-w-2xl mx-auto">منصتنا تربط أصحاب الأراضي غير المستغلة بمستثمرين جادين لإعادة إحياء النشاط الفلاحي.</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {INVESTOR_OPPORTUNITIES.map((opp) => (
        <div key={opp.id} className="bg-white rounded-[2rem] border border-stone-100 card-shadow overflow-hidden group hover:border-emerald-500 transition-all">
          <div className="h-48 bg-stone-200 relative">
            <img 
              src={`https://picsum.photos/seed/${opp.id}/800/600`} 
              alt={opp.title} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-4 right-4 bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-bold">
              {opp.type}
            </div>
          </div>
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-stone-900">{opp.title}</h3>
              <span className="text-emerald-600 font-bold">{opp.area}</span>
            </div>
            <div className="flex items-center gap-2 text-stone-500 text-sm mb-6">
              <Map className="w-4 h-4" />
              <span>{opp.location}</span>
            </div>
            <button className="w-full bg-emerald-600 text-white py-3 rounded-xl font-bold hover:bg-emerald-700 transition-all">
              تواصل مع صاحب الأرض
            </button>
          </div>
        </div>
      ))}
    </div>

    <div className="mt-20 bg-emerald-900 text-white p-12 rounded-[3rem] relative overflow-hidden">
      <div className="relative z-10 max-w-2xl">
        <h2 className="text-3xl font-bold mb-6">هل أنت مستثمر فلاحي؟</h2>
        <p className="text-emerald-100 mb-8 leading-relaxed">
          انضم إلى شبكتنا للوصول إلى آلاف الهكتارات من الأراضي الخصبة التي تنتظر الاستثمار. نحن نوفر لك الحماية القانونية والوساطة لضمان نجاح مشروعك.
        </p>
        <button className="bg-white text-emerald-900 px-8 py-4 rounded-full font-bold hover:bg-emerald-50 transition-all">
          سجل كمستثمر الآن
        </button>
      </div>
      <Sprout className="absolute -bottom-10 -left-10 w-64 h-64 text-emerald-800/50 rotate-12" />
    </div>
  </div>
);

const Dashboard = () => {
  const stats = [
    { label: 'أراضي مسجلة', value: '12', icon: Map, color: 'bg-blue-50 text-blue-600' },
    { label: 'قيد الدراسة', value: '05', icon: Clock, color: 'bg-amber-50 text-amber-600' },
    { label: 'تمت تسويتها', value: '07', icon: CheckCircle2, color: 'bg-emerald-50 text-emerald-600' },
  ];

  const reports: LandReport[] = [
    { id: '1', ownerName: 'أحمد بن علي', location: 'البليدة', area: '15 هكتار', problemType: 'نزاع ورثة', status: 'analyzing', date: '2024/02/15' },
    { id: '2', ownerName: 'محمد السعيد', location: 'سطيف', area: '08 هكتار', problemType: 'نقص وثائق', status: 'resolved', date: '2024/01/20' },
    { id: '3', ownerName: 'عمر فاروق', location: 'تلمسان', area: '22 هكتار', problemType: 'عراقيل تقنية', status: 'pending', date: '2024/02/28' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-stone-900">لوحة التحكم</h1>
          <p className="text-stone-500">مرحباً بك مجدداً، إليك ملخص نشاطك</p>
        </div>
        <button className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2">
          <FilePlus className="w-5 h-5" />
          طلب جديد
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-stone-100 card-shadow flex items-center gap-4">
            <div className={`${stat.color} p-4 rounded-2xl`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-stone-500 font-medium">{stat.label}</p>
              <p className="text-2xl font-bold text-stone-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl border border-stone-100 card-shadow overflow-hidden">
        <div className="p-6 border-b border-stone-100 flex justify-between items-center">
          <h2 className="text-xl font-bold text-stone-900">الأراضي المسجلة</h2>
          <button className="text-emerald-600 text-sm font-bold">عرض الكل</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead className="bg-stone-50 text-stone-500 text-sm">
              <tr>
                <th className="px-6 py-4 font-bold">المالك</th>
                <th className="px-6 py-4 font-bold">الموقع</th>
                <th className="px-6 py-4 font-bold">المساحة</th>
                <th className="px-6 py-4 font-bold">نوع المشكل</th>
                <th className="px-6 py-4 font-bold">الحالة</th>
                <th className="px-6 py-4 font-bold">التاريخ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {reports.map((report) => (
                <tr key={report.id} className="hover:bg-stone-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-stone-900">{report.ownerName}</td>
                  <td className="px-6 py-4 text-stone-600">{report.location}</td>
                  <td className="px-6 py-4 text-stone-600">{report.area}</td>
                  <td className="px-6 py-4 text-stone-600">{report.problemType}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      report.status === 'resolved' ? 'bg-emerald-100 text-emerald-700' :
                      report.status === 'analyzing' ? 'bg-amber-100 text-amber-700' :
                      'bg-stone-100 text-stone-600'
                    }`}>
                      {report.status === 'resolved' ? 'تمت التسوية' :
                       report.status === 'analyzing' ? 'قيد الدراسة' : 'معلق'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-stone-400 text-sm">{report.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [view, setView] = React.useState<View>('landing');

  return (
    <div className="min-h-screen font-sans">
      <Navbar currentView={view} setView={setView} />
      
      <main>
        <AnimatePresence mode="wait">
          {view === 'landing' && (
            <motion.div 
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Hero onStart={() => setView('report')} />
              
              <section className="py-20 bg-stone-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-stone-900 mb-4">خدماتنا للمزارعين</h2>
                    <p className="text-stone-600 max-w-2xl mx-auto">نحن هنا لتبسيط الإجراءات الإدارية وتقليل التعقيدات، وتعزيز التواصل بين الفلاح والإدارة.</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <FeatureCard 
                      icon={Map} 
                      title="تسجيل الأراضي" 
                      desc="إحصاء دقيق للأراضي غير المستغلة وتحديد وضعيتها القانونية والتقنية." 
                    />
                    <FeatureCard 
                      icon={HelpCircle} 
                      title="دعم تقني وقانوني" 
                      desc="توفير استشارات متخصصة لحل مشاكل العقار الفلاحي والنزاعات." 
                    />
                    <FeatureCard 
                      icon={FilePlus} 
                      title="تراخيص فلاحية" 
                      desc="تسهيل الحصول على رخص حفر الآبار، الكهرباء، والمنشآت البسيطة." 
                    />
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {view === 'report' && (
            <motion.div 
              key="report"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="pt-32 pb-20 px-4"
            >
              <LandForm onSubmit={() => setView('dashboard')} />
            </motion.div>
          )}

          {view === 'dashboard' && (
            <motion.div 
              key="dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Dashboard />
            </motion.div>
          )}

          {view === 'permits' && (
            <motion.div 
              key="permits"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <PermitsView />
            </motion.div>
          )}
          {view === 'investors' && (
            <motion.div 
              key="investors"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <InvestorsView />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="bg-stone-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-emerald-600 p-2 rounded-lg">
                  <Sprout className="text-white w-6 h-6" />
                </div>
                <span className="text-2xl font-bold">Ardi Filahia DZ</span>
              </div>
              <p className="text-stone-400 leading-relaxed max-w-md">
                مشروع يهدف إلى خلق أداة عملية تجمع بين الفلاح والإدارة وهيئات العقار، اعتماداً على التكنولوجيا الحديثة، بهدف إعادة إحياء الأراضي المهملة وتحويلها إلى موارد منتجة.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6">روابط سريعة</h4>
              <ul className="space-y-4 text-stone-400">
                <li><button onClick={() => setView('landing')} className="hover:text-emerald-500 transition-colors">الرئيسية</button></li>
                <li><button onClick={() => setView('dashboard')} className="hover:text-emerald-500 transition-colors">لوحة التحكم</button></li>
                <li><button onClick={() => setView('permits')} className="hover:text-emerald-500 transition-colors">التراخيص</button></li>
                <li><button onClick={() => setView('report')} className="hover:text-emerald-500 transition-colors">تسجيل أرض</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6">تواصل معنا</h4>
              <ul className="space-y-4 text-stone-400">
                <li>الجزائر العاصمة، الجزائر</li>
                <li>contact@ardouna.dz</li>
                <li>+213 (0) 21 XX XX XX</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-stone-800 text-center text-stone-500 text-sm">
            <p>© 2024 Ardi Filahia DZ. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

