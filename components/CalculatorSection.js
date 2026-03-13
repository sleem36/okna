import { DEFAULT_CALC_FASTENERS } from '../lib/shared-sections-data';

export default function CalculatorSection({ fasteners = DEFAULT_CALC_FASTENERS }) {
  return (
    <section id="calculate">
      <div className="container">
        <div className="calculate__wrapper">
          <div className="calculate__title">
            <h2><span>Рассчитайте стоимость</span> ваших мягких окон</h2>
            <p />
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
                <output className="bubble bubble_delivery" style={{ left: 'calc(0% + 8px)' }}>0 км</output>
                <input type="text" name="delivery" className="calculate__form-inp delivery" placeholder="0 км" defaultValue="0" />
              </div>
              <div className="calculate__form-block check">
                <div className="form-block-check">
                  <label className="control control-checkbox">
                    Монтаж с доставкой <img src="/theme/img/Truck.svg" alt="Доставка" />
                    <input type="checkbox" name="montage" defaultChecked />
                    <div className="control_indicator" />
                  </label>
                </div>
                <p className="calculate__form-description">* Минимальная стоимость монтажа -7000 руб. Доставка в пределах МКАД+30км - 1000 руб.</p>
              </div>
              <div className="calculate__form-block">
                <div className="form-block-title">Тип крепежа:</div>
                <div className="form-block-type fasteners">
                  {fasteners.map((f) => (
                    <div key={f.index} data-value={f.value} data-index={f.index} data-label={f.label} className={`block-type${f.index === 0 ? ' active' : ''}`}>
                      <img src={f.img} alt="" />
                      {f.label}
                    </div>
                  ))}
                </div>
                <input type="hidden" name="krepezh_name" defaultValue={fasteners[0].label} />
                <input type="hidden" name="krepezh_price" defaultValue={String(fasteners[0].value)} />
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
  );
}
