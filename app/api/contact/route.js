import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    const { name = '', phone = '', message = '', page = '', formId = '' } = await req.json();

    if (!phone && !name) {
      return new Response(JSON.stringify({ ok: false, error: 'empty' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const host = process.env.SMTP_HOST;
    const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const to = process.env.CONTACT_TO || user;
    const from = process.env.CONTACT_FROM || user;

    if (!host || !user || !pass || !to) {
      console.error('SMTP is not configured. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO');
      return new Response(JSON.stringify({ ok: false, error: 'smtp_not_configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    const subject = `Заявка с сайта Мягкие окна Стиль (${page || 'без указания страницы'})`;
    const text = [
      `Имя: ${name || '—'}`,
      `Телефон: ${phone || '—'}`,
      message ? `Сообщение: ${message}` : '',
      page ? `Страница: ${page}` : '',
      formId ? `Форма: ${formId}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    await transporter.sendMail({
      from,
      to,
      subject,
      text,
    });

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('contact API error', err);
    return new Response(JSON.stringify({ ok: false, error: 'server_error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

