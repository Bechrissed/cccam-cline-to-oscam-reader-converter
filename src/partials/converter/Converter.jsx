import React from 'react';
import './Converter.css';

export function Converter() {
     const clineRef = React.useRef(null);
     const oscamRef = React.useRef({
          value: 0,
     });

     const enable = '1';
     const group = '1';
     const caid = '0604';
     const cccVersion = '2.3.2';
     const keepAlive = '1';
     const inactivitytimeout = '30';

     const convertLines = () => {
          let oscamConfig = '';
          const cLines = clineRef.current.value.split(/\r?\n/);

          cLines.forEach((cLine, index) => {
               const cLineArray = cLine.split(' ');

               const oscamReader = `
[reader]
label                  = ${cLineArray[1]} ${cLineArray[3]}
description            = ${cLineArray[1]} ${cLineArray[3]}
enable                 = ${enable}
protocol               = cccam
device                 = ${cLineArray[1]},${cLineArray[2]}
user                   = ${cLineArray[3]}
password               = ${cLineArray[4]}
cccversion             = ${cccVersion}
group                  = ${group}
caid                   = ${caid}
inactivitytimeout      = ${inactivitytimeout}
keepAlive              = ${keepAlive}

`;
               oscamConfig = oscamConfig + oscamReader;
          });

          oscamRef.current.value = oscamConfig;
     };

     return (
          <>
               <section className="converter">
                    <div className="ccc-wrapper">
                         <form className="ccc-paper" method="get" action="">
                              <div className="ccc-margin">
                                   Title:{' '}
                                   <input
                                        className="ccc-title"
                                        type="text"
                                        name="title"
                                        placeholder="Cccam c-line to Oscam reader converter"
                                   />
                              </div>
                              <textarea
                                   ref={clineRef}
                                   className="ccc-text"
                                   placeholder="Paste c-line(s) here..."
                                   id="clines"
                                   name="clines"
                              />
                              <br />
                              <button
                                   onClick={convertLines}
                                   className="ccc-button"
                                   type="button"
                                   value="Convert"
                              />
                              <textarea
                                   ref={oscamRef}
                                   className="ccc-text ccc-textOscam"
                                   placeholder="Waiting...."
                                   id="clines"
                                   name="clines"
                              />
                         </form>
                    </div>
               </section>
          </>
     );
}
export default Converter;
