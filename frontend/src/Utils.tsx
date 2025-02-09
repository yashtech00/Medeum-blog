import { toast } from "react-toastify";

export const handleSuccess = (msg :string) => {
  toast.success(msg, {
    position: "bottom-left",
  });
};

export const handleError = (msg :string) => {
  toast.error(msg, {
    position: "bottom-left",
  });
};
