import { Button } from "@radix-ui/themes";
import styles from "./button.module.css";

export interface ButtonProps {
  iconSrc?: string;
  onClick?: () => void;
  name?: string;
}

/* eslint-disable-next-line */
export function CustomButton(props: ButtonProps) {
  const { iconSrc, onClick, name } = props;
  return (
    <Button className={styles["create-button"]} onClick={onClick} data-testid="base-button">
      {iconSrc && <img src={iconSrc} alt="Icon" width={20} height={20} />}
      {name}
    </Button>
  );
}

export default CustomButton;
