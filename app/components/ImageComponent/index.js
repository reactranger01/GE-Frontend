import React from 'react';
import { useNavigate } from 'react-router-dom';

const wideImages = [
  {
    id: 1,
    src: '/images/evoplay-730-280 (1).gif',
    alt: 'Wide Image 1',
    path: '/page1',
  },
  {
    id: 2,
    src: '/images/aviator-730-280.gif',
    alt: 'Wide Image 2',
    path: '/page2',
  },
  {
    id: 3,
    src: '/images/fungames-730_280.gif',
    alt: 'Wide Image 3',
    path: '/page3',
  },
  {
    id: 4,
    src: '/images/wingogames-730-280.gif',
    alt: 'Wide Image 4',
    path: '/page4',
  },
];

const squareImages = [
  {
    id: 1,
    src: '/images/ab50.webp',
    alt: 'Square Image 1',
    path: '/page5',
  },
  {
    id: 2,
    src: '/images/ak47tp.webp',
    alt: 'Square Image 2',
    path: '/page6',
  },
  {
    id: 3,
    src: '/images/bbb.webp',
    alt: 'Square Image 3',
    path: '/page7',
  },
  {
    id: 4,
    src: '/images/five-boys.webp',
    alt: 'Square Image 4',
    path: '/page8',
  },
  {
    id: 5,
    src: '/images/lankesh.jpeg',
    alt: 'Square Image 5',
    path: '/page9',
  },
  {
    id: 6,
    src: '/images/lucky5.webp',
    alt: 'Square Image 6',
    path: '/page10',
  },
  {
    id: 7,
    src: '/images/lucky15.webp',
    alt: 'Square Image 7',
    path: '/page11',
  },
  {
    id: 8,
    src: '/images/ab50.webp',
    alt: 'Square Image 1',
    path: '/page5',
  },
  {
    id: 9,
    src: '/images/ak47tp.webp',
    alt: 'Square Image 2',
    path: '/page6',
  },
  {
    id: 10,
    src: '/images/bbb.webp',
    alt: 'Square Image 3',
    path: '/page7',
  },
  {
    id: 11,
    src: '/images/five-boys.webp',
    alt: 'Square Image 4',
    path: '/page8',
  },
  {
    id: 12,
    src: '/images/lankesh.jpeg',
    alt: 'Square Image 5',
    path: '/page9',
  },
  {
    id: 13,
    src: '/images/lucky5.webp',
    alt: 'Square Image 6',
    path: '/page10',
  },
  {
    id: 14,
    src: '/images/lucky15.webp',
    alt: 'Square Image 7',
    path: '/page11',
  },
];

const ImageComponent = () => {
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <div className="w-full ml-1 mr-1 pt-12">
      {/* Wide Images Container */}
      <div className="grid grid-cols-4 gap-[0.2vw] ">
        {wideImages.map((image) => (
          <div
            key={image.id}
            className="relative cursor-pointer overflow-hidden"
            onClick={() => handleClick(image.path)}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="h-32 w-full object-fill"
            />
          </div>
        ))}
      </div>

      {/* Square Images Container */}
      <div className="grid grid-cols-7 gap-[0.2vw] mt-[0.2vw] ">
        {squareImages.map((image) => (
          <div
            key={image.id}
            className="relative cursor-pointer overflow-hidden "
            onClick={() => handleClick(image.path)}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full aspect-square object-fill"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageComponent;
