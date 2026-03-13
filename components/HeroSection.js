import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection({
  title,
  panelText,
  buttonText,
  buttonHref = '#contacts_order',
  img,
  imgStyle,
  titleStyle,
  wrapperClassName = 'main__wrapper',
  textClassName = 'main__text',
}) {
  return (
    <section id="win_main">
      <div className="container">
        <div className={wrapperClassName}>
          <div className="main__block">
            <div className={textClassName}>
              <div className="main__text-title">
                <div className="panel__text mobile_title">{panelText}</div>
                <h1 style={titleStyle}>{title}</h1>
              </div>
            </div>
            <div className="main__img">
              <Image
                src={img}
                alt={typeof title === 'string' ? title : 'Мягкие окна'}
                width={688}
                height={400}
                style={imgStyle || { width: '89%', height: '104%', objectFit: 'cover' }}
                priority
              />
            </div>
          </div>
          <div className="main__panel">
            <div className="panel__wrapper">
              <Link href={buttonHref} className="panel__btn">
                <div>{buttonText}</div>
              </Link>
              <div className="panel__arrow">
                <img src="/theme/img/mainArrow.svg" alt="" />
              </div>
              <div className="panel__text">{panelText}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
