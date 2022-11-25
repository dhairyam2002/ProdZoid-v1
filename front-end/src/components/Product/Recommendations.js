import React, { useEffect, useState } from 'react';
import ItemsCarousel from 'react-items-carousel';
import Product from '../Home/Product';
import CarouselCard from './CarouselCard'
import "./CarouselCard.css";

const Recommendations = ({ category }) => {

    const [activeItemIndex, setActiveItemIndex] = useState(0);
    const chevronWidth = 40;

    const [recProducts, setRecProducts] = useState({products : []});

    useEffect(()=>{
        fetch(`/api/v1/categories?category=${category}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((data) => data.json()).then((products) => setRecProducts(products))
    }, [category])

    return (
        <div style={{ padding: `0 ${chevronWidth}px` }}>
            <h5 className='rec-heading'>More from {category + " > "}</h5>
            <ItemsCarousel
                infiniteLoop
                requestToChangeActive={setActiveItemIndex}
                activeItemIndex={activeItemIndex}
                numberOfCards={3}
                gutter={20}
                leftChevron={<button>{'<'}</button>}
                rightChevron={<button>{'>'}</button>}
                outsideChevron
                chevronWidth={chevronWidth}
            >
                {recProducts.products.map((product) => {
                    return (
                        <div style={{padding: '30px'}}><CarouselCard product={product} /></div>
                    )
                })}
            </ItemsCarousel>
        </div>
    );
};

export default Recommendations