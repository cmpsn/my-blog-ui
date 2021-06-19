import { useState, useEffect } from 'react';

// ==== Slider Items Component
const SliderItem = ({ children, id, selectedKey }) => {
  
  const show = (id === selectedKey);

  return (
    <div className={`flex justify-center ${show ? 'opacity-100 transition-all duration-0 ease-in-out' : 'opacity-0 h-0'}`}>
      {children}
    </div>
  );
}

// ==== Slider Dots Component
const DotIcon = ({ selected }) => {
  const activeColor = "rgba(124, 58, 237, 1)";
  const inactiveColor = "rgba(196, 181, 253, 1)";
  const fillColor = selected ? activeColor : inactiveColor;

  return (
    <svg 
      className="mx-2 xl:mx-1 xl:px-1 animate-pulse" 
      width="22px" 
      aria-hidden="true" 
      focusable="false" 
      data-prefix="fas" 
      data-icon="circle" 
      role="button" 
      xmlns="https://www.w3.org/2000/svg" 
      viewBox="0 0 512 512"
      >
        <path 
          fill={fillColor} 
          d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z" 
        />
    </svg>
  );
}

// ==== Slider Container Component
const Slider = ({ children, time }) => {

  const [index, setIndex] = useState(0);
  const keys = children.map((child, idx) => idx);

  useEffect(() => {
    const interval = setInterval(() => {
      const newIndex = (index + 1) % keys.length;
      setIndex(newIndex);
    }, time);

    return () => clearInterval(interval);
  });

  // Handle slider Items
  const _sliderItems = () => {
    return children.map((child, idx) => (
      <SliderItem key={idx} id={idx} selectedKey={index}>
        {child}
      </SliderItem>
    ));
  }

  // Handle Dots functionality
  const _sliderDots = () => {
    return keys.map(key => (
      <span key={key} onClick={() => setIndex(key)}>
        {<DotIcon selected={key === index} />}
      </span>
    ));
  }

  // Render slides and dots
  return (
    <div className="py-6 mx-3 flex justify-center">
      <div className="w-full grid grid-flow-row auto-rows-max">
        <div>
          { _sliderItems() }
        </div>

        <div className="flex justify-center mt-4">
          { _sliderDots() }
        </div>
      </div>
    </div>
  );
};

export default Slider;
