import styles from "./styles.module.css";

export const Container = ({
  children,
  isPreview,
}: {
  children: React.ReactNode;
  isPreview?: boolean;
}) => {
  return (
    <div className={`${styles.container} ${isPreview ? styles.preview : ""}`}>
      {children}
    </div>
  );
};
