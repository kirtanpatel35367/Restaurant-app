import React, { useState } from 'react'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from '../firebase.config.js'
import { FaCartShopping} from "react-icons/fa6"
import { MdAddShoppingCart } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { Link } from 'react-router-dom';
import logo from '../img/logo.png'
import { motion } from 'framer-motion';
import { actionType } from '../context/reducer.js';
import { useStateValue } from '../context/StateProvider.js';
import defaultprofile from '../img/profilepic.png'

const Header = () => {
  const firebaseAuth = getAuth(app)
  const provider = new GoogleAuthProvider();
  const [{ user }, dispatch] = useStateValue();
  const [isMenu, setIsMenu] = useState(false)


  //Login Function
  const login = async () => {
    if (!user) {
      const { user: { refreshToken, providerData } } = await signInWithPopup(firebaseAuth, provider);

      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });

      localStorage.setItem("user", JSON.stringify(providerData[0]));
    }
    else {
      setIsMenu(!isMenu)
    }
  };


  //LogOut Function
  const logout = async () => {
    setIsMenu(false)
    localStorage.clear()
    dispatch({
      type: actionType.SET_USER,
      user: null,
    })
  }


  return (
    <header className='w-screen h-auto p-4 px-4 md:px-16 md:p-4 fixed top-0 left-0  bg-white shadow-md z-50'>
      <div className='hidden md:flex w-full h-full justify-between'>
        <Link to={'/'} className='flex items-center gap-2'>
          <img src={logo} alt="Logo" className='w-14 object-cover cursor-pointer' />
        </Link>
        <motion.ul initial={{ opacity: 0, x: 200 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 200 }} className='flex items-center gap-3 ml-auto'>
          <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>Home</li>
          <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>Menu</li>
          <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>Services</li>
          <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>About Us</li>
        </motion.ul>

        <div className='relative flex items-center text-xl ml-4'>
          <FaCartShopping className='cursor-pointer text-textColor hover:text-headingColor' />
          <div className='absolute top-2 -right-1 w-4 h-4 rounded-full bg-cartNumBg flex items-center justify-center'>
            <p className='text-xs text-white font-semibold'>7</p>
          </div>
        </div>

        <div className='relative'>
          <motion.img src={user ? user.photoURL : defaultprofile} alt="profilepic" whileTap={{ scale: 0.8 }} onClick={login} className="w-10 min-w-[40px] h-10 items-center rounded-full cursor-pointer ml-3" />

          {
            isMenu && (
              <motion.div initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }} className='w-40 bg-slate-100 shadow-xl rounded-lg flex flex-col absolute p-3 py-2 cursor-pointer top-12 right-0 gap-2'>
                {user && user.email === 'kp534422@gmail.com' && (
                  <Link to={'./createitem'}>
                    <p onClick={()=>setIsMenu(false)} className='px-4 py-2 flex items-center gap-2 cursor-pointer  hover:bg-slate-400 transition-all duration-100 ease-in-out rounded-lg text-textColor text-base'>
                      New Item<MdAddShoppingCart />
                    </p>
                  </Link>
                )}

                <p onClick={logout} className='px-4 py-2 flex items-center gap-2 cursor-pointer shadow-md bg-slate-300 hover:bg-slate-400 transition-all duration-100 ease-in-out rounded-lg text-textColor text-base'>Log Out<IoIosLogOut /></p>
              </motion.div>
            )

          }

        </div>
      </div>


      <div className='flex md:hidden w-full h-full justify-between items-center'>

        <Link to={'/'} className='flex items-center gap-2'>
          <img src={logo} alt="Logo" className='w-14 object-cover cursor-pointer' />
        </Link>

        <div className='flex'>
          <div className='relative flex items-center text-xl ml-4'>
            <FaCartShopping className='cursor-pointer text-textColor hover:text-headingColor' />
            <div className='absolute  -top-0 -right-1 w-4 h-4 rounded-full bg-cartNumBg flex items-center justify-center'>
              <p className='text-xs text-white font-semibold'>7</p>
            </div>
          </div>

          <div className='relative'>
            <motion.img src={user ? user.photoURL : defaultprofile} alt="profilepic" whileTap={{ scale: 0.8 }} onClick={login} className="w-10 min-w-[40px] h-10 items-center rounded-full cursor-pointer ml-3" />

            {
              isMenu && (
                <motion.div initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }} className='w-40 bg-slate-100 shadow-xl rounded-lg flex flex-col absolute p-3 py-2 cursor-pointer top-12 right-0 gap-2'>
                  {user && user.email === 'kp534422@gmail.com' && (
                    <Link to={'./createitem'}>
                      <p onClick={()=>setIsMenu(false)} className='px-4 py-2 flex items-center gap-2 cursor-pointer hover:bg-slate-300 transition-all duration-100 ease-in-out rounded-lg text-textColor text-base'>
                        New Item<MdAddShoppingCart />
                      </p>
                    </Link>
                  )}

                  <ul className='flex flex-col'>
                    <li onClick={()=>setIsMenu(false)} className='px-4 py-2 text-base text-textColor hover:bg-slate-400 transition-all duration-100 ease-in-out rounded-lg cursor-pointer' >Home</li>
                    <li onClick={()=>setIsMenu(false)} className='px-4 py-2 text-base text-textColor hover:bg-slate-400 transition-all duration-100 ease-in-out rounded-lg cursor-pointer' >Menu</li>
                    <li onClick={()=>setIsMenu(false)} className='px-4 py-2 text-base text-textColor hover:bg-slate-400 transition-all duration-100 ease-in-out rounded-lg cursor-pointer' >Services</li>
                    <li onClick={()=>setIsMenu(false)} className='px-4 py-2 text-base text-textColor hover:bg-slate-400 transition-all duration-100 ease-in-out rounded-lg cursor-pointer' >About Us</li>
                  </ul>

                  <p onClick={() => {
                    logout();
                    setIsMenu(false)
                  }} className='px-4 py-2 flex items-center gap-2 cursor-pointer shadow-md bg-slate-300 hover:bg-slate-4004 transition-all duration-100 ease-in-out rounded-lg text-textColor text-base'>Log Out<IoIosLogOut /></p>
                </motion.div>
              )

            }
          </div>

        </div>
      </div>
    </header>
  )
}

export default Header;
