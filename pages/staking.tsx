import React from 'react';
import dynamic from 'next/dynamic';
// import Staking from '../components/Staking';

const StakingComponentWithNoSSR = dynamic(() => import('../components/Staking'), { ssr: false });

const StakingPage = () => {
  return (
    <div>
      <StakingComponentWithNoSSR />
    </div>
  );
};

export default StakingPage;
