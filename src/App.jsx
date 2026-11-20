import { useEffect, useMemo, useState } from 'react';
import {
  ArrowDownLeft, ArrowLeft, ArrowUpLeft, Award, Check, ChevronLeft,
  Clock3, Crown, Gift, HeartHandshake, Menu, MessageCircle, PackageCheck,
  MapPin, Phone, Sparkles, Star, X, ZoomIn,
} from 'lucide-react';
import { categories, portfolio, products } from './data.js';

// Replace the clearly marked demo number below with the business WhatsApp number.
const WHATSAPP_NUMBER = '966000000000';
const BRAND_NAME = 'دار التميز للهدايا والدروع';
const CONTACT = {
  phone: 'يضاف رقم الهاتف',
  location: 'تضاف المدينة أو المنطقة',
  hours: 'تضاف أوقات العمل',
  mapUrl: '', // Add a Google Maps share/embed URL when business location is confirmed.
};

const navItems = [
  ['الرئيسية', 'home'], ['منتجاتنا', 'products'], ['أعمالنا', 'portfolio'],
  ['من نحن', 'about'], ['تواصل معنا', 'contact'],
];

function whatsappUrl(message = 'السلام عليكم، أرغب بالاستفسار عن منتجاتكم.') {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function WhatsAppLink({ children, message, className = '', icon = true, ...props }) {
  return (
    <a className={className} href={whatsappUrl(message)} target="_blank" rel="noreferrer" {...props}>
      {children}{icon && <MessageCircle size={17} strokeWidth={1.8} aria-hidden="true" />}
    </a>
  );
}

function BrandMark({ inverse = false }) {
  return (
    <a className={`brand ${inverse ? 'brand--inverse' : ''}`} href="#home" aria-label={`${BRAND_NAME} — الرئيسية`}>
      <span className="brand__seal" aria-hidden="true"><Crown size={23} strokeWidth={1.4} /></span>
      <span className="brand__copy">
        <strong>{BRAND_NAME}</strong>
        <small>تفاصيل تُقدّر الإنجاز</small>
      </span>
    </a>
  );
}

function SectionHeading({ eyebrow, title, text, light = false, action }) {
  return (
    <div className={`section-heading ${light ? 'section-heading--light' : ''}`}>
      <div className="section-heading__copy">
        <span className="eyebrow"><span />{eyebrow}</span>
        <h2>{title}</h2>
        {text && <p>{text}</p>}
      </div>
      {action}
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const closeOnEscape = (event) => event.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);
  return (
    <header className="site-header">
      <div className="header-inner container">
        <BrandMark />
        <nav className={`main-nav ${open ? 'main-nav--open' : ''}`} aria-label="التنقل الرئيسي">
          {navItems.map(([label, id]) => (
            <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{label}</a>
          ))}
          <WhatsAppLink className="nav-mobile-cta" message="السلام عليكم، أرغب بالتواصل مع دار التميز.">تواصل عبر واتساب</WhatsAppLink>
        </nav>
        <div className="header-actions">
          <WhatsAppLink className="button button--nav" message="السلام عليكم، أرغب بالتواصل مع دار التميز.">تواصل معنا</WhatsAppLink>
          <button className="menu-toggle" type="button" aria-label={open ? 'إغلاق القائمة' : 'فتح القائمة'} aria-expanded={open} onClick={() => setOpen((value) => !value)}>
            {open ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <div className="hero__grain" aria-hidden="true" />
      <div className="container hero__layout">
        <div className="hero__content">
          <div className="hero__overline"><span className="overline-line" /> لمسات تُخلّد اللحظة</div>
          <h1 id="hero-title">نصنع لحظات التقدير...<br /><em>ونخلّد الإنجازات</em></h1>
          <p>دروع تكريم وهدايا دعائية بتصاميم مميزة وجودة تليق بإنجازاتكم ومناسباتكم.</p>
          <div className="hero__actions">
            <a href="#products" className="button button--gold">استعرض منتجاتنا <ArrowLeft size={17} /></a>
            <a href="#custom" className="hero__secondary">اطلب تصميمك الخاص <ArrowUpLeft size={16} /></a>
          </div>
          <div className="hero__note"><span className="note-star">✳</span><span>هدية بتفاصيلكم، صُنعت لتبقى</span></div>
        </div>
        <div className="hero-art" aria-label="نماذج من الدروع والجوائز والهدايا المخصصة">
          <div className="hero-art__frame">
            <img src="/manus-storage/async-images/wB4xYf9RVetM83tLU1d6AE/image-1.webp" alt="تكوين فاخر من دروع خشبية وجوائز كريستالية وهدايا مؤسسية" fetchPriority="high" />
            <div className="hero-art__label"><span>اختيار بعناية</span><strong>تفاصيل تصنع الفرق</strong></div>
          </div>
          <div className="hero-art__thumb"><img src="/images/wooden-plaque.jpg" alt="تفاصيل درع خشبي مخصص" /></div>
          <span className="hero-art__seal" aria-hidden="true"><Sparkles size={22} /></span>
          <div className="hero-art__index">01 <span /> 06</div>
        </div>
        <a className="hero__scroll" href="#categories"><span>اكتشفوا مجموعتنا</span><ArrowDownLeft size={15} /></a>
      </div>
      <div className="hero__bottom-line" />
    </section>
  );
}

function Categories() {
  return (
    <section className="categories section-pad" id="categories">
      <div className="container">
        <SectionHeading eyebrow="اختياراتنا" title="لكل إنجازٍ درع يليق به" text="من هديةٍ تعبّر عن الامتنان، إلى جائزةٍ تحتفي بإنجازٍ استثنائي." action={<a href="#products" className="text-link">تصفّح المجموعة <ArrowLeft size={16} /></a>} />
        <div className="category-grid">
          {categories.map((category, index) => (
            <a className={`category-tile category-tile--${index + 1}`} href={`#products`} key={category.id} onClick={() => window.dispatchEvent(new CustomEvent('select-category', { detail: category.id }))}>
              <img src={category.image} alt={category.title} loading="lazy" />
              <span className="category-tile__overlay" />
              <span className="category-tile__number">0{index + 1}</span>
              <span className="category-tile__content"><small>{category.note}</small><strong>{category.title}</strong><span className="category-tile__arrow"><ArrowUpLeft size={18} /></span></span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product, onRequest }) {
  return (
    <article className="product-card">
      <a href="#portfolio" className="product-card__image" aria-label={`عرض صور ${product.name}`}>
        <img src={product.image} alt={product.name} loading="lazy" />
        <span className="product-card__zoom"><ZoomIn size={18} /></span>
        <span className="product-card__tag">نموذج توضيحي</span>
      </a>
      <div className="product-card__details">
        <div><h3>{product.name}</h3><p>{product.description}</p></div>
        <button className="product-card__request" type="button" onClick={() => onRequest(product)} aria-label={`اطلب ${product.name} عبر واتساب`}><ArrowUpLeft size={18} /></button>
      </div>
      <button className="product-card__wa" type="button" onClick={() => onRequest(product)}>اطلب عبر واتساب <MessageCircle size={15} /></button>
    </article>
  );
}

function Products() {
  const [filter, setFilter] = useState('all');
  useEffect(() => {
    const handleCategory = (event) => setFilter(event.detail);
    window.addEventListener('select-category', handleCategory);
    return () => window.removeEventListener('select-category', handleCategory);
  }, []);
  const shown = useMemo(() => filter === 'all' ? products : products.filter((product) => product.category === filter), [filter]);
  const order = (product) => window.open(whatsappUrl(`السلام عليكم، أرغب بالاستفسار عن «${product.name}».`), '_blank', 'noopener,noreferrer');
  return (
    <section className="products section-pad" id="products">
      <div className="container">
        <SectionHeading eyebrow="من مجموعتنا" title="قطع تستحق أن تُهدى" text="نماذج أولية لأفكار يمكن تخصيصها بما يناسب مناسبتكم وهويتكم." />
        <div className="product-toolbar" aria-label="تصفية المنتجات حسب الفئة">
          <div className="filter-list" role="group" aria-label="فئات المنتجات">
            <button type="button" className={filter === 'all' ? 'filter-pill is-active' : 'filter-pill'} onClick={() => setFilter('all')}>الكل <span>08</span></button>
            {categories.map((category) => <button key={category.id} type="button" className={filter === category.id ? 'filter-pill is-active' : 'filter-pill'} onClick={() => setFilter(category.id)}>{category.title}</button>)}
          </div>
          <span className="demo-caption"><Sparkles size={14} /> صور ونماذج توضيحية — السعر والتوفر عند الطلب</span>
        </div>
        <div className="product-grid" aria-live="polite">
          {shown.map((product) => <ProductCard key={product.id} product={product} onRequest={order} />)}
        </div>
        {shown.length === 0 && <p className="empty-state">قريباً نضيف المزيد من النماذج لهذه الفئة.</p>}
        <div className="products__bottom"><span>كل قطعة تبدأ بفكرةٍ منكم.</span><a href="#custom" className="text-link">ابدأوا بفكرتكم <ArrowLeft size={16} /></a></div>
      </div>
    </section>
  );
}

function Customization() {
  const steps = [
    { number: '01', title: 'شاركونا فكرتكم', text: 'المناسبة، الرسالة، أو حتى ملامح أولية لما تتخيلونه.' },
    { number: '02', title: 'نختار التفاصيل', text: 'الأسماء والشعار والخامة والتشطيب المناسب لهويتكم.' },
    { number: '03', title: 'تصميم يعبّر عنكم', text: 'تصوّر مخصص يترجم فكرتكم إلى قطعة ذات معنى.' },
  ];
  return (
    <section className="custom section-pad" id="custom">
      <div className="container custom__layout">
        <div className="custom__visual">
          <div className="custom__photo"><img src="/images/crystal-wood.jpg" alt="درع كريستالي أنيق بقاعدة خشبية" loading="lazy" /></div>
          <div className="custom__detail"><span className="detail-kicker"><Sparkles size={14} /> لمستكم الخاصة</span><strong>الاسم، الشعار،<br />والرسالة التي تعنيكم</strong><div className="detail-ornament" aria-hidden="true" /></div>
          <span className="custom__vertical">MADE FOR YOUR MOMENT</span>
        </div>
        <div className="custom__content">
          <span className="eyebrow eyebrow--gold"><span /> بصمتكم في كل تفصيل</span>
          <h2>تصميم خاص<br /><em>يعكس هويتكم</em></h2>
          <p className="custom__intro">كل مناسبة لها قصتها. نساعدكم في تحويل الأسماء والرسائل والهوية إلى هدايا ودروع مصمّمة على ذوقكم.</p>
          <div className="custom-options">
            {['أسماء وشعارات', 'رسائل خاصة', 'مناسبات متنوعة', 'خامات وتشطيبات مختلفة'].map((option) => <span key={option}><Check size={15} />{option}</span>)}
          </div>
          <div className="custom__steps">
            {steps.map((step) => <div className="custom-step" key={step.number}><span className="custom-step__number">{step.number}</span><div><strong>{step.title}</strong><p>{step.text}</p></div></div>)}
          </div>
          <WhatsAppLink className="button button--gold" message="السلام عليكم، أرغب بطلب تصميم مخصص.">اطلب تصميمك الآن <ArrowLeft size={17} /></WhatsAppLink>
        </div>
      </div>
    </section>
  );
}

function Portfolio() {
  const [active, setActive] = useState(null);
  useEffect(() => {
    if (!active) return undefined;
    const closeOnEscape = (event) => { if (event.key === 'Escape') setActive(null); };
    window.addEventListener('keydown', closeOnEscape);
    document.body.classList.add('has-lightbox');
    return () => { window.removeEventListener('keydown', closeOnEscape); document.body.classList.remove('has-lightbox'); };
  }, [active]);
  return (
    <section className="portfolio section-pad" id="portfolio">
      <div className="container">
        <SectionHeading eyebrow="من وحي أعمالنا" title="أثرٌ يبقى بعد المناسبة" text="مساحة لأفكارٍ تنوّعت خاماتها، وجمعتها عناية التفاصيل." />
        <div className="portfolio-grid">
          {portfolio.map((item, index) => (
            <button key={item.title} type="button" className={`portfolio-item portfolio-item--${item.shape}`} onClick={() => setActive(item)} aria-label={`تكبير صورة ${item.title}`}>
              <img src={item.image} alt={item.title} loading="lazy" />
              <span className="portfolio-item__shade" />
              <span className="portfolio-item__number">0{index + 1}</span>
              <span className="portfolio-item__meta"><small>{item.kind}</small><strong>{item.title}</strong></span>
              <span className="portfolio-item__zoom"><ZoomIn size={18} /></span>
            </button>
          ))}
        </div>
        <p className="portfolio-note">صور توضيحية لنماذج وأفكار تصميمية. يُحدّث المعرض بصور الأعمال الفعلية عند توفرها.</p>
      </div>
      {active && <div className="lightbox" role="dialog" aria-modal="true" aria-label={active.title} onClick={() => setActive(null)}>
        <button className="lightbox__close" type="button" aria-label="إغلاق العرض" onClick={() => setActive(null)}><X size={22} /></button>
        <button className="lightbox__content" type="button" onClick={(event) => event.stopPropagation()}>
          <img src={active.image} alt={active.title} />
          <span><small>{active.kind}</small><strong>{active.title}</strong></span>
        </button>
      </div>}
    </section>
  );
}

const served = [
  { icon: PackageCheck, label: 'الشركات والمؤسسات', sub: 'هدايا تعكس هويتكم' },
  { icon: HeartHandshake, label: 'المستشفيات والمراكز الطبية', sub: 'تقدير يليق بالعطاء' },
  { icon: Star, label: 'المدارس والجامعات', sub: 'احتفاء بالتميّز' },
  { icon: Crown, label: 'الجهات الحكومية', sub: 'تكريم للمساهمات' },
  { icon: Sparkles, label: 'الفعاليات والمؤتمرات', sub: 'تفاصيل للمناسبة' },
  { icon: Gift, label: 'المناسبات الخاصة', sub: 'ذكرى بطابع شخصي' },
];

function About() {
  const benefits = [
    { number: '01', icon: Sparkles, title: 'تصاميم مخصصة', text: 'أفكار تُصاغ لتعكس هوية المناسبة وصاحبها.' },
    { number: '02', icon: ZoomIn, title: 'اهتمام بالتفاصيل', text: 'من اختيار الخامة إلى أدق لمسات التشطيب.' },
    { number: '03', icon: Gift, title: 'تنوع في المنتجات', text: 'خيارات من الدروع إلى الهدايا المؤسسية.' },
    { number: '04', icon: HeartHandshake, title: 'حلول للمنشآت', text: 'مرونة في تصميم هدايا الشركات والمؤسسات.' },
  ];
  return (
    <section className="about section-pad" id="about">
      <div className="container">
        <div className="about-intro">
          <div><span className="eyebrow"><span /> لمن نصنع</span><h2>لحظات تستحق<br /><em>أن تُروى.</em></h2></div>
          <p>من تكريم إنجازٍ جماعي، إلى لفتة امتنان لشخصٍ عزيز؛ نصمم قطعاً تحمل المعنى وتبقى قريبة من الذاكرة.</p>
        </div>
        <div className="audience-strip">
          {served.map(({ icon: Icon, label, sub }, index) => <div className="audience-item" key={label}><span className="audience-item__icon"><Icon size={19} strokeWidth={1.5} /></span><div><strong>{label}</strong><small>{sub}</small></div>{index < served.length - 1 && <span className="audience-item__divider" />}</div>)}
        </div>
        <div className="benefits-heading"><span className="eyebrow"><span /> نهتم بما يهمكم</span><h3>اختيارٌ يحمل قيمة</h3></div>
        <div className="benefit-grid">
          {benefits.map(({ number, icon: Icon, title, text }) => <article className="benefit" key={number}><span className="benefit__number">{number}</span><Icon className="benefit__icon" size={25} strokeWidth={1.4} /><h4>{title}</h4><p>{text}</p><span className="benefit__line" /></article>)}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="contact section-pad" id="contact">
      <div className="container contact__layout">
        <div className="contact__intro">
          <span className="eyebrow eyebrow--gold"><span /> خطوتكم تبدأ من هنا</span>
          <h2>لنجعل فكرتكم<br /><em>هديةً لا تُنسى.</em></h2>
          <p>أخبرونا عن مناسبتكم وما تتخيلونه، ويسعدنا أن نساعدكم على البدء.</p>
          <WhatsAppLink className="button button--gold" message="السلام عليكم، أرغب بالتواصل وطلب استشارة لتصميم هدية أو درع.">تحدثوا معنا عبر واتساب <ArrowLeft size={17} /></WhatsAppLink>
          <small className="contact__demo-note">رقم واتساب تجريبي — يُستبدل برقم المنشأة قبل الإطلاق.</small>
        </div>
        <div className="contact__details">
          <div className="contact-detail"><span className="contact-detail__icon"><Phone size={18} /></span><div><small>الهاتف / واتساب</small><strong>{CONTACT.phone}</strong><span className="placeholder-tag">حقل قابل للتعديل</span></div></div>
          <div className="contact-detail"><span className="contact-detail__icon"><MapPin size={18} /></span><div><small>موقعنا</small><strong>{CONTACT.location}</strong></div></div>
          <div className="contact-detail"><span className="contact-detail__icon"><Clock3 size={18} /></span><div><small>أوقات العمل</small><strong>{CONTACT.hours}</strong></div></div>
          <div className="map-placeholder">
            {CONTACT.mapUrl ? <iframe src={CONTACT.mapUrl} title="موقع دار التميز على الخريطة" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /> : <div><MapPin size={24} strokeWidth={1.3} /><strong>موقع النشاط</strong><span>تُضاف خريطة Google هنا بعد تأكيد الموقع</span><small>مساحة خريطة قابلة للتعديل</small></div>}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-brand"><BrandMark inverse /><p>هدايا ودروع تكريم بتفاصيلٍ تستحق أن تبقى.</p><WhatsAppLink className="footer-wa" message="السلام عليكم، أرغب بمعرفة المزيد عن منتجاتكم.">تواصلوا معنا <ArrowLeft size={15} /></WhatsAppLink></div>
          <div className="footer-col"><h3>روابط سريعة</h3>{navItems.map(([label, id]) => <a href={`#${id}`} key={id}>{label}</a>)}</div>
          <div className="footer-col"><h3>منتجاتنا</h3>{categories.slice(0, 4).map((category) => <a href="#products" key={category.id} onClick={() => window.dispatchEvent(new CustomEvent('select-category', { detail: category.id }))}>{category.title}</a>)}</div>
          <div className="footer-col footer-col--contact"><h3>بيانات التواصل</h3><span><Phone size={15} />{CONTACT.phone}</span><span><MapPin size={15} />{CONTACT.location}</span><span><Clock3 size={15} />{CONTACT.hours}</span><small>تُحدّث البيانات بعد اعتماد معلومات المنشأة.</small></div>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} {BRAND_NAME}. جميع الحقوق محفوظة.</span><span>صُنعت العناية في كل تفصيل <span className="footer-star">✳</span></span></div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Categories />
        <Products />
        <Customization />
        <Portfolio />
        <About />
        <Contact />
      </main>
      <Footer />
      <WhatsAppLink className="floating-wa" message="السلام عليكم، أرغب بالاستفسار عن منتجات دار التميز." aria-label="تواصل مع دار التميز عبر واتساب" icon={false}><MessageCircle size={23} /></WhatsAppLink>
    </>
  );
}
