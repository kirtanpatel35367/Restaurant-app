import React from 'react'
import delivery_photo from "../img/bike_delivery.png"
import home_img from "../img/home_img.png"


const HomeContainer = () => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 '>
            <div className='py-2 flex items-start flex-col justify-center gap-4'>
                <div className='px-4 py-1 flex items-center justify-center bg-orange-200 rounded-full cursor-pointer drop-shadow-lg'>
                    <p className='text-base font-semibold text-orange-400'>Bike Delivery</p>
                    <div className='w-7 h-7 bg-white rounded-full overflow-hidden'>
                        <img src={delivery_photo} alt="Delivery Boy" />
                    </div>
                </div>

                <p className='text-[1.8rem]  md:text-[3.8rem] font-bold'>Delicious Meals Delivered to <span className='text-DarkOrange'>Your Doorstep!</span></p>
                <p className='font-light text-justify md:text-[1rem]'>Welcome to our food delivery platform, where convenience meets flavor. Explore a wide range of cuisines, from local favorites to global delights, all crafted with care by top chefs.</p>

                <button
                    type="button"
                    className="w-full md:max-w-lg bg-gradient-to-br from-orange-400 to-DarkOrange text-white font-semibold px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                    Place Your Order
                </button>
            </div>


            <div className=''>
                <div className='flex items-center justify-center '>
                    <img src={home_img} alt="" />
                </div>
            </div>


        </div>
    )
}

export default HomeContainer
