import React, {useState, useEffect, useContext} from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import subDays from "date-fns/subDays";
import addDays from "date-fns/addDays";

import Panel from './Panel';
import getTooltipStyles from '../../../helpers/getTooltipStyles';
import {ThemeContext} from '../../../contexts/theme.Context';
import {GetOrDelete, ERROR_CODES} from '../../../api';

const defaultData = [{
  name: 'Monday', sum: 590, totaltickets: 1400,
},
{
  name: 'Tuesday', sum: 868, totaltickets: 1506,
},
{
  name: 'Wednesday', sum: 1397, totaltickets: 989,
},
{
  name: 'ThursDay', sum: 1480, totaltickets: 1228,
},
{
  name: 'Friday', sum: 1520, totaltickets: 1100,
},
{
  name: 'Saturday', sum: 1520, totaltickets: 1100,
},
{
  name: 'Sunday', sum: 1400, totaltickets: 1700,
}];

const TopsellChart = () => {
  const {isLightTheme } = useContext(ThemeContext);
  const themeName = isLightTheme ? "theme-light": "theme-dark";
  const [data, setData] = useState(defaultData);

  useEffect(() => {
    const getStatistic = async (valuesObject) => {
      const access_token = sessionStorage.getItem("access_token");
      const response = await GetOrDelete("statistic/cinema-complex", "GET", {
        Authorization: `Bearer ${access_token}`,
      }, valuesObject);
      return response;
    }

    const id = 1;
    const today = new Date();

    const valuesObject = {
      cinemaComplexId: id,
      startDate: subDays(today, (365 * 2)),
      endDate: addDays(today, (365 * 4)),
    };

    getStatistic(valuesObject).then((response) => {
      if(ERROR_CODES.includes(response.statusCode)) {
        alert(response.message);
        if(response.statusCode === "403") {
          window.location.href = "/403"
        }
        else {
          window.location.href = "/505";
        }
      }
      else {
        console.log(response);
        let mainData = Array.from(response).map(item => ({
          name: item.date,
          sum: item.sum,
          totaltickets: item.totaltickets,
        }))
        setData(mainData);
      }
    }).catch(console.error);
  },[])

  return (
    <Panel lg={12} title="Revenuve in week">
      <div dir="ltr">
        <ResponsiveContainer height={250} className="dashboard__area">
          <AreaChart data={data} margin={{ top: 20, left: -15, bottom: 20 }}>
            <XAxis dataKey="name" tickLine={false} />
            <YAxis tickLine={false} orientation="left" />
            <Tooltip {...getTooltipStyles(themeName, 'defaultItems')} />
            <Legend />
            <CartesianGrid />
            <Area
              name="Revenuve / date"
              type="monotone"
              dataKey="sum"
              fill="#4ce1b6"
              stroke="#4ce1b6"
              fillOpacity={0.2}
            />
            <Area name="tickets / date" type="monotone" dataKey="totaltickets" fill="#70bbfd" stroke="#70bbfd" fillOpacity={0.2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Panel>
  );
} 

export default TopsellChart;
