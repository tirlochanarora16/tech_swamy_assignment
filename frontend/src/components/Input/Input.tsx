import styles from "./styles.module.css";

interface IProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: any) => void;
}

const Input: React.FC<IProps> = ({ type, placeholder, value, onChange }) => {
  return (
    <input
      className={styles.input}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      required
    />
  );
};

export default Input;
