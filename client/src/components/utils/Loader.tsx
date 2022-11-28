import styles from './utils.module.css';

export const Loader = (props: any) => {
  console.log('PROPS');
  return (
    <div className={styles.loaderContainer}>
      <div style={props.style} className={styles.spinner}></div>
    </div>
  );
};
