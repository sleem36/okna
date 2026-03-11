import Link from 'next/link';

// Метаданные главной — по образцу оригинала okna-myagkie.ru
export const metadata = {
  title: 'Мягкие окна в Москве | Цены на мягкие окна для террасы и веранды | Стиль',
  description: 'Изготовление и установка мягких окон в Москве. Цены от 1100 руб/м². Мягкие окна для террасы, веранды, беседки. Собственное производство, 8 лет на рынке.',
  openGraph: {
    title: 'Мягкие окна в Москве | Цены на мягкие окна для террасы и веранды | Стиль',
    description: 'Изготовление и установка мягких окон в Москве. Цены от 1100 руб/м². Мягкие окна для террасы, веранды, беседки.',
    type: 'website',
    locale: 'ru_RU',
    siteName: 'Мягкие окна Стиль',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Мягкие окна в Москве | Цены на мягкие окна для террасы и веранды | Стиль',
  },
  robots: {
    index: true,
    follow: true,
    'max-snippet': -1,
    'max-image-preview': 'large',
    'max-video-preview': -1,
  },
};

// Блок «Мягкие окна» — как в docs/main/okna.html
const HERO = {
  title: 'Мягкие окна',
  bottomText: 'Мягких окон от 1100 рублей за кв. метр.',
  buttonText: 'Рассчитать стоимость бесплатно',
  img: '/uploads/2023/05/Rectangle-253-1.png',
};

// Блок «Наши преимущества» — как в docs/main/ours.html
const ADVANTAGES = {
  info: [
    {
      title: 'Большая компания',
      subtitle: 'Наша компания существует на рынке мягких окон уже более 8 лет и за свою историю произвели более 10 тысяч заказов разной сложности. Весь персонал квалифицированный c большим опытом работы.',
    },
    {
      title: 'Надежность',
      subtitle: 'Выбирая нас в качестве исполнителей вы попадаете в профессиональные руки. У нас собственное производство с русскоязычным персоналом. Наработанный годами опыт позволяет предлагать нашим клиентам только избранные и лучшие материалы',
    },
  ],
  blocks: [
    { title: '8 лет ', text: 'безупречной работы', yellow: true },
    { title: '1000 м²', text: 'готовых изделий в месяц создается на нашем производстве', yellow: false },
    { title: '5 дней', text: 'от момента заказа до установки готовых конструкций', yellow: false },
    { title: '2 года', text: 'гарантия на наши изделия', yellow: true },
  ],
};

// Блок «Причина выбрать мягкие окна» — как в docs/main/your_choise.html
const REASON_ITEMS = [
  { img: '/uploads/2024/08/free-icon-thumbs-up-4425133.png', text: 'Удобство использования' },
  { img: '/uploads/2024/08/free-icon-full-size-93640.png', text: 'Индивидуальные размеры' },
  { img: '/uploads/2024/08/free-icon-antivirus-2603214.png', text: 'Безопасно для детей и животных' },
  { img: '/uploads/2024/08/free-icon-discount-6516777.png', text: 'Дешевле пластиковых окон' },
  { img: '/uploads/2024/08/free-icon-weather-protection-17111162.png', text: 'Защита от непогоды' },
  { img: '/uploads/2024/08/free-icon-transparent-5241776.png', text: 'Прозрачность окон 98%' },
  { img: '/uploads/2024/08/free-icon-light-bulb-16504777.png', text: 'Большой спектр применений' },
  { img: '/uploads/2024/08/free-icon-temperature-1582842.png', text: 'Устойчивые к разным (C°)' },
  { img: '/uploads/2024/08/free-icon-water-resistant-9393537.png', text: 'Защита от ветра и воды' },
];

