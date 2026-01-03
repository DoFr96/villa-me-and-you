import React from 'react'
import PricingTable from './Cjenik'
const seasons = [
  {
    name: 'Zimska Čarolija',
    period: '10.01 – 30.04',
    weekdayPrice: 190,
    weekendPrice: 210,
    minNights: 2,
    badge: 'Off-Season',
  },
  {
    name: 'Proljetni Bijeg',
    period: '01.05 – 31.05',
    weekdayPrice: 210,
    weekendPrice: 230,
    minNights: 3,
  },
  {
    name: 'Ljetna Idila',
    period: '01.06 – 30.06',
    weekdayPrice: 250,
    weekendPrice: null,
    minNights: 5,
  },
  {
    name: 'Vrhunac Ljeta',
    period: '01.07 – 31.08',
    weekdayPrice: 350,
    weekendPrice: null,
    minNights: 7,
    highlight: true,
    badge: 'Peak Season',
  },
  {
    name: 'Zlatna Jesen',
    period: '01.09 – 30.09',
    weekdayPrice: 250,
    weekendPrice: null,
    minNights: 5,
  },
  {
    name: 'Jesenska Toplina',
    period: '01.10 – 31.10',
    weekdayPrice: 210,
    weekendPrice: 230,
    minNights: 2,
  },
  {
    name: 'Mirna Zima',
    period: '01.11 – 19.12',
    weekdayPrice: 190,
    weekendPrice: 210,
    minNights: 2,
    badge: 'Off-Season',
  },
  {
    name: 'Blagdanska Čarolija',
    period: '20.12 – 09.01',
    weekdayPrice: 230,
    weekendPrice: null,
    minNights: 3,
    highlight: true,
    badge: 'Holidays',
  },
]

export default function PricePage() {
  return <PricingTable seasons={seasons} />
}
