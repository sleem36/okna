export default function SeoBlock({ title, html }) {
  return (
    <section>
      <div className="container">
        <div className="seo_block__wrapper">
          <div className="seo_block-title">
            <h2>{title}</h2>
          </div>
          <div className="seo_block-subtitle" dangerouslySetInnerHTML={{ __html: html }} />
          <div className="btn js-seo-btn">Читать далее</div>
        </div>
      </div>
    </section>
  );
}
