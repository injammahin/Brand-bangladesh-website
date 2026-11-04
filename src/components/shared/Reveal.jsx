import { motion, useReducedMotion } from 'framer-motion';

/** Fades + lifts children into view on scroll */
export function Reveal({ as = 'div', delay = 0, y = 26, className, children, ...props }) {
  const reduce = useReducedMotion();
  const Comp = motion[as] || motion.div;
  return (
    <Comp
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -40px 0px' }}
      transition={{ duration: 0.9, delay: delay / 1000, ease: [0.22, 0.8, 0.2, 1] }}
      {...props}
    >
      {children}
    </Comp>
  );
}

/** Image that unveils with a clip-path wipe and settles from a slight zoom */
export function RevealImage({ src, alt = '', className, imgClassName, ...props }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { clipPath: 'inset(12% 12% 12% 12% round 28px)' }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 0px)' }}
      viewport={{ once: true, margin: '0px 0px -80px 0px' }}
      transition={{ duration: 1.3, ease: [0.76, 0, 0.24, 1] }}
    >
      <motion.img
        src={src} alt={alt} loading="lazy" className={imgClassName}
        initial={reduce ? false : { scale: 1.25 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
        transition={{ duration: 1.6, ease: [0.22, 0.8, 0.2, 1] }}
        {...props}
      />
    </motion.div>
  );
}
