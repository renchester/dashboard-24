import { motion } from 'framer-motion';
import styles from './Switch.module.scss';

type SwitchProps = {
  id: string;
  isOn: boolean;
  handler?: (e?: any) => void;
};

function Switch(props: SwitchProps) {
  const { id, isOn, handler } = props;

  const spring = {
    type: 'spring',
    stiffness: 700,
    damping: 30,
  };

  return (
    <div className={styles.switch} data-status={isOn}>
      <motion.label
        layout
        layoutRoot
        htmlFor={id}
        aria-hidden
        className={styles.switch__tablet}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && handler) handler();
        }}
      >
        <input
          id={id}
          type="checkbox"
          onChange={handler}
          className={styles.switch__input}
          checked={isOn}
        />

        <motion.div
          layoutId={id}
          transition={spring}
          aria-hidden
          className={styles.switch__marker}
        />
      </motion.label>
    </div>
  );
}

export default Switch;
