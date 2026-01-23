import {
  Header as UserInfoType,
  ContactInfo as ContactInfoType,
} from "@/app/types";
import { UserInfo } from "../UserInfo/UserInfo";
import { ContactInfo } from "../ContactInfo/ContactInfo";

import styles from "./styles.module.css";

export const Heading = ({
  userInfo,
  contactInfo,
  isPreview,
}: {
  userInfo: UserInfoType;
  contactInfo: ContactInfoType;
  isPreview?: boolean;
}) => {
  return (
    <div
      className={`${styles.headingContainer} ${
        isPreview ? styles.preview : ""
      }`}
    >
      <UserInfo {...userInfo} />
      <ContactInfo {...contactInfo} />
    </div>
  );
};
