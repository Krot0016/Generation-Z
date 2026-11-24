export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

const numberFormatters = new Map();

export function formatNumber(value, digits = 0) {
  if (value == null || Number.isNaN(value)) return '—';
  if (!numberFormatters.has(digits)) {
    numberFormatters.set(
      digits,
      new Intl.NumberFormat('ru-RU', {
        minimumFractionDigits: digits,
        maximumFractionDigits: digits,
      }),
    );
  }
  return numberFormatters.get(digits).format(value);
}

export function plural(n, forms) {
  const abs = Math.abs(n) % 100;
  const last = abs % 10;
  if (abs > 10 && abs < 20) return forms[2];
  if (last === 1) return forms[0];
  if (last >= 2 && last <= 4) return forms[1];
  return forms[2];
}

export function pluralStations(n) {
  return `${formatNumber(n)} ${plural(n, ['станок', 'станка', 'станков'])}`;
}

export function pluralStages(n) {
  return `${formatNumber(n)} ${plural(n, ['этап', 'этапа', 'этапов'])}`;
}

export function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

let sequence = 0;

export function uid(prefix = 'id') {
  sequence += 1;
  return `${prefix}-${Date.now().toString(36)}-${sequence.toString(36)}`;
}

export function formatTime(date) {
  return new Intl.DateTimeFormat('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(date);
}

export function formatDateTime(date) {
  return new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
  })
    .format(date)
    .replace(' в ', ', ');
}

export const STATUS_META = {
  ok: {
    label: 'норма',
    dot: 'bg-success-400',
    text: 'text-success-400',
    soft: 'border-success-500/25 bg-success-500/[0.08]',
  },
  warn: {
    label: 'внимание',
    dot: 'bg-amber-400',
    text: 'text-amber-300',
    soft: 'border-amber-500/25 bg-amber-500/[0.08]',
  },
  alert: {
    label: 'отклонение',
    dot: 'bg-danger-400',
    text: 'text-danger-300',
    soft: 'border-danger-500/30 bg-danger-500/[0.08]',
  },
};

export function getStationStatus(metrics, limits) {
  if (!metrics) return 'ok';
  const tempRatio = metrics.temp / limits.temp;
  const vibrationRatio = metrics.vibration / limits.vibration;
  if (tempRatio >= 1 || vibrationRatio >= 1) return 'alert';
  if (tempRatio >= 0.9 || vibrationRatio >= 0.88) return 'warn';
  return 'ok';
}

export function createInstance(machine, number) {
  const offset = (number - 1) * 0.45;
  return {
    ...machine,
    instanceId: uid(machine.id),
    number,
    baseline: {
      current: Number((machine.baseline.current + offset).toFixed(1)),
      temp: Number((machine.baseline.temp + offset * 0.5).toFixed(1)),
      vibration: Number((machine.baseline.vibration + offset * 0.1).toFixed(2)),
      load: Math.min(95, Math.round(machine.baseline.load + offset * 2)),
    },
  };
}
