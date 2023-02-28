import React, { useState, useEffect, useRef } from 'react';
import { Card, CardBody, Col,FormGroup, Label, Input, Button } from 'reactstrap';
import CustomeLineChart from '../../includes/CustomeLineChart';
import IntervalDatePickerField from '../../includes/IntervalDatePickerField';
import {getData, ERROR_CODES, GetOrDelete } from '../../../api';

const defaultData = [
  {
    name: 'Page A', revenue: 4000, totaltickets: 2400,
  },
  {
    name: 'Page B', revenue: 3000, totaltickets: 1398,
  },
  {
    name: 'Page C', revenue: 2000, totaltickets: 9800,
  },
  {
    name: 'Page D', revenue: 2780, totaltickets: 3908,
  },
  {
    name: 'Page E', revenue: 1890, totaltickets: 4800,
  },
  {
    name: 'Page F', revenue: 2390, totaltickets: 3800,
  },
  {
    name: 'Page G', revenue: 3490, totaltickets: 4300,
  },
];

const descriptionKeys = [
  {
    name:"Doanh thu trong ngày",
    key:"revenue",
    stroke: "#4ce1b6"
  },
  {
    name: "Tổng số vé trong ngày",
    key:"totaltickets",
    stroke: "#70bbfd"
  },
];

const MovieAnalist = () => {
  
  const [data, setData] = useState(defaultData);
  const [isDisplay, setIsDisplay] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [movieList, setMovieList] = useState([]);
  // const [values, setValues] = useState({});
  const fromDate = useRef(null);
  const toDate = useRef(null);
  
  useEffect(() => {
    const getMovie = async () => {
      const access_token = sessionStorage.getItem("access_token");
      const response = await getData("/movies", {
        Authorization: `Bearer ${access_token}`,
      });
      return response;
    };
    getMovie().then((response) => {
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
        setMovieList(response);
      }
    }).catch(console.error);
  },[isSubmit]);

  const getSelectValue = (e) => {
    const  value = e.target.value;
    const newDisplay = value !== "-1";
    setIsDisplay(newDisplay);
    return value;
  }

  const onChange = (startDate, endDate) => {
    fromDate.current = fromDate.current !== startDate ? startDate: fromDate.current;
    toDate.current = toDate.current !== endDate ? endDate: toDate.current;
  }

  const handleSubmit = (e) => {
    // api
    const getStatistic = async (valuesObject) => {
      const access_token = sessionStorage.getItem("access_token");
      const response = await GetOrDelete("statistic/movie", "GET", {
        Authorization: `Bearer ${access_token}`,
      }, valuesObject);
      return response;
    }

    e.preventDefault();
    const form = document.forms["movie_form"];
    const valuesObject = {
      movieId: form["elements"]["movie_id"].value,
      startDate: fromDate.current,
      endDate: toDate.current,
    };

    // console.log(valuesObject);

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
          revenue: item.revenue,
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
            <h5 className="bold-text">Movie statistic</h5>
          </div>
          <form method="get" name="movie_form" id="Movie_form" className="form w-100 d-md-flex align-items-center justify-content-between mb-3" onSubmit={handleSubmit}>
            <div className="form__field d-md-flex align-items-center">
              <FormGroup className="form__form-group-input-wrap me-3 mb-3">
                <Label for="movie_select" className="form__input_select me-3">Select Movie</Label>
                <Input type="select" className="react-select__control react-select__input form__input_select" name="movie_id" id="movie_select" onChange={getSelectValue}>
                  <option value="-1"  selected>Select Movie</option>
                  {
                    movieList.map(item => (
                      <option value={item.id}>{item.name}</option>
                    ))
                  }
                </Input>
              </FormGroup>
              <FormGroup className={`${isDisplay ? 'd-block' : 'd-none'}  mb-3`}>
                <Label className="movie_date_select form__input_select mb-2">Select range of date</Label>
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

export default MovieAnalist;