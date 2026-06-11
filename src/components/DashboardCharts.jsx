const colors = ["#d97706", "#2563eb", "#16a34a", "#7c3aed", "#dc2626", "#0891b2"];

const getTotal = (items) =>
  items.reduce((sum, item) => sum + Number(item.value || 0), 0);

const EmptyChart = ({ message = "Not enough data yet" }) => (
  <div className="flex min-h-48 items-center justify-center rounded-2xl border border-dashed border-base-300 bg-base-200/50 p-6 text-center text-sm text-base-content/50">
    {message}
  </div>
);

const formatNumber = (value) =>
  Number(value || 0).toLocaleString("en-US", {
    maximumFractionDigits: 2,
  });

export const BarChart = ({ title, data = [], className = "" }) => {
  const maxValue = Math.max(...data.map((item) => Number(item.value || 0)), 1);

  return (
    <section className={`rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm ${className}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-black">{title}</h3>
          <p className="mt-1 text-xs text-base-content/50">Sorted by live backend counts</p>
        </div>
        <span className="badge badge-warning">{data.length}</span>
      </div>

      <div className="mt-5 space-y-4">
        {data.length ? (
          data.slice(0, 7).map((item, index) => (
            <div key={`${item.label}-${index}`} className="grid gap-2">
              <div className="flex items-center justify-between gap-3 text-sm">
                <span className="min-w-0 truncate font-semibold">{item.label}</span>
                <span className="font-black">{formatNumber(item.value)}</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-base-200">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${Math.max((Number(item.value || 0) / maxValue) * 100, 4)}%`,
                    backgroundColor: colors[index % colors.length],
                  }}
                  title={`${item.label}: ${item.value}`}
                />
              </div>
            </div>
          ))
        ) : (
          <EmptyChart />
        )}
      </div>
    </section>
  );
};

export const LineChart = ({ title, data = [], className = "" }) => {
  const width = 640;
  const height = 220;
  const maxValue = Math.max(...data.map((item) => Number(item.value || 0)), 1);
  const points = data.map((item, index) => {
    const x = data.length === 1 ? width / 2 : 36 + (index / (data.length - 1)) * (width - 72);
    const y = height - 34 - (Number(item.value || 0) / maxValue) * (height - 72);
    return { ...item, x, y };
  });
  const path = points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");
  const areaPath = points.length
    ? `${path} L ${points[points.length - 1].x} ${height - 34} L ${points[0].x} ${height - 34} Z`
    : "";

  return (
    <section className={`rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm ${className}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-black">{title}</h3>
          <p className="mt-1 text-xs text-base-content/50">Month-by-month activity trend</p>
        </div>
        <span className="badge badge-outline">{points.length} months</span>
      </div>

      <div className="mt-5">
        {points.length > 1 ? (
          <svg viewBox={`0 0 ${width} ${height}`} className="h-64 w-full overflow-visible">
            {[0, 1, 2, 3].map((line) => {
              const y = 20 + line * ((height - 54) / 3);
              return (
                <line
                  key={line}
                  x1="32"
                  x2={width - 24}
                  y1={y}
                  y2={y}
                  stroke="currentColor"
                  className="text-base-300"
                  strokeDasharray="5 7"
                />
              );
            })}
            <path d={areaPath} fill="#d97706" opacity="0.12" />
            <path d={path} fill="none" stroke="#d97706" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            {points.map((point, index) => (
              <g key={`${point.label}-${index}`}>
                <circle cx={point.x} cy={point.y} r="5" fill="#d97706" />
                <text x={point.x} y={point.y - 12} textAnchor="middle" className="fill-current text-[12px] font-bold">
                  {formatNumber(point.value)}
                </text>
                <text x={point.x} y={height - 8} textAnchor="middle" className="fill-current text-[11px] text-base-content/50">
                  {point.label}
                </text>
              </g>
            ))}
          </svg>
        ) : points.length === 1 ? (
          <EmptyChart message={`Only one month of data: ${points[0].label} has ${formatNumber(points[0].value)} activity`} />
        ) : (
          <EmptyChart />
        )}
      </div>
    </section>
  );
};

export const PieChart = ({ title, data = [], className = "" }) => {
  const total = getTotal(data);
  let accumulated = 0;
  const gradient = data
    .map((item, index) => {
      const start = total ? (accumulated / total) * 100 : 0;
      accumulated += Number(item.value || 0);
      const end = total ? (accumulated / total) * 100 : 0;
      return `${colors[index % colors.length]} ${start}% ${end}%`;
    })
    .join(", ");

  return (
    <section className={`rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm ${className}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-black">{title}</h3>
          <p className="mt-1 text-xs text-base-content/50">Distribution from real order data</p>
        </div>
        <span className="badge badge-outline">{formatNumber(total)} total</span>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-[170px_1fr] sm:items-center">
        <div className="relative mx-auto h-44 w-44">
          <div
            className="h-44 w-44 rounded-full border border-base-300"
            style={{ background: total ? `conic-gradient(${gradient})` : "var(--fallback-b2, #e5e7eb)" }}
            aria-label={`${title} pie chart`}
          />
          <div className="absolute inset-8 flex flex-col items-center justify-center rounded-full bg-base-100 text-center shadow-inner">
            <span className="text-2xl font-black">{formatNumber(total)}</span>
            <span className="text-[10px] font-bold uppercase text-base-content/45">Total</span>
          </div>
        </div>
        <div className="space-y-3">
          {data.length ? (
            data.map((item, index) => (
              <div key={`${item.label}-${index}`} className="flex items-center justify-between gap-3">
                <span className="flex min-w-0 items-center gap-2 text-sm font-semibold">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: colors[index % colors.length] }}
                  />
                  <span className="truncate">{item.label}</span>
                </span>
                <span className="text-right">
                  <span className="block font-black">{formatNumber(item.value)}</span>
                  <span className="text-xs text-base-content/45">
                    {total ? Math.round((Number(item.value || 0) / total) * 100) : 0}%
                  </span>
                </span>
              </div>
            ))
          ) : (
            <p className="text-sm text-base-content/50">No data yet</p>
          )}
        </div>
      </div>
    </section>
  );
};
