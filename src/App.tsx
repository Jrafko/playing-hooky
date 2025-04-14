import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Reducer from './state/Reducer';
import UseContext from './state/UseContext';
import UseId from './domInteraction/UseId';
import UseImperativeHandle from './domInteraction/UseImperativeHandle';
import UseRef from './domInteraction/UseRef';
import UseCallback from './perfomance/UseCallback';
import UseDeferredValue from './perfomance/UseDeferredValue';
import UseMemo from './perfomance/UseMemo';
import UseOptimistic from './perfomance/UseOptimistic';
import UseTransition from './perfomance/UseTransition';
import LayoutEffect from './sideEffects/LayoutEffect';
import UseInsertionEffect from './sideEffects/UseInsertionEffect';
import UseDebugValue from './debugging/UseDebugValue';
import UseSyncExternalStore from './debugging/UseSyncExternalStore';
import Boxes from './boxes/Boxes';
import Debounce from './debounce/Debounce';
import Counter from './Counter';
import RefPractice from './refPractice/RefPractice';
import LazyLoad from './lazyLoad/LazyLoad';

const formConfig = [
	{ name: "username", label: "Username", type: "text" },
	{ name: "age", label: "Age", type: "number" },
	{ name: "subscribe", label: "Subscribe to newsletter", type: "checkbox" }
  ];

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
			<Route path="/use-reducer" element={<Reducer/>}/>
			<Route path='/use-context' element={<UseContext/>}/>

		  	<Route path='/use-id' element={<UseId/>}/>
			<Route path='/use-imperative-handle' element={<UseImperativeHandle/>}/>
			<Route path='/use-ref' element={<UseRef/>}/>

			<Route path='/use-callback' element={<UseCallback/>}/>
			<Route path='/use-deffered-value' element={<UseDeferredValue/>}/>
			<Route path='/use-memo' element={<UseMemo/>}/>
			<Route path='/use-optimistic' element={<UseOptimistic/>}/>
			<Route path='/use-transition' element={<UseTransition/>}/>

			<Route path='/use-layout-effect' element={<LayoutEffect/>}/>
			<Route path='/use-insertion-effect' element={<UseInsertionEffect/>}/>

			<Route path='/use-debug-value' element={<UseDebugValue/>}/>
			<Route path='/use-sync-external-store' element={<UseSyncExternalStore/>}/>

			<Route path='/boxes' element={<Boxes/>}/>

			<Route path='/debounce' element={<Debounce/>}/>

			<Route path='/counter' element={<Counter/>}/>

			<Route path='/ref-practice' element={<RefPractice formConfig={formConfig}/>}/>

			<Route path='/lazy-load' element={<LazyLoad/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
