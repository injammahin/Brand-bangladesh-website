import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { DIVISIONS, MAP_H, MAP_W } from '@/data/bdMapPaths';
import { img } from '@/lib/utils';
import content from '@/data/content';
import { pillarById, regionById } from '@/data/helpers';
import { useLang } from '@/context/LanguageContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

// soft brand tints so each division reads as its own place
const TINT = { rangpur: '#F6E3C5', rajshahi: '#F9D9CC', mymensingh: '#DCEBD3', sylhet: '#CFE6DF', dhaka: '#F3D4DC', khulna: '#D5E6E2', barishal: '#D9E3F0', chattogram: '#E9E1F0' };
// nudge labels where the shape's centre is awkward (long Chattogram strip, coastal Khulna)
const LABEL = { chattogram: [410, 520], khulna: [150, 430], barishal: [262, 500] };

/** Map of the eight divisions from real boundary data — keyboard accessible */
export function BdMap({ active, onSelect }) {
  const { t, u } = useLang();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const handleKey = (e, id) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(id); }
  };
  const order = [...content.regions].sort((a, b) => (a.id === active) - (b.id === active)); // active drawn last, on top
  const act = DIVISIONS[active];
  const [ax, ay] = LABEL[active] || [act.cx, act.cy];
  return (
    <svg ref={ref} className="bd-map mx-auto w-full max-w-[520px] overflow-visible" viewBox={`0 0 ${MAP_W} ${MAP_H + 30}`} role="group" aria-label={u('mapLabel')}>
      <defs>
        <filter id="map-lift" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="10" stdDeviation="10" floodColor="#0E5B5C" floodOpacity=".35" /></filter>
        <pattern id="map-waves" width="40" height="14" patternUnits="userSpaceOnUse"><path d="M0 7 Q10 0 20 7 T40 7" fill="none" stroke="#B9D6E0" strokeWidth="1.2" /></pattern>
      </defs>
      {/* Bay of Bengal */}
      <rect x="0" y={MAP_H - 150} width={MAP_W} height="180" fill="url(#map-waves)" opacity=".55" style={{ maskImage: 'linear-gradient(transparent, #000)' }} />
      <text x={MAP_W / 2 - 20} y={MAP_H + 18} textAnchor="middle" className="fill-[#5E8FA3]" style={{ fontFamily: 'var(--f-serif)', fontStyle: 'italic', fontSize: 20 }}>{u('bay')}</text>

      {order.map((r, i) => {
        const dv = DIVISIONS[r.id];
        const on = r.id === active;
        const [lx, ly] = LABEL[r.id] || [dv.cx, dv.cy];
        return (
          <g
            key={r.id}
            className={`reg ${on ? 'active' : ''}`}
            tabIndex={0}
            role="button"
            aria-pressed={on}
            aria-label={t(r.name)}
            onClick={() => onSelect(r.id)}
            onKeyDown={(e) => handleKey(e, r.id)}
            style={{ '--tint': TINT[r.id] }}
          >
            <motion.path
              d={dv.d}
              initial={{ pathLength: 0, fillOpacity: 0 }}
              animate={inView ? { pathLength: 1, fillOpacity: 1 } : {}}
              transition={{ pathLength: { duration: 1.4, delay: i * 0.08, ease: [0.65, 0, 0.35, 1] }, fillOpacity: { duration: 0.8, delay: 0.9 + i * 0.08 } }}
              filter={on ? 'url(#map-lift)' : undefined}
            />
            <motion.text x={lx} y={ly + 5} initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 1.3 + i * 0.05 }}>{t(r.name)}</motion.text>
          </g>
        );
      })}

      {/* pulsing pin on the selected division */}
      {inView && (
        <motion.g key={active} initial={{ y: -16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 18 }} className="pointer-events-none">
          <circle cx={ax} cy={ay - 30} r="14" fill="#FBC111" opacity=".35" className="map-ping" />
          <path d={`M${ax} ${ay - 14} c-9 -10 -14 -16 -14 -23 a14 14 0 1 1 28 0 c0 7 -5 13 -14 23z`} fill="#FBC111" stroke="#fff" strokeWidth="2" />
          <circle cx={ax} cy={ay - 37} r="5" fill="#fff" />
        </motion.g>
      )}
    </svg>
  );
}

export function RegionPanel({ id }) {
  const { t, u } = useLang();
  const r = regionById(id);
  return (
    <div className="relative overflow-hidden rounded-[5px] border border-brand-line bg-white shadow-brand" aria-live="polite">
      <div className="relative aspect-[16/9] overflow-hidden bg-brand-paper">
        <AnimatePresence mode="popLayout">
          <motion.img key={id} src={img(`bb-r-${id}`, 960)} alt={t(r.name)} className="absolute inset-0 h-full w-full object-cover" initial={{ opacity: 0, scale: 1.12 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.9, ease: [0.22, 0.8, 0.2, 1] }} />
        </AnimatePresence>
        <span className="stripe absolute inset-x-0 bottom-0 h-[4px]" />
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={id} className="p-7" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35 }}>
          <span className="eyebrow">{u('region')}</span>
          <h3 className="mb-2.5 mt-2 font-mag text-[clamp(32px,4vw,46px)] font-medium leading-[1.05] [html[lang=bn]_&]:font-normal [html[lang=bn]_&]:leading-snug">{t(r.name)}</h3>
          <p className="text-brand-ink2">{t(r.line)}</p>
          <div className="my-5 flex flex-wrap gap-2">
            {r.tags.map((x) => <Badge key={x.en}>{t(x)}</Badge>)}
            {r.pillars.map((pid) => {
              const p = pillarById(pid);
              return (
                <Badge key={pid} variant="outline">
                  <i className={`fa-solid ${p.icon}`} style={{ color: p.c }} aria-hidden="true" /> {t(p.name)}
                </Badge>
              );
            })}
          </div>
          <Button asChild>
            <Link to={`/regions/${r.id}`}>{u('openRegion')} <i className="fa-solid fa-arrow-right" aria-hidden="true" /></Link>
          </Button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
