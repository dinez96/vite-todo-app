import React from 'react';
import TaskNest from './components/TaskNest';

const App = () => {
  return (
    <div className='bg-gradient-to-br from-zinc-800 to-zinc-600 grid py-6 min-h-screen text-white'>
      <TaskNest />
    </div>
  );
};

export default App;