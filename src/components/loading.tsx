import { Atom } from "react-loading-indicators";

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Atom
        color="#FF5C28"
        size="large"
        text="loading..."
        textColor="#000000"
      />
    </div>
  );
}
