import { Reveal } from './Reveal';
import { Monument } from './Monument';

export function CtaBand({ color = '#0E5B5C', title, text, children }) {
  return (
    <Reveal>
      <div className="relative isolate flex flex-col gap-5 overflow-hidden rounded-[5px] px-7 py-10 text-white lg:flex-row lg:items-center lg:justify-between lg:p-14" style={{ background: color }}>
        <Monument className="absolute -right-8 -top-5 -z-10 h-60 w-60 opacity-15" />
        <span className="stripe absolute inset-x-0 bottom-0 h-1.5" />
        <div className="flex flex-col gap-2.5">
          <h2 className="display-sm text-white">{title}</h2>
          {text && <p className="max-w-xl text-white/85">{text}</p>}
        </div>
        <div className="flex flex-wrap gap-3">{children}</div>
      </div>
    </Reveal>
  );
}
