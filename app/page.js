"use client";

import Head from 'next/head';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Overview from '@/components/Overview';
import Steps from '@/components/Steps';
import SuccessStories from '@/components/SuccessStories';
import Features from '@/components/Features';


import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);


export default function Page() {
  return (
    <>
      <Head>
        <title>اثمار</title>
        <meta name="description" content="خطة لتعزيز المهارات وتحسين نمط الحياة خلال 100 يوم" />
      </Head>
      <Header />
      <Hero />
      <Overview />
      <Steps />
      <SuccessStories />
      <Features />

    </>
  );
}
