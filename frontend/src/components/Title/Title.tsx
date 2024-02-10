import styles from "./styles.module.css";

interface IProps {
  children: React.ReactNode;
}

const Title: React.FC<IProps> = ({ children }) => {
  return <h1 className={styles.title}>{children}</h1>;
};

export default Title;
