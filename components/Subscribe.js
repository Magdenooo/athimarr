"use client";

const Subscribe = () => {
  return (
    <section className="py-20 bg-gray-900 text-white text-center relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <h2 className="text-4xl font-bold mb-8 text-yellow-400">
          اشترك الآن
        </h2>
        <p className="text-lg mb-8 text-gray-300">
          اشترك الآن للحصول على آخر التحديثات والمميزات الجديدة.
        </p>
        <form className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 items-center justify-center">
          <input
            type="email"
            placeholder="أدخل بريدك الإلكتروني"
            className="flex-1 px-4 py-2 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
          />
          <button className="bg-yellow-500 text-gray-900 px-6 py-2 rounded-md hover:bg-yellow-400 transition transform hover:scale-105 focus:ring-2 focus:ring-yellow-400">
            اشترك الآن
          </button>
        </form>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 opacity-30 pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-48 h-48 bg-yellow-500 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-yellow-500 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-yellow-500 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-pulse"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-pulse"></div>
    </section>
  );
};

export default Subscribe;
