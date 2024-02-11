import styles from "./styles.module.css";

interface IProps {
  children: React.ReactNode;
  onClickHandler: () => void;
  type?: "button" | "reset" | "submit";
}

const Button: React.FC<IProps> = ({
  children,
  onClickHandler,
  type = "button",
}) => {
  return (
    <button type={type} onClick={onClickHandler} className={styles.button}>
      {children}
    </button>
  );
};

export default Button;
