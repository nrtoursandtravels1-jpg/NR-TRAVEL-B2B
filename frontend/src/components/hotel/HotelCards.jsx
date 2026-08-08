import { useEffect, useState } from "react";
import {
  Building2,
  CheckCircle,
  XCircle,
  MapPin,
} from "lucide-react";
import { supabase } from "../../services/supabase";

export default function HotelCards() {
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    cities: 0,
  });

  useEffect(() => {
    fetchHotelStats();
  }, []);

  async function fetchHotelStats() {
    const { data, error } = await supabase
      .from("hotels")
      .select("*");

    if (error) {
      console.log(error);
      return;
    }

    setStats({
      total: data.length,
      active: data.filter(
        (h) => h.status === "Active"
      ).length,
      inactive: data.filter(
        (h) => h.status === "Inactive"
      ).length,
      cities: [...new Set(data.map((h) => h.city))]
        .length,
    });
  }

 return (
  <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">

      <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-slate-200">

  <div className="flex justify-between items-center">

    <div>

      <p className="text-slate-500 text-sm font-medium">
        Total Hotels
      </p>

      <h2 className="text-4xl font-bold text-slate-800 mt-2">
        {stats.total}
      </h2>

    </div>

    <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center shadow-md">

      <Building2 className="text-white" size={32} />

    </div>

  </div>

</div>

      <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-slate-200">

  <div className="flex justify-between items-center">

    <div>

      <p className="text-slate-500 text-sm font-medium">
        Active Hotels
      </p>

      <h2 className="text-4xl font-bold text-green-600 mt-2">
        {stats.active}
      </h2>

    </div>

    <div className="w-16 h-16 rounded-2xl bg-green-600 flex items-center justify-center shadow-md">

      <CheckCircle className="text-white" size={32} />

    </div>

  </div>

</div>

      <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-slate-200">

  <div className="flex justify-between items-center">

    <div>

      <p className="text-slate-500 text-sm font-medium">
        Inactive Hotels
      </p>

      <h2 className="text-4xl font-bold text-red-600 mt-2">
        {stats.inactive}
      </h2>

    </div>

    <div className="w-16 h-16 rounded-2xl bg-red-600 flex items-center justify-center shadow-md">

      <XCircle className="text-white" size={32} />

    </div>

  </div>

</div>

  <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-slate-200">

  <div className="flex justify-between items-center">

    <div>

      <p className="text-slate-500 text-sm font-medium">
        Cities Covered
      </p>

      <h2 className="text-4xl font-bold text-purple-600 mt-2">
        {stats.cities}
      </h2>

    </div>

    <div className="w-16 h-16 rounded-2xl bg-purple-600 flex items-center justify-center shadow-md">

      <MapPin className="text-white" size={32} />

    </div>

  </div>

</div>

</div>
);
}