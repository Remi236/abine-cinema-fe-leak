import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import PropTypes from 'prop-types';

const CustomeLineChart = ({ data, descriptionKeys }) => (
  <ResponsiveContainer height={300}>
    <LineChart
      data={data}
      margin={{
        top: 0, right: 0, left: -15, bottom: 0,
      }}
    >
      <XAxis dataKey="name" />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Legend />
      {
        descriptionKeys.map(descKey => (
          <Line type="monotone" name={descKey.name} dataKey={descKey.key} stroke={descKey.stroke} activeDot={{ r: 6 }} />
        ))
      }
      {/* <Line type="monotone" dataKey="pv" stroke="#4ce1b6" activeDot={{ r: 6 }} />
      <Line type="monotone" dataKey="uv" stroke="#70bbfd" activeDot={{ r: 6 }} />
      <Line type="monotone" dataKey="amt" stroke="#f6da6e" activeDot={{ r: 6 }} /> */}
    </LineChart>
  </ResponsiveContainer>
);

CustomeLineChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  descriptionKeys: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CustomeLineChart;
