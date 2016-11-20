import React from 'react';
import { VictoryLine, VictoryChart } from 'victory';
import './metricsContainer.css';
import {Tabs, Tab} from 'material-ui/Tabs';

const arrayOfValues = (readings) => readings.map((reading) => reading.value)
                                            .filter((value) => typeof value === 'number');
const sumReducer = (a, b) => a + b;
const filterReadingsByType = (readings, type) => readings.filter((reading) => reading.type === type);
const getAverage = (collection) => collection.reduce(sumReducer, 0) / collection.length;
const getMax = (collection) => Math.max(...collection);
const getMin = (collection) => Math.min(...collection);

export const MetricsContainer = ({readings}) => {
  const metrics = getMetrics(readings);
  const temps = filterReadingsByType(readings, 'temperature');
  const hum = filterReadingsByType(readings, 'humidity');
  const airquality = filterReadingsByType(readings, 'airquality');

  return (
    <Tabs>
      <Tab label="Temperature" >
        <MetricDisplay measure={metrics.temperature} />
        <ChartDisplay readings={temps} />
      </Tab>
      <Tab label="Humidity" >
        <MetricDisplay measure={metrics.humidity} />
        <ChartDisplay readings={hum} />
      </Tab>
      <Tab label="Air Quality" >
        <MetricDisplay measure={metrics.airquality} />
        <ChartDisplay readings={airquality} />
      </Tab>
    </Tabs>
  )
}

const MetricDisplay = ({ measure }) => {
  return (
    <div className="measure-text-container">
    {
      measure ?
        <div>
          <span> <span className="measure-name">Average</span> {Math.round(measure.average * 100) / 100} </span>
          <span> <span className="measure-name">Max</span> {measure.max} </span>
          <span> <span className="measure-name">Min</span> {measure.min} </span>
        </div> :
        <span>No data</span>
    }
    </div>
  )
}

const ChartDisplay = ({readings}) => {
  return (
    <div>
      {
        readings.length > 1 ?
        <div className="chart-container">
          <VictoryChart>
            <VictoryLine
              data={readings}
              y={(datum) => datum.value}
            />
          </VictoryChart>
        </div> : readings.length === 1 ?
          <span className="single-data-point">Only one data point. Two data points required to render chart.</span> :
          null
      }
    </div>
  )
}

function getCalculations(readings) {
  return {
    average: getAverage(readings),
    max: getMax(readings),
    min: getMin(readings)
  }
}

function getMetrics(readings) {
  const temperatureReadings = arrayOfValues(filterReadingsByType(readings, 'temperature'));
  const humidityReadings = arrayOfValues(filterReadingsByType(readings, 'humidity'));
  const airQualityReadings = arrayOfValues(filterReadingsByType(readings, 'airquality'));

  const temperatureMetrics = temperatureReadings.length ? {
    temperature: getCalculations(temperatureReadings)
  } : {};

  const humidityMetrics = humidityReadings.length ? {
    humidity: getCalculations(humidityReadings)
  } : {};

  const airQualityMetrics = airQualityReadings.length ? {
    airquality: getCalculations(airQualityReadings)
  } : {};

  return Object.assign({}, temperatureMetrics, humidityMetrics, airQualityMetrics);
}
