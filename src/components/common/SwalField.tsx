import Swal from "sweetalert2";
type Props = {
  title?: string;
  text?: string;
  icon?: "success" | "error" | "warning" | "info" | "question";
};
const SwalField = ({ title, text, icon }: Props) => {
  Swal.fire({
    title: title,
    text: text,
    icon: icon,
  });
};

export default SwalField;
