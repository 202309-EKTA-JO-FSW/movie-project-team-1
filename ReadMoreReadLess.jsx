import React, { useState, useEffect } from 'react';

const ReadMoreReadLess = ({ text, maxLength , movieName}) => {
  const [isTruncated, setIsTruncated] = useState(true);

  useEffect(()=>{
    setIsTruncated(true);
  },[movieName])

  const toggleTruncate = () => {
    setIsTruncated(!isTruncated);
  };

  return (
    <div>
      { text.length > maxLength ?(
      isTruncated ? (
        <>
          {text.slice(0, maxLength)}
          <span onClick={toggleTruncate} style={{ color: 'black', cursor: 'pointer' , fontWeight: 'bold'}}>
            {' '}
            Read more...
          </span>
        </>
      ) : (
        <>
          {text}
          <span onClick={toggleTruncate} style={{ color: 'black', cursor: 'pointer', fontWeight: 'bold' }}>
            {' '}
            ...Read less
          </span>
        </>
      ))
      :<span>{text}</span>}
    </div>
  );
};

export default ReadMoreReadLess;