import styles from './HoverHeading.module.css';

type HoverHeadingProps = {
  title: string;
};

export default function HoverHeading({ title }: HoverHeadingProps) {
  return (
    <div className={`${styles.button} text-2xl md:text-5xl font-heading`} data-text={title}>
      &nbsp;{title}&nbsp;
      <span className={styles.hoverText}>&nbsp;{title}&nbsp;</span>
    </div>
  );
}
