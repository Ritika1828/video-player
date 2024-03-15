import Layout from './components/Layout'
import Header from './components/Header'
import VideoContentBody from './components/VideoContentBody'
import "./global.css";
import Example from './Example';
import { useEffect } from 'react';
import * as amplitude from '@amplitude/analytics-browser';

function App() {
  useEffect(()=>{
     amplitude.init("9ef4d8211b61b9ef107600a54ef205c8");
  },[])
  return (
    <Layout>
      <Example/>
      {/* <Header />
      <VideoContentBody /> */}
    </Layout>
  );
}

export default App;
