import HeroImg from "../assets/ui/hero.png";
import SearchBar from "../components/searchbar";
import { productFilter } from "../data/product-filter";

export default function Orders() {
  return (
    <div className="flex min-h-screen flex-col gap-3">
      <SearchBar />

      {/*Hero Element*/}
      <div className="relative h-fit w-full overflow-hidden rounded-xl">
        <div className="absolute inset-0 z-10 flex items-center">
          <div className="bg-accent-color clip-path-polygon flex h-full w-[50%] flex-col items-center justify-center gap-1 p-5">
            <h1 className="font-sans text-3xl font-bold">30% Off</h1>
            <p className="text-2xl font-bold text-white">Fitness Meal</p>
          </div>
        </div>
        <img src={HeroImg} alt="hero" className="h-60 w-full object-cover" />
      </div>

      {/* Product Filter*/}
      <div className="mt-10 flex w-full items-center gap-5">
        {productFilter.map((filter, index) => (
          <div key={index} className="flex items-center gap-1">
            <img src={filter.image} alt={filter.name} className="w-6" />
            <h2 className="text-md">{filter.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
