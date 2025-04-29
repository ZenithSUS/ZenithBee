import Anonymous from "../assets/ui/anonymous.jpg";

export default function Header() {
  return (
    <header className="bg-primary-color sticky top-0 right-0 left-0 z-40 flex flex-col items-center justify-between gap-3 p-4 md:flex-row md:gap-0">
      <h1 className="text-xl font-bold">ZenithBee</h1>
      <div className="flex items-center gap-1.5">
        <img
          src={Anonymous}
          alt="Profile"
          className="h-12 w-12 rounded-full object-cover"
        />
        <p className="text-lg">Anonymous</p>
      </div>
    </header>
  );
}
