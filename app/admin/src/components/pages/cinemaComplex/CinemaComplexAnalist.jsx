import React, { useState, useEffect, useRef } from 'react';
import { Card, CardBody, Col,FormGroup, Label, Input, Button } from 'reactstrap';
import CustomeLineChart from '../../includes/CustomeLineChart';
import IntervalDatePickerField from '../../includes/IntervalDatePickerField';
import {getData, ERROR_CODES, GetOrDelete } from '../../../api';

const defaultData = [
  {
    name: 'Page A', sum: 4000, pv: 2400, totaltickets: 2400,
  },
  {
    name: 'Page B', sum: 3000, pv: 1398, totaltickets: 2210,
  },
  {
    name: 'Page C', sum: 2000, pv: 9800, totaltickets: 2290,
  },
  {
    name: 'Page D', sum: 2780, pv: 3908, totaltickets: 2000,
  },
  {
    name: 'Page E', sum: 1890, pv: 4800, totaltickets: 2181,
  },
  {
    name: 'Page F', sum: 2390, pv: 3800, totaltickets: 2500,
  },
  {
    name: 'Page G', sum: 3490, pv: 4300, totaltickets: 2100,
  },
];

const descriptionKeys = [
  {
    name: "Revenue / date",
    key:"sum",
    stroke: "#4ce1b6"
  },
  {
    name: "Tickets /  date",
    key:"totaltickets",
    stroke: "#70bbfd"
  },
];

const CinemaComplexAnalist = () => {
  
  const [data, setData] = useState(defaultData);
  const [isDisplay, setIsDisplay] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [cinemaComplexsList, setCinemaComplexsList] = useState([]);
  const fromDate = useRef(null);
  const toDate = useRef(null);
  
  useEffect(() => {
    const getCinemaComplexs = async () => {
      const access_token = sessionStorage.getItem("access_token");
      const response = await getData("/cinema-complexes", {
        Authorization: `Bearer ${access_token}`,
      });
      return response;
    };
    getCinemaComplexs().then((response) => {
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
        setCinemaComplexsList(response);
      }
    }).catch(console.error);
  },[isSubmit])

  const getSelectValue = (e) => {
    const  value = e.target.value;
    const newDisplay = value !== "-1";
    setIsDisplay(newDisplay);
    return value;
  }

  const onChange = (startDate, endDate) => {
    console.log(startDate, endDate);
    fromDate.current = fromDate.current !== startDate ? startDate: fromDate.current;
    toDate.current = toDate.current !== endDate ? endDate: toDate.current;
  }

  const handleSubmit = (e) => {
    // api
    const getStatistic = async (valuesObject) => {
      const access_token = sessionStorage.getItem("access_token");
      const response = await GetOrDelete("statistic/cinema-complex", "GET", {
        Authorization: `Bearer ${access_token}`,
      }, valuesObject);
      return response;
    }

    e.preventDefault();
    const form = document.forms["cinema_complex_form"];
    const valuesObject = {
      cinemaComplexId: form["elements"]["cinema_complex"].value,
      startDate: fromDate.current,
      endDate: toDate.current,
    };

    console.log(valuesObject);
    // setValues(valuesObject);

    getStatistic(valuesObject).then((response) => {
      if(ERROR_CODES.includes(data.statusCode)) {
        alert(data.message);
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
        setIsSubmit(isSubmit => !isSubmit);
      }
    }).catch(console.error);

  }

  return (
    <Col xs={12}>
      <Card>
        <CardBody>
          <div className="card__title">
            <h5 className="bold-text">Cinema complex statistic</h5>
          </div>
          <form method="get" name="cinema_complex_form" id="cinema_complex_form" className="form w-100 d-flex align-items-center justify-content-between mb-3" onSubmit={handleSubmit}>
            <div className="form__field d-flex align-items-center">
              <FormGroup className="form__form-group-input-wrap me-3">
                <Label for="cinema_complex_select" className="form__input_select  mb-2">Select Cinema Complex</Label>
                <Input type="select" className="react-select__control react-select__input form__input_select" name="cinema_complex" id="cinema_complex_select" onChange={getSelectValue}>
                  <option value="-1"  selected>Select Cinema complex</option>
                  {
                    cinemaComplexsList.map(item => (
                      <option value={item.id}>{item.name}</option>
                    ))
                  }
                </Input>
              </FormGroup>
              <FormGroup className={`${isDisplay ? 'd-block' : 'd-none'}`}>
                <Label className="cinema_complex_date_select form__input_select mb-2">Select range of date</Label>
                <IntervalDatePickerField onChange={onChange} />
              </FormGroup>
            </div>
            <Button type="submit" color="primary" className={`mb-0 mt-3 ${isDisplay ? "": 'disabled'}`}>
              statistic
            </Button>
          </form>
          <div dir="ltr" className={`${isDisplay ? "": "d-none"}`}>
            <CustomeLineChart data={data} descriptionKeys={descriptionKeys}/>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
}

export default CinemaComplexAnalist;