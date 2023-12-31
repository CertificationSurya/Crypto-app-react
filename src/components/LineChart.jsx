import React from 'react'
import { Col, Row, Typography } from 'antd'

// Chartjs
import { Line } from 'react-chartjs-2';
import{
    Chart as ChartJS,
    LineElement,
    CategoryScale, // x axis
    LinearScale, // y axis
    PointElement,
} from 'chart.js'

// registering Chartjs
ChartJS.register(
    LineElement,
    LinearScale,
    CategoryScale, 
    PointElement
)

const { Title } = Typography

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
    const coinPrice = [];
    const coinTimestamp = [];

    for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
        coinPrice.push(coinHistory?.data?.history[i].price);
    }

    for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
        coinTimestamp.push(new Date(coinHistory?.data?.history[i].timestamp).toLocaleDateString());
    }




    const data = {
        labels: coinTimestamp,
        datasets: [
            {
                labels: 'Price In USD',
                data: coinPrice,
                fill: false,
                backgroundColor: '#0071bd',
                borderColor: '#0071bd',
                borderWidth: 3,
                tension: 0.1,
                pointRadius: 0.75
            },
        ],
    };

    const options = {
        plugins: {
            legend: true
        },
        scales:{
            y:{
                ticks:{
                    beginAtZero: true,
                }
            }
        }
    }

    return (
        <>
            <Row className="chart-header">
                <Title level={2} className="chart-title">{coinName} Price Chart </Title>
                <Col className="price-container">
                    <Title level={5} className="price-change">Change: {coinHistory?.data?.change}%</Title>
                    <Title level={5} className="current-price">Current {coinName} Price: $ {currentPrice}</Title>
                </Col>
            </Row>
            <Line data={data} options={options} />
        </>
    );
};

export default LineChart
