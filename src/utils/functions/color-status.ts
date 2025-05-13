export const getColorStatus = (status: string) => {
  switch (status) {
    case "pending":
      return "border-yellow-500 text-yellow-300";
    case "delivered":
      return "border-green-500 text-green-300";
    case "cancelled":
      return "border-red-500 text-red-300";
  }
};
