import styles from "./styles.module.css";

interface IProps {
  type: string;
  placeholder: string;
  value: string;
  id: string;
  onChange: (e: any) => void;
}

const Input: React.FC<IProps> = ({
  type,
  placeholder,
  value,
  id,
  onChange,
}) => {
  return (
    <input
      className={styles.input}
      id={id}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      required
    />
  );
};

export default Input;
