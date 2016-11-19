import React from 'react';
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
  return (
    <Tabs>
      <Tab label="Temperature" >
        <MetricDisplay measure={metrics.temperature} />
      </Tab>
      <Tab label="Humidity" >
        <MetricDisplay measure={metrics.humidity} />
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

  const temperatureMetrics = temperatureReadings.length ? {
    temperature: getCalculations(temperatureReadings)
  } : {};

  const humidityMetrics = humidityReadings.length ? {
    humidity: getCalculations(humidityReadings)
  } : {};

  return Object.assign({}, temperatureMetrics, humidityMetrics);
}
