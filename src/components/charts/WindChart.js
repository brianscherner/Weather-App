import React from "react";
import PropTypes from "prop-types";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

function WindChart(props) {
  const { detailedForecast, isCelsiusSelected } = props;

  return (
    <React.Fragment>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={detailedForecast}>
        <CartesianGrid strokeDasharray="3 3"/>
        <XAxis dataKey="time"/>
        {isCelsiusSelected ?
          <YAxis
            yAxisId="left"
            domain={[0, 'auto']}
            label={{ value: 'Kilometers per hour', position: 'center', fontSize: "110%", angle: -90 }}/>
          :
          <YAxis
            yAxisId="left"
            domain={[0, 'auto']}
            label={{ value: 'Miles per hour', position: 'center', fontSize: "110%", angle: -90 }}/>
        }
        <Tooltip/>
        <Legend/>
        {isCelsiusSelected ?
          <Line type="monotone" yAxisId="left" dataKey="wind_kph" name="Wind" stroke="#198754" activeDot={{ r: 6 }}/>
          :
          <Line type="monotone" yAxisId="left" dataKey="wind_mph" name="Wind" stroke="#198754" activeDot={{ r: 6 }}/>
        }
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  )
}

WindChart.propTypes = {
  detailedForecast: PropTypes.array,
  isCelsiusSelected: PropTypes.bool
}

export default WindChart;