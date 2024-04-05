import toast from "react-hot-toast";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleError = (error: any) => {
  toast.error(error?.data.message);
};
