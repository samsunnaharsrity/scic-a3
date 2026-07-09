export default function Hero() {
  return (
    <section className="h-[70vh] flex items-center justify-center bg-blue-600 text-white">
      <div className="text-center">
        <h1 className="text-5xl font-bold">
          Find Your Perfect Study Room
        </h1>

        <p className="mt-5">
          Book study spaces quickly and easily.
        </p>

        <button className="mt-6 bg-white text-blue-600 px-6 py-3 rounded-lg">
          Explore Rooms
        </button>
      </div>
    </section>
  );
}