// Блок «Наши работы» — как в docs/main/oursWorks.html (6 вкладок, у каждой свой слайдер)
const WORKS_TABS = [
  { index: 0, label: 'Все' },
  { index: 1, label: 'Террасы' },
  { index: 2, label: 'Беседки' },
  { index: 3, label: 'Дачи' },
  { index: 4, label: 'Веранды' },
  { index: 5, label: 'Промышленные помещения' },
];
const WORKS_SLIDES = [
  [
    { img: '/uploads/2023/05/пер.jpg', title: '', link: '#' },
    { img: '/uploads/2024/08/1-1.jpg', title: '', link: '#' },
    { img: '/uploads/2024/08/1-2.jpg', title: '', link: '#' },
  ],
  [
    { img: '/uploads/2024/09/1-5.jpg', title: 'Терраса с Раменского', link: '#' },
    { img: '/uploads/2024/09/1-6.jpg', title: 'Терраса из Щелковского', link: '#' },
    { img: '/uploads/2024/09/1-7.jpg', title: 'Терраса в Ногинском', link: '#' },
  ],
  [
    { img: '/uploads/2023/05/пер.jpg', title: 'Беседка в Ногинском районе', link: '#' },
    { img: '/uploads/2024/08/1-1.jpg', title: 'Беседка в Сергиево-посадском районе', link: '#' },
    { img: '/uploads/2024/08/1-2.jpg', title: 'Беседка из СНТ Галактика', link: '#' },
  ],
  [
    { img: '/uploads/2024/09/1-18.jpg', title: 'Дача в Дмитровском', link: '#' },
    { img: '/uploads/2024/09/1-19.jpg', title: 'Дача в Хотьково', link: '#' },
    { img: '/uploads/2024/09/1-20.jpg', title: 'Дача в Одинцовском', link: '#' },
  ],
  [
    { img: '/uploads/2024/08/1-21.jpg', title: 'Веранда Солнечногорск', link: '#' },
    { img: '/uploads/2024/08/1-24.jpg', title: 'Веранда Бронницы', link: '#' },
    { img: '/uploads/2024/08/1-23.jpg', title: 'Веранда СНТ Здоровье', link: '#' },
  ],
  [
    { img: '/uploads/2024/09/1-11.jpg', title: 'Промышленное помещение из Ногинского', link: '#' },
    { img: '/uploads/2024/09/1-12.jpg', title: 'Промышленное помещение из Ногинска', link: '#' },
    { img: '/uploads/2024/09/1-13.jpg', title: 'Уличный шатер Сергиево-посадский', link: '#' },
  ],
];

// Блок «Отзывы» — как в docs/main/reviews.html (29 слайдов — скриншоты отзывов)
const REVIEWS_IMAGES = Array.from({ length: 29 }, (_, i) => `/uploads/2023/11/${i + 1}.jpg`);

// Блок «Варианты окантовки» — как в docs/main/variants.html
const EDGING_CARDS = [
  {
    img: '/uploads/2024/09/Стандарт-5.png',
    items: ['морозостойкая пленка 700 мкм до -39', 'окантовка стандарт Оксфорд', 'крепление скоба с силиконовым белым ремнем'],
    price: 'от 1400 руб/м2',
  },
  {
    img: '/uploads/2024/09/Люкс-2.png',
    items: ['морозостойкая пленка 700 мкм до -39', 'окантовка люкс Оксфород 1680', 'крепление полимерная поворотная скоба'],
    price: 'от 1500 руб/м2',
  },
  {
    img: '/uploads/2024/09/Премиум-5.png',
    items: ['морозостойкая пленка 700 мкм до -39', 'окантовка премиум ПВХ', 'крепление большая поворотная металлическая скоба'],
    price: 'от 1700 руб/м2',
  },
];

