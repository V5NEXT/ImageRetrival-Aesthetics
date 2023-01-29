import React from 'react'

const ItemCard = ({product}) => {
  return (
<div className="max-w-sm rounded overflow-hidden shadow-lg ml-5">
            <img className="w-full" src={product?.image} alt="Sunset in the mountains"/>
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">Image belongs to Cluster : {product?.cluster}</div>
            </div>
        </div>
  )
}

export default ItemCard