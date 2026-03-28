import { useState } from 'react';
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  AreaChart, Area,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

const COLORS = ['#ec4899', '#facc15', '#3b82f6', '#16a34a', '#f97316', '#8b5cf6', '#000000'];
const CHART_TYPES = ['pie', 'bar', 'area', 'radar'];

function SpendingChart({ transactions }) {
  const [chartType, setChartType] = useState('pie');

  const data = Object.entries(
    transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + Number(t.amount);
        return acc;
      }, {})
  ).map(([name, value]) => ({ name, value }));

  if (data.length === 0) {
    return null;
  }

  const dollarFormatter = (value) => `$${value.toFixed(2)}`;

  const renderChart = () => {
    switch (chartType) {
      case 'bar':
        return (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={dollarFormatter} />
            <Bar dataKey="value" name="Spending">
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        );
      case 'area':
        return (
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={dollarFormatter} />
            <Area type="monotone" dataKey="value" name="Spending" fill="#3b82f6" stroke="#000" fillOpacity={0.3} />
          </AreaChart>
        );
      case 'radar':
        return (
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="name" />
            <PolarRadiusAxis />
            <Tooltip formatter={dollarFormatter} />
            <Radar name="Spending" dataKey="value" stroke="#000" fill="#3b82f6" fillOpacity={0.3} />
          </RadarChart>
        );
      default:
        return (
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={dollarFormatter} />
            <Legend />
          </PieChart>
        );
    }
  };

  return (
    <div className="spending-chart">
      <div className="chart-header">
        <h2>Spending by Category</h2>
        <div className="chart-type-selector">
          {CHART_TYPES.map(type => (
            <button
              key={type}
              className={`chart-type-btn${chartType === type ? ' active' : ''}`}
              onClick={() => setChartType(type)}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        {renderChart()}
      </ResponsiveContainer>
    </div>
  );
}

export default SpendingChart;
