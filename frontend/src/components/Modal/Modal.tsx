import { Dialog } from "@mui/material";
import styles from "./styles.module.css";

interface Iprops {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<Iprops> = ({ open, onClose, children }) => {
  return (
    <Dialog open={open} onClose={onClose} classes={{ paper: styles.paper }}>
      {children}
    </Dialog>
  );
};

export default Modal;
