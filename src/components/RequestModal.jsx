import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Check, Loader2, Send, ShieldCheck, X } from 'lucide-react';
import { Button } from './Button';
import { plural } from '../lib/utils';
const EMPTY_FORM = { name: '', contact: '', company: '' };

export function RequestModal({ open, onClose, stationCount }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const nameRef = useRef(null);
  const timerRef = useRef(null);
  const closeRef = useRef(onClose);
  const sendingRef = useRef(sending);
  closeRef.current = onClose;
  sendingRef.current = sending;

  useEffect(() => {
    if (!open) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && !sendingRef.current) closeRef.current();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const focusTimer = window.setTimeout(() => nameRef.current?.focus(), 60);
    return () => window.clearTimeout(focusTimer);
  }, [open]);

  useEffect(() => {
    if (open) {
      setSending(false);
      setSent(false);
      setErrors({});
    }
  }, [open]);

  useEffect(
    () => () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    },
    [],
  );

  function updateField(key, value) {
    setForm((previous) => ({ ...previous, [key]: value }));
    setErrors((previous) => ({ ...previous, [key]: undefined }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = 'Укажите имя';
    if (!form.contact.trim()) nextErrors.contact = 'Укажите телефон или Telegram';
    if (!form.company.trim()) nextErrors.company = 'Укажите название предприятия';

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    setSending(true);
    timerRef.current = window.setTimeout(() => {
      setSending(false);
      setSent(true);
    }, 900);
  }

  if (!open) return null;

  const stationGenitive = `${stationCount} ${plural(stationCount, ['станка', 'станков', 'станков'])}`;

  function handleClose() {
    if (sending) return;
    onClose();
  }

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-ink/30 p-4 backdrop-blur-md sm:items-center">
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label="Закрыть окно заявки"
        onClick={handleClose}
        tabIndex={-1}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="request-title"
        className="panel relative max-h-[92vh] w-full max-w-md overflow-y-auto border-ink/[0.1] bg-graphite-850 p-5 shadow-lift sm:p-6"
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />

        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="eyebrow">Заявка на подключение</div>
            <h2 id="request-title" className="mt-2 text-xl font-semibold tracking-[-0.02em] text-steel-100">
              {sent ? 'Заявка отправлена' : 'Подключим двойник в вашем цеху'}
            </h2>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-ink/[0.07] text-steel-500 transition-colors hover:border-ink/[0.14] hover:text-steel-200 disabled:opacity-40"
            aria-label="Закрыть"
            disabled={sending}
          >
            <X className="h-4 w-4" strokeWidth={1.8} />
          </button>
        </div>

        {sent ? (
          <div className="mt-6 flex flex-col items-center py-6 text-center">
            <span className="grid h-14 w-14 place-items-center rounded-full border border-success-500/25 bg-success-500/[0.08] text-success-400">
              <Check className="h-6 w-6" strokeWidth={2} />
            </span>
            <h3 className="mt-4 text-base font-medium text-steel-100">
              Спасибо, заявка принята
            </h3>
            <p className="mt-2 max-w-xs text-xs leading-relaxed text-steel-500">
              Инженер свяжется с вами в течение рабочего дня и уточнит детали подключения
              участка из {stationGenitive}.
            </p>
            <Button className="mt-6 w-full" onClick={handleClose}>
              Закрыть
            </Button>
            <p className="mt-3 inline-flex items-center gap-1.5 text-[9px] text-steel-600">
              <ShieldCheck className="h-3 w-3" strokeWidth={1.7} />
              Демо-режим: заявка не отправлена на сервер
            </p>
          </div>
        ) : (
          <>
            <p className="mt-2 text-xs leading-relaxed text-steel-500">
              Оставьте контакты — обсудим пилот для вашего участка из {stationGenitive}. Это
              демонстрационная форма.
            </p>

            <form className="mt-5 space-y-3.5" onSubmit={handleSubmit} noValidate>
              <Field
                id="request-name"
                label="Имя"
                placeholder="Как к вам обращаться"
                value={form.name}
                error={errors.name}
                inputRef={nameRef}
                onChange={(value) => updateField('name', value)}
                autoComplete="name"
              />
              <Field
                id="request-contact"
                label="Телефон или Telegram"
                placeholder="+7 900 000-00-00 или @username"
                value={form.contact}
                error={errors.contact}
                onChange={(value) => updateField('contact', value)}
                autoComplete="tel"
              />
              <Field
                id="request-company"
                label="Название предприятия"
                placeholder="ООО «Завод точной механики»"
                value={form.company}
                error={errors.company}
                onChange={(value) => updateField('company', value)}
                autoComplete="organization"
              />

              <Button className="mt-1 w-full" size="lg" type="submit" disabled={sending}>
                {sending ? (
                  <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.8} />
                ) : (
                  <Send className="h-4 w-4" strokeWidth={1.8} />
                )}
                {sending ? 'Отправляем…' : 'Отправить заявку инженеру'}
              </Button>
            </form>

            <p className="mt-3 flex items-start gap-1.5 text-[9px] leading-relaxed text-steel-600">
              <ShieldCheck className="mt-0.5 h-3 w-3 shrink-0" strokeWidth={1.7} />
              Демо-режим: данные не отправляются на сервер и не сохраняются.
            </p>
          </>
        )}
      </div>
    </div>,
    document.body,
  );
}

function Field({ id, label, placeholder, value, error, onChange, inputRef, autoComplete }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[10px] uppercase tracking-[0.14em] text-steel-500">
        {label}
      </label>
      <input
        ref={inputRef}
        id={id}
        type="text"
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={(event) => onChange(event.target.value)}
        className={`field ${error ? 'border-danger-500/50 focus:border-danger-500/60 focus:ring-danger-500/10' : ''}`}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1 text-[10px] text-danger-300">
          {error}
        </p>
      )}
    </div>
  );
}
