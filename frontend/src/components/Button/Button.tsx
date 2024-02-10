import styles from "./styles.module.css";

interface IProps {
  children: React.ReactNode;
  onClickHandler: () => void;
}

const Button: React.FC<IProps> = ({ children, onClickHandler }) => {
  return (
    <button onClick={onClickHandler} className={styles.button}>
      {children}
    </button>
  );
};

export default Button;
