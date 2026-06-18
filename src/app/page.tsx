'use client';

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-24">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold">
            Find Your Perfect Property
          </h1>

          <p className="mt-6 text-xl max-w-2xl mx-auto">
            Discover apartments, villas, houses, and commercial properties
            across India. Buy, rent, or list your property with ease.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <button onClick={()=>{router.push("/properties")}} className="bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold">
              Browse Properties
            </button>

            <button onClick={()=>{router.push("/my-properties")}} className="border border-white px-6 py-3 rounded-lg font-semibold">
              List Your Property
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div className="shadow rounded-xl p-6">
              <h2 className="text-3xl font-bold text-blue-600">500+</h2>
              <p className="text-gray-600 mt-2">Properties Listed</p>
            </div>

            <div className="shadow rounded-xl p-6">
              <h2 className="text-3xl font-bold text-blue-600">100+</h2>
              <p className="text-gray-600 mt-2">Cities Covered</p>
            </div>

            <div className="shadow rounded-xl p-6">
              <h2 className="text-3xl font-bold text-blue-600">300+</h2>
              <p className="text-gray-600 mt-2">Happy Buyers</p>
            </div>

            <div className="shadow rounded-xl p-6">
              <h2 className="text-3xl font-bold text-blue-600">24/7</h2>
              <p className="text-gray-600 mt-2">Support Available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Browse By Property Type
          </h2>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              'Apartments',
              'Villas',
              'Independent Houses',
              'Commercial Spaces',
            ].map((type) => (
              <div
                key={type}
                className="bg-white p-8 rounded-xl shadow text-center"
              >
                <h3 className="font-semibold text-lg">{type}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Property Hub?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="shadow rounded-xl p-6">
              <h3 className="font-semibold text-xl mb-3">
                Verified Listings
              </h3>

              <p className="text-gray-600">
                All property listings are reviewed to ensure authenticity and
                reliability.
              </p>
            </div>

            <div className="shadow rounded-xl p-6">
              <h3 className="font-semibold text-xl mb-3">
                Easy Property Search
              </h3>

              <p className="text-gray-600">
                Filter by city, property type, price, and amenities to find
                exactly what you need.
              </p>
            </div>

            <div className="shadow rounded-xl p-6">
              <h3 className="font-semibold text-xl mb-3">
                Direct Owner Contact
              </h3>

              <p className="text-gray-600">
                Connect directly with property owners through our inquiry
                system.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}