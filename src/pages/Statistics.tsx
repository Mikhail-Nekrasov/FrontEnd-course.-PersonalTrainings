import { useEffect, useState } from "react";
import { fetchTrainings } from "../api";
import LoadingSpinner from "../components/LoadingSpinner";
import { groupBy, sumBy } from "lodash";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

export default function Statistics() {
  const [stats, setStats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrainings()
      .then((data) => {
        if (!data) return;

        const grouped = groupBy(data, "activity");

        const results = Object.keys(grouped).map((activity) => ({
          activity: activity,
          total: sumBy(grouped[activity], "duration"),
        }));

        setStats(results);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div style={{ marginLeft: 20 }}>
      <h2>Training Statistics</h2>

      <div style={{ width: "100%", overflowX: "auto" }}>
        <BarChart 
            width={stats.length * 150} 
            height={400}
            data={stats}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="activity" interval={0}/>
          <YAxis 
            label={{ value: "Total duration (min)", angle: -90, position: "insideLeft" }}/>
          <Tooltip />
          <Bar dataKey="total" fill="#3f51b5" />
        </BarChart>
      </div>
    </div>
  );
}
