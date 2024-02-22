import React, { useEffect, Fragment } from 'react';
import 'nprogress/nprogress.css'
import Nprogress from "nprogress";

const NProgress: React.FC = () => {
  useEffect(() => {
    Nprogress.start()
    return () => {
        Nprogress.done()
    }
  }, [])
  return (
    <Fragment />
  );
};

export default NProgress;