import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from './Button';
import { Logo } from './Logo';

const NAV_LINKS = [
  { href: '#how', label: 'Как это работает' },
  { href: '#cases', label: 'Кейсы' },
  { href: '#partners', label: 'Партнёры' },
];

export function Header({ landing, onHome, onCreate }) {
  return (
    <header className="sticky top-0 z-40 border-b border-ink/[0.06] bg-graphite-950/80 shadow-[0_10px_30px_-26px_rgba(11,27,51,0.33)] backdrop-blur-xl">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Logo onClick={onHome} />

        {landing ? (
          <nav className="hidden items-center gap-7 text-[13px] text-steel-400 lg:flex" aria-label="Основная навигация">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="transition-colors duration-200 hover:text-steel-100"
              >
                {link.label}
              </a>
            ))}
          </nav>
        ) : (
          <div className="hidden items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-steel-600 md:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400/70" />
            Демо-прототип · всё в браузере
          </div>
        )}

        <div className="flex shrink-0 items-center gap-2">
          {landing ? (
            <Button size="sm" onClick={onCreate} className="hidden sm:inline-flex">
              Создать двойник
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.8} />
            </Button>
          ) : (
            <Button variant="ghost" size="sm" onClick={onHome}>
              <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.8} />
              На главную
            </Button>
          )}
          {landing && (
            <Button size="sm" onClick={onCreate} className="sm:hidden">
              Создать
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
