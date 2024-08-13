import Swal from "sweetalert2";

const SwalYesNo = async (): Promise<boolean> => {
  const result = await Swal.fire({
    title: "Bạn chắc chắn muốn xóa?",
    text: "Sau khi xóa sẽ không thể khôi phục!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Vẫn xóa !",
    cancelButtonText: "Hủy",
  });

  if (result.isConfirmed) {
    return true;
  } else {
    return false;
  }
};

export default SwalYesNo;
