
import { memo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * FloralSideBorders
 * Realistic floral borders on both sides of each invitation section.
 */
export function FloralSideBorders({ opacity = 0.48 }) {
  const flowerStyle = {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 'clamp(46px, 13vw, 150px)',
    height: '100%',
    objectFit: 'cover',
    pointerEvents: 'none',
    userSelect: 'none',
    opacity,
  };

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
    >
      <img
        src="/henna_flowers_left.png"
        alt=""
        loading="lazy"
        style={{
          ...flowerStyle,
          left: 0,
          objectPosition: 'left center',
        }}
      />

      <img
        src="/henna_flowers_right.png"
        alt=""
        loading="lazy"
        style={{
          ...flowerStyle,
          right: 0,
          objectPosition: 'right center',
        }}
      />
    </div>
  );
}

/**
 * FloralCorners
 * Original realistic rose corner framing.
 */
export const FloralCorners = memo(function FloralCorners({
  corners = ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
  opacity = 0.92,
  size = 'clamp(150px, 28vw, 400px)',
  className = '',
  style = {},
}) {
  const { scrollY } = useScroll();
  const yParallaxTop = useTransform(scrollY, [0, 1000], [0, -12]);
  const yParallaxBottom = useTransform(scrollY, [0, 1000], [0, 12]);

  const hasTL = corners.includes('top-left') || corners.includes('tl');
  const hasTR = corners.includes('top-right') || corners.includes('tr');
  const hasBL = corners.includes('bottom-left') || corners.includes('bl');
  const hasBR = corners.includes('bottom-right') || corners.includes('br');

  const cornerBase = {
    position: 'absolute',
    width: size,
    maxWidth: '44vw',
    pointerEvents: 'none',
    zIndex: 0,
    userSelect: 'none',
    opacity,
  };

  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{ zIndex: 0, ...style }}
    >
      {hasTL && (
        <motion.div
          style={{
            ...cornerBase,
            top: 0,
            left: 0,
            y: yParallaxTop,
          }}
        >
          <img
            src="/tl.png"
            alt=""
            loading="lazy"
            className="w-full h-auto block select-none"
            style={{
              filter: 'drop-shadow(0 4px 16px rgba(87, 38, 62, 0.08))',
            }}
          />
        </motion.div>
      )}

      {hasTR && (
        <motion.div
          style={{
            ...cornerBase,
            top: 0,
            right: 0,
            y: yParallaxTop,
          }}
        >
          <img
            src="/tl.png"
            alt=""
            loading="lazy"
            className="w-full h-auto block select-none"
            style={{
              transform: 'scaleX(-1)',
              filter: 'drop-shadow(0 4px 16px rgba(87, 38, 62, 0.08))',
            }}
          />
        </motion.div>
      )}

      {hasBL && (
        <motion.div
          style={{
            ...cornerBase,
            bottom: 0,
            left: 0,
            y: yParallaxBottom,
          }}
        >
          <img
            src="/br.png"
            alt=""
            loading="lazy"
            className="w-full h-auto block select-none"
            style={{
              transform: 'scaleX(-1)',
              filter: 'drop-shadow(0 4px 16px rgba(87, 38, 62, 0.08))',
            }}
          />
        </motion.div>
      )}

      {hasBR && (
        <motion.div
          style={{
            ...cornerBase,
            bottom: 0,
            right: 0,
            y: yParallaxBottom,
          }}
        >
          <img
            src="/br.png"
            alt=""
            loading="lazy"
            className="w-full h-auto block select-none"
            style={{
              filter: 'drop-shadow(0 4px 16px rgba(87, 38, 62, 0.08))',
            }}
          />
        </motion.div>
      )}
    </div>
  );
});

export default FloralCorners;
