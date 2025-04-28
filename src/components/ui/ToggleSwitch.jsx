import React, { useState } from 'react';
import styles from 'src/style/ui/ToggleSwitch.module.scss';

export default function ToggleSwitch() {
  const [isOn, setIsOn] = useState(false);

  const toggle = () => setIsOn(prev => !prev);

  return (
    <div
      className={`${styles.switch} ${isOn ? styles.on : ''}`}
      onClick={toggle}
    >
      <div className={styles.toggle}></div>
    </div>
  );
};