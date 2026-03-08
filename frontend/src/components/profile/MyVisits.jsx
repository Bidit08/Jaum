import { useEffect, useState } from "react";
import api from "@/utils/api";
import { CalendarClock } from "lucide-react";

const MyVisits = () => {
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/visits/my").then((res) => {
      setVisits(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) return <p>Loading visits...</p>;
  if (!visits.length)
    return <p className="text-slate-500">No visit requests yet.</p>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">My Visit Requests</h2>

      {visits.map((v) => (
        <div
          key={v._id}
          className="bg-white border rounded-2xl p-5 shadow-sm flex justify-between items-center"
        >
          <div>
            <p className="font-bold">{v.vehicleId?.name}</p>
            <p className="text-sm text-slate-500">
              {new Date(v.visitDate).toLocaleString()}
            </p>
            <p className="text-xs text-slate-400">
              Status: <span className="font-semibold">{v.status}</span>
            </p>
          </div>
          <CalendarClock className="text-blue-600" />
        </div>
      ))}
    </div>
  );
};

export default MyVisits;
