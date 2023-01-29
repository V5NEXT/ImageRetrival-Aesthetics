import React from 'react'

const ItemCard = ({product}) => {
  return (
<div className="max-w-sm rounded overflow-hidden shadow-lg relative">
            <div className="px-6 py-4  w-64 h-64 ml-5 content-centerabsolute">
            <div className="font-bold text-sm mb-2">Image belongs to Cluster : {product?.cluster}</div>

                <img className=" top-0 left-0 h-full w-full object-cover" src={product?.image} alt="cluster image"/>

            </div>
        </div>
  )
}

export default ItemCard