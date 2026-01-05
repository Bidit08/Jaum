import { useEffect, useState } from "react";
import api from "../../utils/api";
import { Car, Users } from "lucide-react";

const BACKEND_URL = "http://localhost:5000";

const AllListings = () => {
  const [listings, setListings] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await api.get("/listings");
        setListings(res.data);
      } catch (err) {
        console.error("Failed to load listings", err);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  const filteredListings =
    filter === "all"
      ? listings
      : listings.filter((l) => l.listingType === filter);

  if (loading) return <p>Loading listings...</p>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Browse Listings</h1>
        <p className="text-slate-500">
          Vehicles and seat availability near you
        </p>
      </div>

      {/* Filters */}
      <div className="flex gap-3">
        {[
          { key: "all", label: "All" },
          { key: "full", label: "Full Vehicles" },
          { key: "seats", label: "Seat Listings" },
        ].map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition ${
              filter === f.key
                ? "bg-blue-600 text-white"
                : "bg-white border text-slate-600 hover:bg-slate-50"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Listings Grid */}
      {filteredListings.length === 0 ? (
        <p className="text-slate-500">No listings found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredListings.map((l) => (
            <div
              key={l._id}
              className="bg-white rounded-2xl border shadow-sm overflow-hidden hover:shadow-md transition"
            >
              {/* Image */}
              <img
                src={
                  l.photos?.length
                    ? `${BACKEND_URL}${l.photos[0]}`
                    : "/placeholder-car.jpg"
                }
                alt={l.name}
                className="h-48 w-full object-cover"
              />

              {/* Content */}
              <div className="p-4 space-y-2">
                <h3 className="font-bold text-lg truncate">{l.name}</h3>

                {/* Badge */}
                <span
                  className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${
                    l.listingType === "full"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-emerald-100 text-emerald-700"
                  }`}
                >
                  {l.listingType === "full" ? (
                    <>
                      <Car size={12} /> Full Vehicle
                    </>
                  ) : (
                    <>
                      <Users size={12} /> Seat Listing
                    </>
                  )}
                </span>

                {/* Pricing */}
                {l.listingType === "full" ? (
                  <p className="font-semibold text-slate-900">
                    ${l.pricePerDay} / day
                  </p>
                ) : (
                  <p className="font-semibold text-slate-900">
                    ${l.pricePerSeat} / seat • {l.availableSeats} seats
                  </p>
                )}

                {/* Location / Route */}
                <p className="text-xs text-slate-500">
                  {l.listingType === "full"
                    ? l.location
                    : `${l.departure} → ${l.destination}`}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllListings;
