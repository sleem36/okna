import nodemailer from 'nodemailer';

const RATE_LIMIT_WINDOW = 60 * 1000;
const RATE_LIMIT_MAX = 5;
const ipRequests = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const record = ipRequests.get(ip);
  if (!record) {
    ipRequests.set(ip, { count: 1, start: now });
    return false;
  }
  if (now - record.start > RATE_LIMIT_WINDOW) {
    ipRequests.set(ip, { count: 1, start: now });
    return false;
  }
  record.count += 1;
  return record.count > RATE_LIMIT_MAX;
}

function getClientIp(req) {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  const real = req.headers.get('x-real-ip');
  if (real) return real;
  return '127.0.0.1';
}

export async function POST(req) {
  try {
    const ip = getClientIp(req);
    if (isRateLimited(ip)) {
      return new Response(JSON.stringify({ ok: false, error: 'rate_limited' }), {
        status: 429,
        headers: { 'Content-Type': 'application/json' },
      });
    }

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
    const pass = process.env.SMTP_PASS || process.env.SMTP_PASSWORD;
    const to = process.env.CONTACT_TO || user;
    const from = process.env.CONTACT_FROM || process.env.SMTP_FROM || user;
    const secure = process.env.SMTP_SECURE === 'true' || port === 465;

    if (!host || !user || !pass || !to) {
      console.error('SMTP is not configured. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS (или SMTP_PASSWORD), CONTACT_TO');
      return new Response(JSON.stringify({ ok: false, error: 'smtp_not_configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
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
