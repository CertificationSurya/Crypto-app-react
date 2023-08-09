import React from 'react'
import { Typography, Table } from 'antd'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import millify from 'millify'
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

import { useGetCryptoExchangesQuery } from '../services/cryptoApi'


const { Title } = Typography


const Exchanges = () => {
  // get Params
  const { coinId } = useParams()
  if (!coinId) {
    return (
      <Title level={4} className='show-more' style={{ textAlign: 'center' }}>
        Choose a currency first. <br /> <Link to="/cryptocurrencies"> Go to <span style={{ textDecoration: 'underline' }}>Cryptocurrencies</span> </Link>
      </Title>
    )
  }

  const { data, isFetching } = useGetCryptoExchangesQuery(coinId)

  // import Loader from './Loader/Loader'
  // if (isFetching) return (<Loader />)

  const dataSource = [];


  // Format data for pushing in dataSource
  if (data) {
    data?.data?.exchanges?.map((value, i) => {
      const volume = value['24hVolume']
      const { name, numberOfMarkets, iconUrl, recommended, uuid } = value

      const formattedData = {
        name: {
          name: name,
          iconUrl,
          i
        },
        markets: numberOfMarkets,
        recommended: recommended ? <CheckCircleOutlined style={{ color: 'green' }} /> : <CloseCircleOutlined style={{ color: 'red' }} />,
        volume: millify(volume),
        uuid
      }

      dataSource.push(formattedData)
    })
  }


  // Defining Column
  const columns = [
    {
      title: 'Details',
      dataIndex: 'name',
      key: 'name',
      render: (nameData) => (
        <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {`${nameData.i + 1}. `}
          <img src={nameData.iconUrl} alt={nameData.name} width="30" height="30" style={{ marginRight: '8px' }} />
          {nameData.name}
        </span>
      ),
    },
    {
      title: '24hVolume',
      dataIndex: 'volume',
      key: 'age',
      className: 'text-center'
    },
    {
      title: 'Markets',
      dataIndex: 'markets',
      key: 'address',
      className: 'text-center'
    },
    {
      title: 'Recommended',
      dataIndex: 'recommended',
      key: 'address',
      className: 'text-center'
    },
  ];

  return (
    <>
      <Title level={5} style={{color: '#2ae'}} className='text-center'> The top crypto exchanges that have been available for trading, ranked by 24h trading volume .</Title>
      <Table dataSource={dataSource} columns={columns} loading={isFetching} rowKey={(record) => record.uuid} scroll={{x: 'max-content'}}/>
    </>
  )
}

export default Exchanges