// Блок «Наши цены» — как в docs/main/price.html (секция #eo)
const PRICE_CARDS = [
  {
    img: '/uploads/2024/09/крепления-1611.jpg',
    title: 'Стандарт',
    info: 'Классическая окантовка из технической ткани Оксфорд, вид плетения рожка с нейлоновыми нитями, плотностью 420d морозостойкая, водонепроницаемая. Нейлоновый оксфорд – очень прочный эластичный химикоустойчивый материал.',
    colorsInStock: ['/uploads/2023/05/Rectangle-208.png', '/uploads/2023/05/Rectangle-91.png', '/uploads/2023/05/Rectangle-90.png'],
    colorsOnOrder: [],
  },
  {
    img: '/uploads/2024/09/крепления-1614.jpg',
    title: 'Люкс',
    info: 'Фактурная окантовка из технической ткани Оксфорд 1680, премиального вида, плотностью 600d, лицевая сторона 100% полиэстер имеет ярко выраженное плетение, с изнаночной стороны пропитка pvc или pu, что делает окантовку более прочной, так же окантовка морозостойкая и водонепроницаемая',
    colorsInStock: ['/uploads/2023/05/Rectangle-91.png', '/uploads/2023/05/Rectangle-207.png', '/uploads/2023/05/Rectangle-90.png', '/uploads/2023/05/Rectangle-89.png', '/uploads/2023/05/Rectangle-208.png'],
    colorsOnOrder: [],
  },
  {
    img: '/uploads/2024/09/крепления-1632.jpg',
    title: 'Премиум',
    info: 'Окантовка из тентовой ткани ПВХ. Основными особенностями тентовой ткани ПВХ являются ее высокая прочность, долговечность, антикоррозийность и водонепроницаемость. На тентовой ткани исключается развитие плесени, она не провисает в процессе эксплуатации и устойчива к перепаду температур от -30 до +70 градусов. Плотность 630-650 гр.',
    colorsInStock: ['/uploads/2023/05/Rectangle-89.png', '/uploads/2023/05/Rectangle-90.png', '/uploads/2023/05/Rectangle-91.png', '/uploads/2023/05/Rectangle-207.png', '/uploads/2023/05/Rectangle-208.png', '/uploads/2023/05/Rectangle-214.png'],
    colorsOnOrder: ['/uploads/2023/05/Rectangle-216.png', '/uploads/2023/05/Rectangle-217.png', '/uploads/2023/05/Rectangle-218.png', '/uploads/2023/05/Rectangle-219.png'],
  },
];

// Блок «Варианты фурнитуры» — как в docs/main/furiture.html (секция #ho)
const FURNITURE_ITEMS = [
  {
    img: '/uploads/2024/08/крепления-1485-1.jpg',
    title: 'Люверс круглый 10 для жесткого крепления',
    info: 'Круглый люверс диаметром 10 мм из высококачественного металла обеспечивает надежное крепление и устойчивость к деформации и коррозии. (Оцинкованный, Черный)',
  },
  {
    img: '/uploads/2024/08/крепления-1439.jpg',
    title: 'Овальный люверс 42*22 под большую поворотную скобу',
    info: 'Овальный люверс 42x22 мм для крепления мягких окон с большой поворотной или полимерной скобой. Надежно фиксирует материал, защищая от растяжения и повреждений.',
  },
  {
    img: '/uploads/2024/08/крепления-1401.jpg',
    title: 'Большая поворотная металлическая скоба',
    info: 'Прочная поворотная металлическая скоба из высококачественной стали с антикоррозийным покрытием. Обеспечивает гибкость и устойчивость изделий, выдерживает значительные нагрузки. Идеальна для промышленных, военных и бытовых нужд. (Оцинкованная, Черная)',
  },
  {
    img: '/uploads/2024/08/крепления-1407-1.jpg',
    title: 'Большая поворотная полимерная скоба',
    info: 'Легкая и прочная полимерная скоба с поворотной конструкцией. Простое и надежное крепление, устойчивое к морозу и коррозии. Подходит для различных применений в строительстве и быту. Отличается широким спектром цветовых решений (Тёмно-коричневая, Белая, Бежевая, Светло-серая, Темно-серая, Черная)',
  },
  {
    img: '/uploads/2024/08/крепления-1479.jpg',
    title: 'Скоба с черным пвх ремнем и белым силиконовым ремнем',
    info: 'Скоба с ремнем - это бюджетное решение для установки мягких окон. В данном креплении используется принцип брючного ремня, где есть П образная скоба и сам ремешок. Данное крепление создает максимальный прижим окна к раме.',
  },
  {
    img: '/uploads/2024/08/крепления-1413-1.jpg',
    title: 'Французский замок',
    info: 'Небольшой элегантный поворотный замок из сплава металла. Идеально подходит для маленьких проемов и монтажа внутри помещений. За счет своих габаритов прекрасно устанавливается на ограниченные поверхности. Добавляет эстетики и привлекательности мягким окнам (Никель, Латунь, Черный, Тёмно-серый, Бронзовый)',
  },
];

