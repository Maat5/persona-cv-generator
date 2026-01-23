import styles from "./styles.module.css";
import { ContactInfo as ContactInfoType } from "@/app/types";

export const ContactInfo = ({
  email,
  likedinUrl,
  phoneNumber,
}: ContactInfoType) => {
  return (
    <div className={styles.contactInfoContainer}>
      <div className={styles.contactItem}>
        <label>Email</label>
        <a href={`mailto:${email}`}>{email}</a>
      </div>
      <div className={styles.contactItem}>
        <label>Likedin:</label>
        <a href={likedinUrl}>{likedinUrl?.replace("https://", "")}</a>
      </div>
      <div className={styles.contactItem}>
        <label>Phone Number: </label>
        <a href={`tel:${phoneNumber}`}>{phoneNumber}</a>
      </div>
    </div>
  );
};
