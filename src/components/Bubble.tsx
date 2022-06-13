import React from 'react';
import './Bubble.scss';
import cx from 'clsx';
import { motion } from 'framer-motion';

interface BubbleProps {
  content: string;
  author?: string;
  isSender?: boolean;
}

const Bubble = ({ content, author, isSender }: BubbleProps) => {
  return (
    <motion.div
      initial={{ opacity: 1, translateY: 60 }}
      animate={{ opacity: 1, translateY: 0 }}
      exit={{ opacity: 0 }}
      className={cx(
        'bubble',
        isSender && 'bubble--self',
      )}
    >
      <span className="bubble__author">{author}</span>
      <div
        className="bubble__content"
        dangerouslySetInnerHTML={{__html: content}}
      />
    </motion.div>
  );
};

Bubble.defaultProps = {
  isSender: false,
  author: '',
};

export default Bubble;