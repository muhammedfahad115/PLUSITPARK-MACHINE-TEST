import React, { useState } from 'react';

function ItemsList({ array }) {
  const [expandedDescriptions, setExpandedDescriptions] = useState({});

  const toggleDescription = (itemId) => {
    setExpandedDescriptions(prevState => ({
      ...prevState,
      [itemId]: !prevState[itemId]
    }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center mt-24">
      {array.map(item => (
        <div key={item.id} className="max-w-xs rounded-xl overflow-hidden shadow-lg shadow-gray-300">
          <img src={item.image} alt={item.title} className="w-full hover:scale-105 transition duration-300 h-auto" style={{ maxHeight: '200px' }} />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{item.title}</div>
            <p className="text-gray-700 text-base">
              {expandedDescriptions[item.id] ? item.description : `${item.description.slice(0, 100)}...`}
              {!expandedDescriptions[item.id] && (
                <button onClick={() => toggleDescription(item.id)} className="text-blue-500 hover:text-blue-700 focus:outline-none">Read More</button>
              )}
            </p>
            <br />
            <p className="text-gray-700 text-base">
              Category: {item.category}
              <br />
              Price: ${item.price}
            </p>
          </div>
          <div className="px-6 py-4">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
              Rating: {item.rating.rate} ({item.rating.count} reviews)
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ItemsList;
