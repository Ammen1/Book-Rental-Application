import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#FF2727', '#006AFF', '#52C93F', '#FFBB28', '#FF8042'];

const CustomPieChart = ({ data = [] }) => {
  // Ensure data is an array and has elements
  if (!Array.isArray(data) || data.length === 0) {
    return <p>No data available</p>;
  }

  return (
    <div>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <div style={{ textAlign: 'center', marginTop: '10px' }}>
        {data.map((entry, index) => (
          <div
            key={`legend-${index}`}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              margin: '0 auto 10px',
              width: '150px',
            }}
          >
            <span style={{ color: COLORS[index % COLORS.length] }}>■</span>
            <span>{entry.name}</span>
            <span style={{ fontWeight: 'bold' }}>{entry.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomPieChart;
