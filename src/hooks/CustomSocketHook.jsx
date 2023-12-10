import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const serverUrl = 'https://acecom-backend-a4ef45372ea4.herokuapp.com/';
const socket = io(serverUrl);
const SENSOR_ID = 1

const CustomSocketHook = () => {
    
    const [temperature, setTemperature] = useState(null);
    const [co2, setCo2] = useState(null);
    const [airquality, setAirQuality] = useState(null);
    const [humidity, setHumidity] = useState(null);
    const [date, setDate] = useState(null);
    const [pressure, setPressure] = useState(null);

    useEffect(() => {
        socket.on(`${SENSOR_ID}/temperature`, (receivedData) => {
            setTemperature(receivedData);
        });

        socket.on(`${SENSOR_ID}/co2`, (receivedData) => {
            setCo2(receivedData);
        });

        socket.on(`${SENSOR_ID}/aq`, (receivedData) => {
            setAirQuality(receivedData);
        });

        socket.on(`${SENSOR_ID}/humidity`, (receivedData) => {
            setHumidity(receivedData);
        });

        socket.on(`${SENSOR_ID}/date`, (receivedData) => {
            setDate(receivedData);
        });
        
        socket.on(`${SENSOR_ID}/pressure`, (receivedData) => {
            setPressure(receivedData);
        });

        return () => {
            socket.off(`${SENSOR_ID}/datos`);
        };
    }, []);

    return {temperature, co2, airquality, humidity, date, pressure};
};

export default CustomSocketHook;