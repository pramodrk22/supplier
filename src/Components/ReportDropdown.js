import React, { useState, useRef, useEffect, useMemo, useCallback} from 'react';
import { render } from 'react-dom';
//import './ReportDropdown.css';

import eye from '../Assets/eye.png';
import slogo from '../Assets/sonata-logo.png';



const ReportDropdown = ({param}) => {
    // const [isOpen, setIsOpen] = useState(false);

    // const handleClick = ()=> {
    //     return setIsOpen(!isOpen)
    // }
    
    // const btnClick = (e)=> {
    //     console.log('e is', e);
    // }




    // const availableButtons = ['RM report', 'Button 2', 'Button 3'];
    // const selectedButton = param.value;
    // const onClick = (event) => {
    //  alert(`You clicked ${event.target.value}`);
    // };
 
 

 return (
   <div>
        <select >
            <option value="RM">RM </option>
            <option value="Finished Goods">Finished Goods </option>
            <option value="Quality">Quality </option>
            <option value="Insurance">Insurance </option>
        </select>


        {/* <div className='dropdown'>
            <p>
                <p onClick={handleClick} className='dropdown_toggle'>
                    dropdown 
                </p>
            </p>
            
            {isOpen && (
                <div className='dropdown_menu'>
                   
                   <select >
                        <option >
                            <div> <p > RM report <img  src={eye} /> </p></div>
                        </option>
                        <option >
                            <div> <p > rep <img  src={eye} /> </p></div>
                        </option>
                        <option >
                            <div> <p > rep2 <img  src={eye} /> </p></div>
                        </option>
                    </select>
                   
                 </div>
            )}

        </div> */}

        {/* <select onChange={onClick} value={selectedButton}>
            {availableButtons.map((button) => (
            <option key={button} value={button}>
                <button>{button}</button>
                
                <img  src={eye} />
            </option>
            ))}
        </select> */}
    
        
   </div>
 );
};




export default ReportDropdown;

// function buttonCellRenderer(params) {
//      const availableButtons = ['Button 1', 'Button 2', 'Button 3'];
//      const selectedButton = params.value;
//      const onClick = (event) => {
//        alert(`You clicked ${event.target.value}`);
//      };
//      return (
//     <select onChange={onClick} value={selectedButton}>
//          {availableButtons.map((button) => (
//     <option key={button} value={button}>
//     <button>{button}</button>
//     </option>
//          ))}
//     </select>
//      );
//     }