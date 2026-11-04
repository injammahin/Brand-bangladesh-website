import { useId, useState } from 'react';
import { useLang } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export const validEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

export function NewsletterForm({ inline = false, buttonVariant = 'teal', dark = false, className }) {
  const { u } = useLang();
  const id = useId();
  const [email, setEmail] = useState('');
  const [state, setState] = useState(null); // 'ok' | 'err'

  const submit = (e) => {
    e.preventDefault();
    if (!validEmail(email)) { setState('err'); return; }
    setState('ok');
    setEmail('');
    // TODO: POST to the newsletter provider with double opt-in
  };

  return (
    <form onSubmit={submit} noValidate className={cn('flex flex-col gap-2', className)}>
      <div className={cn('flex flex-col gap-2', inline && 'sm:flex-row')}>
        <label htmlFor={id} className="sr-only">{u('email')}</label>
        <Input
          id={id} type="email" autoComplete="email" required value={email}
          onChange={(e) => { setEmail(e.target.value); setState(null); }}
          placeholder={u('email')} aria-invalid={state === 'err'}
          className="rounded-full bg-white"
        />
        <Button type="submit" variant={buttonVariant} className="btn-shine">{u('subscribe')}</Button>
      </div>
      <p role="status" aria-live="polite" className={cn('min-h-[1em] text-[13.5px] font-medium', state === 'err' ? (dark ? 'text-[#FF8A8E]' : 'text-destructive') : dark ? 'text-brand-gold2' : 'text-brand-deep')}>
        {state === 'ok' && u('subscribed')}
        {state === 'err' && u('badEmail')}
      </p>
    </form>
  );
}
