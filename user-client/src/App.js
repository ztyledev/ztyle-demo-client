import { Suspense } from 'react';
///components

import Index from './routes';


///style
import './vendor/bootstrap-select/dist/css/bootstrap-select.min.css';
import './vendor/datatables/css/dataTables.min.css';
import './css/style.css';


function App() {
  return (
    <div className="vh-100">
                <Suspense fallback={
                    <div id="preloader">
                        <div className="sk-three-bounce">
                            <div className="sk-child sk-bounce1"></div>
                            <div className="sk-child sk-bounce2"></div>
                            <div className="sk-child sk-bounce3"></div>
                        </div>
                    </div>
                  }
                >
        <Index />
        
      </Suspense>
    </div>
      
  );
}

export default App;
