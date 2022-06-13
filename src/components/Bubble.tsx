import React from 'react';
import './Bubble.scss';
import cx from 'clsx';
import { motion } from 'framer-motion';

interface BubbleProps {
  isSender?: boolean
}

const Bubble = ({ children, isSender }: React.PropsWithChildren<BubbleProps>) => {
  return (
    <motion.div
      className={cx(
        'bubble',
        isSender && 'bubble--self',
      )}
      initial={{ opacity: 1, translateY: 60 }}
      animate={{ opacity: 1, translateY: 0 }}
      exit={{ opacity: 0 }}
    >
      <span>{children}</span>
    </motion.div>
  );
};

Bubble.defaultProps = {
  isSender: false,
};

export default Bubble;