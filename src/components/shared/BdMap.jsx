import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { DIVISIONS, MAP_H, MAP_W } from '@/data/bdMapPaths';
import { img } from '@/lib/utils';
import content from '@/data/content';
import { pillarById, regionById } from '@/data/helpers';
import { useLang } from '@/context/LanguageContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

// soft brand tints so each division reads as its own place, plus a darker shade for the slab's side wall
const TINT = { rangpur: '#F6E3C5', rajshahi: '#F9D9CC', mymensingh: '#DCEBD3', sylhet: '#CFE6DF', dhaka: '#F3D4DC', khulna: '#D5E6E2', barishal: '#D9E3F0', chattogram: '#E9E1F0' };
const SIDE = { rangpur: '#D9BF97', rajshahi: '#DDB2A2', mymensingh: '#B3CBA6', sylhet: '#A3C6BB', dhaka: '#D3A7B3', khulna: '#A9C5BF', barishal: '#AFBFD6', chattogram: '#C4B5D2' };
// nudge labels where the shape's centre is awkward (long Chattogram strip, coastal Khulna)
const LABEL = { chattogram: [410, 520], khulna: [150, 430], barishal: [262, 500] };
const BASE = 5; // every division is a thin slab
const LIFT = 26; // the selected one rises this far
const ty = (y) => ({ transform: `translateY(${y}px)`, transition: 'transform .75s cubic-bezier(.22,1.2,.36,1), opacity .6s' });

/** Division as an extruded slab: stacked side layers + a top face that rises when selected */
function Slab({ r, dv, on, hover, i, inView, label, onSelect, onHover, onKey }) {
  const { t } = useLang();
  const h = on ? LIFT : hover ? 10 : 0;
  const layers = on ? 26 : 5;
  const [lx, ly] = label;
  return (
    <g
      className={`reg ${on ? 'active' : ''}`}
      tabIndex={0} role="button" aria-pressed={on} aria-label={t(r.name)}
      onClick={() => onSelect(r.id)} onKeyDown={(e) => onKey(e, r.id)}
      onMouseEnter={() => onHover(r.id)} onMouseLeave={() => onHover(null)}
    >
      <motion.g initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.15 + i * 0.08, duration: 0.8, ease: [0.22, 0.8, 0.2, 1] }}>
        {/* ground shadow, grows as the slab rises */}
        <path d={dv.d} fill="#0B2A2B" filter="url(#map-blur)" className="pointer-events-none" style={{ ...ty(on ? 12 : 0), opacity: on ? 0.35 : 0 }} />
        {/* side wall: layers spread between the ground and the top face */}
        {Array.from({ length: layers }, (_, k) => (
          <path key={k} d={dv.d} fill={on ? (k > layers / 2 ? '#0A4647' : '#062E2F') : SIDE[r.id]} style={ty(BASE - ((h + BASE) * k) / layers)} />
        ))}
        {/* top face */}
        <path d={dv.d} className="top" fill={on ? 'url(#map-top)' : TINT[r.id]} style={ty(-h)} />
        <text x={lx} y={ly + 5} style={ty(-h)}>{t(r.name)}</text>
      </motion.g>
    </g>
  );
}

/** Map of the eight divisions from real boundary data, drawn as a tilted 3D relief — keyboard accessible */
export function BdMap({ active, onSelect }) {
  const { u } = useLang();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [hover, setHover] = useState(null);
  const handleKey = (e, id) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(id); }
  };
  // painter's order: north-to-south so southern slabs overlap correctly, active always last (on top)
  const order = [...content.regions].sort((a, b) => (a.id === active) - (b.id === active) || DIVISIONS[a.id].cy - DIVISIONS[b.id].cy);
  const act = DIVISIONS[active];
  const [ax, ay] = LABEL[active] || [act.cx, act.cy];
  return (
    <div ref={ref} className="mx-auto w-full max-w-[540px] [perspective:1600px]">
      <svg className="bd-map w-full overflow-visible [transform:rotateX(30deg)] [transform-origin:50%_70%]" viewBox={`0 -40 ${MAP_W} ${MAP_H + 70}`} role="group" aria-label={u('mapLabel')}>
        <defs>
          <filter id="map-blur" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="9" /></filter>
          <linearGradient id="map-top" x1="0" y1="0" x2="0.4" y2="1">
            <stop offset="0" stopColor="#1C7A7B" /><stop offset="1" stopColor="#0E5B5C" />
          </linearGradient>
        </defs>
        {/* Bay of Bengal */}
        <text x="330" y={MAP_H - 40} textAnchor="middle" className="fill-[#5E8FA3]" style={{ fontFamily: 'var(--f-serif)', fontStyle: 'italic', fontSize: 20 }}>{u('bay')}</text>

        {order.map((r) => (
          <Slab
            key={r.id} r={r} dv={DIVISIONS[r.id]} on={r.id === active} hover={hover === r.id && r.id !== active}
            i={content.regions.indexOf(r)} inView={inView} label={LABEL[r.id] || [DIVISIONS[r.id].cx, DIVISIONS[r.id].cy]}
            onSelect={onSelect} onHover={setHover} onKey={handleKey}
          />
        ))}

        {/* pin standing on the raised division */}
        {inView && (
          <motion.g key={active} initial={{ y: -40, opacity: 0 }} animate={{ y: -LIFT, opacity: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.15 }} className="pointer-events-none">
            <circle cx={ax} cy={ay - 30} r="14" fill="#FBC111" opacity=".35" className="map-ping" />
            <path d={`M${ax} ${ay - 14} c-9 -10 -14 -16 -14 -23 a14 14 0 1 1 28 0 c0 7 -5 13 -14 23z`} fill="#FBC111" stroke="#fff" strokeWidth="2" />
            <circle cx={ax} cy={ay - 37} r="5" fill="#fff" />
          </motion.g>
        )}
      </svg>
    </div>
  );
}

export function RegionPanel({ id }) {
  const { t, u } = useLang();
  const r = regionById(id);
  return (
    <div className="relative overflow-hidden rounded-[5px] border border-brand-line bg-white shadow-brand" aria-live="polite">
      <div className="relative aspect-[16/9] overflow-hidden bg-brand-paper">
        <AnimatePresence mode="popLayout">
          <motion.img key={id} loading="lazy" decoding="async" src={img(`bb-r-${id}`, 960)} alt={t(r.name)} className="absolute inset-0 h-full w-full object-cover" initial={{ opacity: 0, scale: 1.12 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.9, ease: [0.22, 0.8, 0.2, 1] }} />
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
