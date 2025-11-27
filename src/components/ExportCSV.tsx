
interface ExportCSVProps {
  data: any[];
  filename?: string;
  columns: string[]; 
}

export default function ExportCSV({ data, filename = "data.csv", columns }: ExportCSVProps) {
  
  const exportToCSV = () => {
    if (!data || data.length === 0) {
      alert("No data to export");
      return;
    }

    const headerLine = columns.join(",");

    const rows = data.map((item) =>
      columns.map((key) => item[key] ?? "").join(",")
    );

    const csvContent = [headerLine, ...rows].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    link.click();
  };

  return (
    <button onClick={exportToCSV} style={{ marginBottom: 10 }}>
      Export CSV
    </button>
  );
}
