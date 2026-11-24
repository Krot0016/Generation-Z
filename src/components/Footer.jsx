import { ArrowUpRight } from 'lucide-react';
import { Logo } from './Logo';

const LINKS = [
  { href: '#cases', label: 'Кейсы' },
  { href: '#partners', label: 'Партнёры' },
  { href: '#how', label: 'Как это работает' },
];

export function Footer({ landing, onHome, onOpenDemo }) {
  return (
    <footer className="relative z-10 mt-auto border-t border-ink/[0.06] bg-graphite-950/50">
      <div className="container-page py-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-sm">
            <Logo onClick={onHome} />
            <p className="mt-4 text-xs leading-relaxed text-steel-500">
              Генератор цифровых двойников для цехов металлообработки. Соберите парк станков,
              задайте маршрут деталей и получите интерактивную модель контроля.
            </p>
          </div>

          {landing ? (
            <div className="grid grid-cols-2 gap-x-12 gap-y-2 text-xs sm:grid-cols-3">
              {LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-steel-400 transition-colors hover:text-steel-100"
                >
                  {link.label}
                </a>
              ))}
              <button
                type="button"
                onClick={onOpenDemo}
                className="inline-flex items-center gap-1 text-left text-amber-300 transition-colors hover:text-amber-200"
              >
                Создать двойник
                <ArrowUpRight className="h-3 w-3" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={onHome}
              className="text-left text-xs text-amber-300 transition-colors hover:text-amber-200"
            >
              Вернуться на главную
            </button>
          )}
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-ink/[0.06] pt-5 text-[10px] leading-relaxed text-steel-600 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 TwinBoost. Демонстрационный прототип интерфейса.</span>
          <span>Все предприятия и показатели вымышлены · данные не покидают браузер</span>
        </div>
      </div>
    </footer>
  );
}
