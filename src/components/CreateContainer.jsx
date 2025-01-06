import React, { useState } from "react";
import { IoFastFoodSharp, IoCloudUploadOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import { categories } from "../utils/data";
import { MdDeleteSweep, MdFoodBank } from "react-icons/md";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { ref, getDownloadURL, uploadBytesResumable, deleteObject } from "firebase/storage";
import { storage } from "../firebase.config";
import Loader from "./Loader";

const CreateContainer = () => {
  const [title, setTitle] = useState("");
  const [calories, setCalories] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);
  const [fields, setFields] = useState(false);
  const [alertStatus, setAlertStatus] = useState("danger");
  const [msg, setMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const uploadImage = (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0];
    const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        console.error("Error while uploading:", error);
        setFields(true);
        setMsg("Error while uploading. Please try again.");
        setAlertStatus("danger");
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setImageAsset(downloadURL);
        setIsLoading(false);
        setUploadProgress(0);
        setFields(true);
        setMsg("Image uploaded successfully!");
        setAlertStatus("success");
        setTimeout(() => {
          setFields(false);
        }, 4000);
      }
    );
  };

  const deleteImage = () => {
    setIsLoading(true)
    const deleteRef = ref(storage, imageAsset);
    deleteObject(deleteRef).then(() => {
      setImageAsset(null);
      setIsLoading(false)
      setFields(true);
      setMsg("Image Deleted successfully!");
      setAlertStatus("success");
      setTimeout(() => {
        setFields(false);
      }, 4000);
    })
  };

  const saveDetails = () => {
    try {
      if (!title || !calories || !imageAsset || !price || !category) {
        setFields(true)
        setMsg("Fill Required Fields")
        setAlertStatus("danger")
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      }
      else{
        const data = {
          id:`${Date.now()}`,
          title:title,
          category:category,
          calories:calories,
          quantity:1,
          price:price
        }
      }

    } catch (error) {
      console.error("Error while uploading:", error);
      setFields(true);
      setMsg("Error while uploading. Please try again.");
      setAlertStatus("danger");
      setTimeout(() => {
        setFields(false);
        setIsLoading(false);
      }, 4000);
    }
  };

  return (
    <>
      <div className="w-full min-h-screen flex items-center justify-center box-border">
        <div className="w-[90%] md:w-[75%] max-w-screen border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center">
          {fields && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`w-full p-2 rounded-lg text-center ${alertStatus === "danger"
                ? "bg-red-500 text-red-300"
                : "bg-green-500 text-teal-900"
                } font-semibold`}
            >
              {msg}
            </motion.p>
          )}

          <div className="w-full py-2 border-b border-gray-300 flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex items-center gap-2 w-full">
              <IoFastFoodSharp className="text-xl text-gray-700" />
              <input
                type="text"
                required
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                placeholder="Your Title.."
                className="w-full h-full text-lg bg-transparent font-semibold border-none placeholder:text-gray-300 text-gray-600 shadow-[0_4px_6px_rgba(255,255,255,0.5)] focus:outline-none focus:border-transparent"
              />
            </div>
          </div>

          <div className="w-full mt-2">
            <select
              onChange={(e) => setCategory(e.target.value)}
              className="w-full text-base border border-gray-100 rounded-lg p-2 outline-none capitalize bg-slate-100 text-headingColor"
            >
              <option value="other" className="bg-white outline-none">
                Select Category
              </option>
              {categories &&
                categories.map((item) => (
                  <option
                    key={item.id}
                    className="text-base border-none outline-none capitalize bg-white text-headingColor"
                    value={item.urlParamName}
                  >
                    {item.name}
                  </option>
                ))}
            </select>
          </div>

          <div className="group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-225 md:h-420 cursor-pointer rounded-lg mt-2">
            {isLoading ? (
              <>
                <Loader />
                <p className="text-center text-gray-500 mt-2">
                  Uploading: {Math.round(uploadProgress)}%
                </p>
              </>
            ) : (
              <>
                {!imageAsset ? (
                  <label
                    htmlFor="uploadimage"
                    className="w-full h-full flex flex-col items-center justify-center cursor-pointer"
                  >
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                      <IoCloudUploadOutline className="text-gray-400 text-3xl hover:text-gray-600" />
                      <p className="text-gray-400 ">Click here to upload</p>
                    </div>
                    <input
                      id="uploadimage"
                      type="file"
                      name="uploadimage"
                      accept="image/*"
                      onChange={uploadImage}
                      className="w-0 h-0"
                    />
                  </label>
                ) : (
                  <div className="relative h-full">
                    <img
                      src={imageAsset}
                      alt="uploaded image"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      className="absolute bottom-3 right-3 p-3 rounded-full bg-red-600 text-xl cursor-pointer outline-none hover:shadow-md duration-500 trasition-all ease-in-out"
                      onClick={deleteImage}
                    >
                      <MdDeleteSweep className="text-white" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="w-full flex flex-col md:flex-row items-center gap-3 mt-2">
            <div className="w-full py-2 border-b border-gray-400 flex items-center gap-2">
              <MdFoodBank className="text-gray-700 text-3xl" />
              <input
                type="text"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                placeholder="Calories"
                className="w-full h-full text-lg bg-transparent font-semibold outline-none border-none placeholder:text-gray-300"
              />
            </div>
            <div className="w-full py-2 border-b border-gray-400 flex items-center gap-2">
              <RiMoneyRupeeCircleFill className="text-gray-700 text-3xl" />
              <input
                type="text"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full h-full text-lg bg-transparent font-semibold outline-none border-none placeholder:text-gray-300"
              />
            </div>
            <button
              className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-orange-400 px-10 py-2 rounded-lg text-lg text-white font-semibold"
              onClick={saveDetails}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateContainer;
