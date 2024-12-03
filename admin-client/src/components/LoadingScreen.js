import React from 'react';
import ReactLoading from 'react-loading';

const LoadingScreen = () => {
  return (
    <>
      <div className="container h-100 ">
        <div className="row justify-content-center h-100 align-items-center">        
          <div className="col-md-6">                                                          
            <h1>Loading Page ...</h1>                               
            <ReactLoading             
              type={"bars"}             
              color={"#fd7e14"}             
              height={100}             
              width={400}                                           
            />
                                                      
          </div>        
        </div>       
      </div>              
    </>
  );
}

export default LoadingScreen;