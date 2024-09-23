import styles from './Overlay.module.scss';
import { useEffect } from 'react';

function Overlay({
  children,
  hideChildren,
}: {
  children: React.ReactNode;
  hideChildren: () => void;
}) {
  useEffect(() => {
    function escKeyListener(e: { key: string }) {
      if (e.key === 'Escape') {
        hideChildren();
      }
    }

    window.addEventListener('keydown', escKeyListener);

    return () => window.removeEventListener('keydown', escKeyListener);
  }, [hideChildren]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;

    // Only run event when actual overlay is clicked
    e.preventDefault();
    hideChildren();
  };

  return (
    <div className={styles.overlay} onClick={handleClick}>
      {children}
    </div>
  );
}

export default Overlay;