// Блок «Мягкие окна Стиль» (SEO-текст) — как в docs/main/style.html
const SEO_STYLE_HTML = `<p>&nbsp;</p>
<p>Современные мягкие окна – это инновационное решение, сочетающее в себе стиль и практичность. Они идеально подходят для различных типов помещений, будь то веранда, беседка или терраса. Мягкие окна предоставляют ряд преимуществ, которые делают их незаменимыми в современном дизайне интерьера и экстерьера.</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p><strong>Преимущества мягких окон:</strong></p>
<p>&nbsp;</p>
<p><strong>Эстетический вид:</strong> Мягкие окна придают вашему дому современный и стильный вид. Они легко вписываются в любой интерьер, создавая уют и комфорт.</p>
<p>&nbsp;</p>
<p><strong>Защита от погодных условий:</strong> Такие окна обеспечивают отличную защиту от ветра, дождя и снега, сохраняя тепло и уют внутри помещения. Вы сможете наслаждаться прекрасным видом на природу в любое время года.</p>
<p>&nbsp;</p>
<p><strong>Простота установки и использования:</strong> Мягкие окна легко устанавливаются и демонтируются, что позволяет быстро адаптировать ваше помещение к изменяющимся условиям.</p>
<p>&nbsp;</p>
<p><strong>Прочность и долговечность:</strong> Используемые материалы обладают высокой прочностью и устойчивостью к воздействию ультрафиолетовых лучей, что гарантирует долгий срок службы мягких окон.</p>
<p>&nbsp;</p>
<p><strong>Экономичность:</strong> По сравнению с традиционными стеклянными окнами, мягкие окна являются более экономичным вариантом, при этом не уступая в эстетических и функциональных качествах.</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p><strong>Стильные решения для вашего дома</strong></p>
<p>Выбирая мягкие окна, вы получаете возможность создать уникальный стиль вашего дома. Широкий ассортимент цветовых решений и дизайнов позволяет подобрать идеальный вариант, соответствующий вашим предпочтениям. Мягкие окна могут быть как прозрачными, так и тонированными, что добавит еще больше уюта и приватности вашему пространству.</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p><strong>Заключение</strong></p>
<p>Мягкие окна – это стильное и практичное решение для любого дома. Они обеспечивают защиту от неблагоприятных погодных условий, создают комфорт и уют, а также придают вашему дому современный и элегантный вид. Инвестируйте в мягкие окна, чтобы сделать ваше жилое пространство еще более привлекательным и функциональным.</p>`;

// Блок видеослайдера — как в docs/main/video.html (2 слайда, src видео — подставить при наличии)
const VIDEO_SLIDES = [
  { src: '' },
  { src: '' },
];

// Блок калькулятора — типы крепежа как в docs/main/calculate.html
const CALC_FASTENERS = [
  { img: '/uploads/2024/08/крепления-1479.jpg', label: 'Скоба -ремень', value: 1300, index: 0 },
  { img: '/uploads/2024/08/крепления-1401.jpg', label: 'Поворотная скоба', value: 1400, index: 1 },
  { img: '/uploads/2024/08/крепления-1413-1.jpg', label: 'Французкий замок', value: 1900, index: 2 },
  { img: '/uploads/2024/08/крепления-1485-1.jpg', label: 'Люверс для жесткого крепления', value: 1200, index: 3 },
];

