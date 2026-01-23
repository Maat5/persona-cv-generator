import { Header as UserInfoType } from "@/app/types";
import styles from "./styles.module.css";

export const UserInfo = ({ name, title, url }: UserInfoType) => {
  return (
    <div className={styles.headingContainer}>
      <div className={styles.headingRow}>
        <h1>{name || "---"}</h1>
      </div>
      <div className={styles.headingRow}>
        {title && <h2>{title}</h2>}
        {url && (
          <h3>
            <a href={url}>{url}</a>
          </h3>
        )}
      </div>
    </div>
  );
};
