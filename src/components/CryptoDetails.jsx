import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import millify from 'millify';

import { Col, Row, Typography, Select, Button, Space } from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';

const { Title, Text } = Typography
const { Option } = Select;

// hook for crypto detail
import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from "../services/cryptoApi"
import LineChart from './LineChart'
import Loader from './Loader/Loader';




const CryptoDetails = () => {
  const { coinId } = useParams()
  const [timeperiod, setTimeperiod] = useState('7d');
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId)
  const { data: coinHistory } = useGetCryptoHistoryQuery({ coinId, timeperiod })

  const cryptoDetails = data?.data?.coin;

  if (isFetching) return <Loader />

  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

  const stats = [
    { title: 'Price to USD', value: `$ ${cryptoDetails.price && millify(cryptoDetails.price)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: cryptoDetails.rank, icon: <NumberOutlined /> },
    { title: '24h Volume', value: `$ ${cryptoDetails['24hVolume'] && millify(cryptoDetails['24hVolume'])}`, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: `$ ${cryptoDetails.marketCap && millify(cryptoDetails.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${millify(cryptoDetails.allTimeHigh.price)}`, icon: <TrophyOutlined /> },
  ];

  const genericStats = [
    { title: 'Number Of Markets', value: cryptoDetails.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: cryptoDetails.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Aprroved Supply', value: cryptoDetails.supply.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `$ ${millify(cryptoDetails.supply.total)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${millify(cryptoDetails.supply.circulating)}`, icon: <ExclamationCircleOutlined /> },
  ];

  return (
    <Col className="coin-detail-container">

      <Col className="coin-heading-container">
        <Title level={2} className='coin-name'>
          {cryptoDetails.name} ({cryptoDetails.symbol}) Price
        </Title>

        <p>
          {cryptoDetails.name} Live price in Us dollars.
          View value statistics, market cap and supply
        </p>
      </Col>

      <div className="coin-options">
        <Select defaultValue='7d' className="select-timeperiod" placeholder="Select Timeperiod" onChange={(value) => setTimeperiod(value)}>
          {time.map((date) => <Option key={date}>{date}</Option>)}
        </Select>

        {/* For exchanges in different platforms */}
        <Link to={`/exchanges/${cryptoDetails.uuid}`} className="select-exchanges">
          <Space>
            <Button type="primary">View All Exchanges on Different Platform </Button>
          </Space>
        </Link>
      </div>


      {/* line Chart */}
      <LineChart coinHistory={coinHistory} currentPrice={millify(cryptoDetails.price)} coinName={cryptoDetails.name} />

      <Col className="stats-container">

        {/* particular coin stats */}
        <Col className="coin-value-statistics">
          <Col className="coin-value-statistics-heading">

            <Title level={3} className="coin-details-heading">
              {cryptoDetails.name} Value Statistics
            </Title>
            <p>
              An Overview showing the stats of {cryptoDetails.name}
            </p>

          </Col>

          {stats.map(({ icon, title, value }) => (
            <Col className="coin-stats">

              <Col className='coin-stats-name'>
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>

              <Text className='stats'> {value} </Text>

            </Col>
          ))}

        </Col>

        {/* Total market and supply stats */}
        <Col className="other-stats-ingo">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">
              Other Statistics
            </Title>
            <p>
              An Overview showing the stats of {cryptoDetails.name}'s Total market and supply
            </p>

          </Col>

          {genericStats.map(({ icon, title, value }) => (
            <Col className="coin-stats" key={title}>

              <Col className='coin-stats-name'>
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>

              <Text className='stats'> {value} </Text>

            </Col>
          ))}

        </Col>
      </Col>

      <Col className="coin-desc-link">
        <Row className="coin-desc">

          <Title level={3} className="coin-details-heading">
            What is {cryptoDetails.name}?
            <p>{cryptoDetails.description}</p>
          </Title>
        </Row>

        <Col className="coin-links">
          <Title level={3} className='coin-details-heading'>
            {cryptoDetails.name} Links
          </Title>

          {cryptoDetails.links.map((link) => (

            <Row className="coin-link" key={link.name}>
              <Title level={5} className='link-name'>
                {link.type}
              </Title>

              {/*Using rel="noreferrer" is a security and privacy measure to prevent the linked website from knowing the exact page that the user came from.  */}
              <a href={link.url} target="_blank" rel='noreferer'>{link.name}</a>
            </Row>

          ))}
        </Col>

      </Col>

    </Col>
  )
}

export default CryptoDetails