export default function HomePage() {
  return (
    <>
      {/* Блок «Мягкие окна» — разметка как в docs/main/okna.html */}
      <section id="main">
        <div className="container">
          <div className="main__wrapper">
            <div className="main__block">
              <div className="main__text">
                <div className="main__text-title">
                  <div className="panel__text mobile_title">{HERO.bottomText}</div>
                  <h1>{HERO.title}</h1>
                  <div className="panel__text">{HERO.bottomText}</div>
                </div>
              </div>
              <div className="main__img">
                <img
                  alt=""
                  width={688}
                  height={400}
                  src={HERO.img}
                  style={{ width: '89%', height: '104%', objectFit: 'cover' }}
                />
              </div>
            </div>
            <div className="main__panel">
              <div className="panel__wrapper">
                <Link href="#calculate" className="panel__btn">
                  <div>{HERO.buttonText}</div>
                </Link>
                <div className="panel__arrow">
                  <img src="/theme/img/mainArrow.svg" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Блок «Наши преимущества» — разметка и контент как в docs/main/ours.html */}
      <section id="advantages">
        <div className="container">
          <div className="advantages__wrapper">
            <div className="advantages-title">
              <h2>Наши <span>преимущества</span></h2>
            </div>
            <div className="advantages__content">
              <div className="advantages__info">
                {ADVANTAGES.info.map((item) => (
                  <div key={item.title} className="advantages__info-block">
                    <div className="info-block-text">
                      <div className="info-block-title">{item.title}</div>
                      <div className="info-block-subtitle">{item.subtitle}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="advantages__blocks">
                <div className="advantages__blocks-block">
                  <div className={ADVANTAGES.blocks[0].yellow ? 'block-content block-content-yellow' : 'block-content'}>
                    <div className="block-content-title">{ADVANTAGES.blocks[0].title}</div>
                    <div className="block-title-info">{ADVANTAGES.blocks[0].text}</div>
                  </div>
                  <div className={ADVANTAGES.blocks[1].yellow ? 'block-content block-content-yellow' : 'block-content'}>
                    <div className="block-content-title">{ADVANTAGES.blocks[1].title}</div>
                    <div className="block-title-info">{ADVANTAGES.blocks[1].text}</div>
                  </div>
                </div>
                <div className="advantages__blocks-block">
                  <div className={ADVANTAGES.blocks[2].yellow ? 'block-content block-content-yellow' : 'block-content'}>
                    <div className="block-content-title">{ADVANTAGES.blocks[2].title}</div>
                    <div className="block-title-info">{ADVANTAGES.blocks[2].text}</div>
                  </div>
                  <div className={ADVANTAGES.blocks[3].yellow ? 'block-content block-content-yellow' : 'block-content'}>
                    <div className="block-content-title">{ADVANTAGES.blocks[3].title}</div>
                    <div className="block-title-info">{ADVANTAGES.blocks[3].text}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Блок «Причина выбрать мягкие окна» — разметка как в docs/main/your_choise.html */}
      <section id="reason">
        <div className="container">
          <div className="reason__wrapper">
            <div className="reason-title">
              <h2><span>Причина выбрать </span>мягкие окна</h2>
            </div>
            <div className="reason__content-slider">
              <div className="swiper reason">
                <div className="swiper-wrapper">
                  {REASON_ITEMS.map((item) => (
                    <div key={item.text} className="swiper-slide">
                      <div className="reason-slide-block">
                        <div className="reason-block-content">
                          <div className="reason-block-square">
                            <img src={item.img} alt="" />
                          </div>
                          <div className="reason-block-text">{item.text}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <span className="swiper-notification" aria-live="assertive" aria-atomic="true" />
              </div>
            </div>
            <div className="reason-navigation">
              <div className="reason-prev" tabIndex={-1} role="button" aria-label="Previous slide">
                <svg width="11" height="18" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M8.90078 1.03835L9.80078 1.90415L2.60078 8.83048L9.80078 16.0956L8.90078 16.9614L1.70078 9.69628L0.800781 8.83048L8.90078 1.03835Z" fill="#263238" stroke="#263238" strokeWidth="0.692308" />
                </svg>
              </div>
              <div className="swiper-pagination reason-pagination swiper-pagination-clickable swiper-pagination-bullets swiper-pagination-horizontal" />
              <div className="reason-next" tabIndex={0} role="button" aria-label="Next slide">
                <svg width="11" height="18" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M2.03672 16.9616L1.13672 16.0958L8.33672 9.16952L1.13672 1.90437L2.03672 1.03857L9.23672 8.30372L10.1367 9.16952L2.03672 16.9616Z" fill="#263238" stroke="#263238" strokeWidth="0.692308" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Блок «Наши работы» — разметка как в docs/main/oursWorks.html */}
      <section id="works">
        <div className="container">
          <div className="works__wrapper">
            <div className="works-title">
              <h2>Наши <span>работы</span></h2>
            </div>
            <div className="works__content">
              <div className="works__content-titles">
                {WORKS_TABS.map((tab) => (
                  <div
                    key={tab.index}
                    className={`works__content-title${tab.index === 0 ? ' active' : ''}`}
                    data-index={tab.index}
                  >
                    <span>{tab.label}</span>
                  </div>
                ))}
              </div>
              <div className="works-swipe">
                {WORKS_SLIDES.map((slides, idx) => (
                  <div key={idx} className="works__content-slider">
                    <div
                      className={`swiper works${idx === 0 ? ' active' : ''}`}
                      data-index={idx}
                    >
                      <div className="swiper-wrapper">
                        {slides.map((slide, slideIdx) => (
                          <div key={slideIdx} className="swiper-slide">
                            <img src={slide.img} alt="" />
                            <p>{slide.title}</p>
                            <div className="swiper-slide-hidden">
                              <Link href={slide.link} className="swiper-slide-hidden-link">
                                Посмотреть
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                      <span className="swiper-notification" aria-live="assertive" aria-atomic="true" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Блок «Отзывы» — разметка как в docs/main/reviews.html */}
      <section id="reviews">
        <div className="container">
          <div className="reviews__wrapper">
            <div className="reviews-title">
              <h2>Отзывы</h2>
            </div>
            <div className="reviews__content">
              <div className="reviews__content-slider">
                <div className="swiper review">
                  <div className="swiper-wrapper">
                    {REVIEWS_IMAGES.map((src, i) => (
                      <div key={i} className="swiper-slide" data-swiper-slide-index={i}>
                        <div className="swiper-slide-bg">
                          <img src={src} alt="" />
                        </div>
                      </div>
                    ))}
                  </div>
                  <span className="swiper-notification" aria-live="assertive" aria-atomic="true" />
                </div>
                <div className="reviews-prev" tabIndex={0} role="button" aria-label="Previous slide">
                  <svg width="11" height="18" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M8.90078 1.03835L9.80078 1.90415L2.60078 8.83048L9.80078 16.0956L8.90078 16.9614L1.70078 9.69628L0.800781 8.83048L8.90078 1.03835Z" fill="#263238" stroke="#263238" strokeWidth="0.692308" />
                  </svg>
                </div>
                <div className="swiper-pagination review-pagination swiper-pagination-bullets swiper-pagination-horizontal" />
                <div className="reviews-next" tabIndex={0} role="button" aria-label="Next slide">
                  <svg width="11" height="18" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M2.03672 16.9616L1.13672 16.0958L8.33672 9.16952L1.13672 1.90437L2.03672 1.03857L9.23672 8.30372L10.1367 9.16952L2.03672 16.9616Z" fill="#263238" stroke="#263238" strokeWidth="0.692308" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Блок «Варианты окантовки» — разметка как в docs/main/variants.html */}
      <section>
        <div className="container">
          <div className="price_window__wrapper">
            <div className="price_window-title">
              <h2>Варианты окантовки</h2>
            </div>
            <div className="price_window__cards">
              {EDGING_CARDS.map((card) => (
                <div key={card.price} className="price_window__card">
                  <div className="empty-pwc-left" />
                  <div className="empty-pwc-right" />
                  <div className="price__card-img">
                    <img src={card.img} alt="" />
                  </div>
                  <ul className="price__card-menu">
                    {card.items.map((item) => (
                      <li key={item} className="price__card-menu-item">{item}</li>
                    ))}
                  </ul>
                  <div className="price__card-price">{card.price}</div>
                  <Link href="#price_window_order" className="price__card-btn btn">
                    Оставить заявку
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div className="price_window_order" id="price_window_order">
            <div className="price_window_order-title">
              <h3>Не смогли определиться с выбором?</h3>
            </div>
            <form className="price_window_form" id="main1" action="#">
              <div className="price_window_form-inp">
                <input type="text" name="name" required maxLength={35} />
                <span className="floating-label floating-label-name">Имя</span>
              </div>
              <div className="price_window_form-inp">
                <input type="tel" name="phone" required />
                <span className="floating-label floating-label-name">Номер телефона</span>
              </div>
              <button type="submit" className="btn price_window_form-btn">
                Оставить заявку
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Блок «Наши цены» — разметка как в docs/main/price.html */}
      <section id="eo">
        <div className="container">
          <div className="eo__wrapper">
            <div className="eo-title">
              <h2>Наши цены</h2>
            </div>
            <div className="eo__cards">
              {PRICE_CARDS.map((card) => (
                <div key={card.title} className="eo__cards-card">
                  <img src={card.img} alt="" />
                  <div className="eo-card-title">
                    <h4>{card.title}</h4>
                  </div>
                  <div className="eo-card-info">{card.info}</div>
                  <div className="eo-card-colors">
                    <div className="card-colors-block">
                      <div className="card-colors-title">Цвета в наличии</div>
                      <div className="card-colors">
                        {card.colorsInStock.map((src) => (
                          <img key={src} className="color" src={src} alt="" />
                        ))}
                      </div>
                    </div>
                    {card.colorsOnOrder.length > 0 && (
                      <div className="card-colors-block">
                        <div className="card-colors-title">Цвета под заказ</div>
                        <div className="card-colors">
                          {card.colorsOnOrder.map((src) => (
                            <img key={src} className="color" src={src} alt="" />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Блок «Варианты фурнитуры» — разметка как в docs/main/furiture.html */}
      <section id="ho">
        <div className="container">
          <div className="ho__wrapper">
            <div className="ho-title">
              <h2>Варианты фурнитуры</h2>
              <span>Производство - Польша и Россия</span>
            </div>
            <div className="ho__blocks">
              {FURNITURE_ITEMS.map((item) => (
                <div key={item.title} className="ho__blocks-block">
                  <img src={item.img} alt="" />
                  <div className="ho-block-content">
                    <div className="ho-block-title">{item.title}</div>
                    <div className="ho-block-info">{item.info}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Блок видеослайдера — разметка как в docs/main/video.html */}
      <section>
        <div className="container">
          <div className="vslider-wrap">
            <div className="swiper vslider-swiper" id="video-swiper-1">
              <div className="swiper-wrapper">
                {VIDEO_SLIDES.map((slide, i) => (
                  <div key={i} className="swiper-slide vslider-slide">
                    <video className="vslider-video" controls playsInline preload="metadata">
                      {slide.src ? <source src={slide.src} type="video/mp4" /> : null}
                    </video>
                  </div>
                ))}
              </div>
              <div className="swiper-button-prev" />
              <div className="swiper-button-next" />
              <div className="swiper-pagination" />
            </div>
            <div className="vslider-counter">
              <span className="vslider-counter__current">1</span> / {VIDEO_SLIDES.length}
            </div>
          </div>
        </div>
      </section>

      {/* Блок калькулятора — разметка как в docs/main/calculate.html */}
      <section id="calculate">
        <div className="container">
          <div className="calculate__wrapper">
            <div className="calculate__title">
              <h2><span>Рассчитайте стоимость</span> ваших мягких окон</h2>
              <p>И оставьте заявку</p>
            </div>
            <form className="calculate__form" id="calc1" action="#">
              <div className="calculate__form-calculator">
                <div className="calculate__form-title">Калькулятор стоимости</div>
                <div className="calculate__form-block range__slider" data-min="0" data-max="100">
                  <input type="range" className="calculate__form-inp range" defaultValue={1} max={100} min={0} />
                  <output className="bubble" style={{ left: 'calc(1% + 7.85px)' }}>1 м²</output>
                  <input type="text" name="meters" className="calculate__form-inp squares" placeholder="1 м²" defaultValue="1" />
                </div>
                <div className="form-block-title">Доставка</div>
                <div className="calculate__form-block range__slider" data-min="0" data-max="100">
                  <input type="range" className="calculate__form-inp range range_delivery" defaultValue={0} max={100} min={0} />
                  <output className="bubble bubble_delivery" style={{ left: 'calc(0% + 8px)' }}>0 км²</output>
                  <input type="text" name="delivery" className="calculate__form-inp delivery" placeholder="0 км" defaultValue="0" />
                </div>
                <div className="calculate__form-block check">
                  <div className="form-block-check">
                    <label className="control control-checkbox">
                      Монтаж с доставкой <img src="/theme/img/Truck.svg" alt="" />
                      <input type="checkbox" name="montage" defaultChecked />
                      <div className="control_indicator" />
                    </label>
                  </div>
                  <p className="calculate__form-description">* Минимальная стоимость монтажа -7000 руб. Доставка в пределах МКАД+30км - 1000 руб.</p>
                </div>
                <div className="calculate__form-block">
                  <div className="form-block-title">Тип крепежа:</div>
                  <div className="form-block-type fasteners">
                    {CALC_FASTENERS.map((f) => (
                      <div key={f.index} data-value={f.value} data-index={f.index} data-label={f.label} className={`block-type${f.index === 0 ? ' active' : ''}`}>
                        <img src={f.img} alt="" />
                        {f.label}
                      </div>
                    ))}
                  </div>
                  <input type="hidden" name="krepezh_name" defaultValue={CALC_FASTENERS[0].label} />
                  <input type="hidden" name="krepezh_price" defaultValue={String(CALC_FASTENERS[0].value)} />
                </div>
              </div>
              <div className="calculate__form-order">
                <div className="calculate__form-block">
                  <div className="form-block-title">Молния (пг/м)</div>
                  <input type="number" name="molnia" className="calculate__form-inp lightning" placeholder="0" defaultValue={0} />
                </div>
                <div className="calculate__form-block">
                  <div className="form-block-title">Ремни для подвеса</div>
                  <input type="number" name="remni" className="calculate__form-inp belt" placeholder="0" defaultValue={0} />
                </div>
                <div className="calculate__form-block">
                  <div className="form-block-title price">
                    Стоимость: <span>8 300 руб.</span>
                    <input type="hidden" className="calc_price" name="calc_price" value="8300" />
                  </div>
                </div>
                <div className="calculate__form-title">Оставьте заявку на точный рассчет стоимости мягких окон</div>
                <div className="calculate__form-block">
                  <div className="form-block-title">Ваш номер телефона</div>
                  <div className="calc_error">Введите телефон полностью</div>
                  <input type="tel" name="phone" required className="calculate__form-inp tel" placeholder="+7 (925) 000-99-77" />
                </div>
                <button type="submit" className="btn calc-btn">Оставить заявку</button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Блок «Мягкие окна Стиль» (SEO) — разметка как в docs/main/style.html */}
      <section>
        <div className="container">
          <div className="seo_block__wrapper">
            <div className="seo_block-title">
              <h2>Мягкие окна Стиль: Практичность для Вашей дачи</h2>
            </div>
            <div className="btn js-seo-btn">Читать далее</div>
            <div className="seo_block-subtitle" dangerouslySetInnerHTML={{ __html: SEO_STYLE_HTML }} />
          </div>
        </div>
      </section>

      {/* Блок «Оставить заявку на консультацию» — разметка как в docs/main/contacts.html */}
      <section id="contacts_order">
        <div className="container">
          <div className="price_window_order contacts_order">
            <div className="price_window_order-title">
              <h3>Оставить заявку на консультацию</h3>
              <p>Оставьте заявку и получите ремешки для мягких окон в подарок</p>
            </div>
            <form className="price_window_form main_form contacts_form" id="main2" action="#">
              <div className="price_window_form-inp contacts_form-inp">
                <input type="text" name="name" required maxLength={35} />
                <span className="floating-label floating-label-name">Имя</span>
              </div>
              <div className="price_window_form-inp contacts_form-inp">
                <input type="tel" name="phone" required />
                <span className="floating-label floating-label-name">Номер телефона</span>
              </div>
              <button type="submit" className="btn price_window_form-btn contacts_form-btn">
                Оставить заявку
              </button>
            </form>
          </div>
        </div>
      </section>

      <section style={{ padding: '60px 0' }}>
        <div className="container">
          <p style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <Link href="/blog" style={{ color: '#4B0082', fontWeight: 600 }}>
              Статьи и блог →
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
