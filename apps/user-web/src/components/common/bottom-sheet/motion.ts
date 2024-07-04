export const transition = {
  container: {
    type: 'tween',
    duration: 0.2,
  },
  content: {
    type: 'tween',
    duration: 0.2,
    delay: 0.2,
  },
};

export const variants = {
  overlay: {
    hidden: {
      opacity: 0.5,
      backgroundColor: 'rgba(212, 212, 216, 0.5)',
    },
    visible: {
      backdropFilter: 'blur(10px)',
      backgroundColor: 'rgba(212, 212, 216, 0.5)',
    },
    darker: {
      backdropFilter: 'blur(10px)',
      backgroundColor: 'rgba(212, 212, 216, 0.5)',
    },
  },
  bottomSheet: {
    container: {
      hidden: {
        scale: 1,
        translateY: '100%',
        opacity: 0,
      },
      visible: {
        scale: 1,
        translateY: 0,
        opacity: 1,
      },
      smaller: {
        scale: 0.98,
        translateY: 0,
        opacity: 1,
      },
    },
    content: {
      initial: {
        y: 10,
      },
      animate: { y: 0 },
    },
  },
};
