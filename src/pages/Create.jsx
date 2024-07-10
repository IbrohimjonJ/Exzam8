import { useEffect, useState } from "react";
import { Form,  useActionData, useNavigate } from "react-router-dom";
import { db } from "../firebase/firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

export const action = async ({ request }) => {
  let formData = await request.formData();
  let title = formData.get("title");
  let images = formData.get("images");
  let time = formData.get("time");
  let Ingredients = formData.get("Ingredients");
  let Method = formData.get("Method");
  let price = formData.get("price");
  let nation = formData.get("nation");
  return { title, images, time, Ingredients, Method, price, nation };
};

function Create() {
  const [images2, setImages2] = useState([]);
  const [images, setImages] = useState("");
  const [Ingredient, setIngredients2] = useState([]);
  const [Ingredients, setIngredients] = useState("");
  const [ingredientError, setIngredientError] = useState("");
  const [imageError, setImageError] = useState("");
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const navigate = useNavigate();
  const [nation, setNation] = useState("Uzbek");
  const [method, setMethod] = useState("");
    const [data2, setdata2] = useState([]);
  const { user } = useSelector((state) => state.user);
    const userData = useActionData();
  useEffect(() => {
    if (userData) {
      
      const newRecipe = {
        title: userData.title,
        images: images2,
        time: userData.time,
        Ingredients: Ingredient,
        Method: userData.Method,
        uid: user.uid,
        price: +userData.price,
        nation: userData.nation,
        createdAT: serverTimestamp(),
      };
      addDoc(collection(db, "Exzam"), newRecipe)
        .then(() => {
          toast.success("New Recipe Added");
          navigate("/");
        })
           }
  }, [userData]);
 
  const Toasteeror = () => {
    toast.error("Iltimos ingrediantlarni 4 ta yozin");
  };
  const PreviewModal = () => {
    const data = {
      title: title,
      images: images2,
      time: time,
      Ingredients: Ingredient,
      Method: method,
      price: +price,
      nation: nation,
    };
    setdata2(data);
  };
  const handleAddIngredient = () => {
    if (Ingredients) {
      if (Ingredient.includes(Ingredients)) {
        setIngredientError("Ingredient already exists in the list.");
      } else {
        setIngredients2((prevList) => [...prevList, Ingredients]);
        setIngredients("");
        setIngredientError("");
      }
    }
  };

  const handleAddImage = () => {
    if (images) {
      if (images2.includes(images)) {
        setImageError("Image already exists in the list.");
      } else {
        setImages2((prevList) => [...prevList, images]);
        setImages("");
        setImageError("");
      }
    }
  };
  return (

    <>
      <img src="./e.webp" alt="img" className="absolute bg-cob w-full h-max" width={1600} />
      <div className=" w-full  flex justify-center h-[500px] absolute ">
        <div>
          <h1 className="text-3xl text-center text-white mt-2">New Retcep</h1>
          <Form method="post" className="sm:w-96 w-72 mt-1">
            <div>
              <h3 className="text-lg text-white ">Title:</h3>
              <input
                required
                className="border w-full border-gray-300 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block mt-2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                placeholder="Enter your meal name"
                name="title"
              />
            </div>
            <div>
              <h3 className="text-lg">Nation:</h3>
              <select
                name="nation"
                className="select select-bordered w-full"
                onChange={(e) => setNation(e.target.value)}
              >
                <option>Uzbek</option>
                <option>Russia</option>
                <option>Turkey</option>
                <option>Europa</option>
                <option>Outher</option>
              </select>
            </div>
            <div>
              <h3 className="text-lg text-white ">Price:</h3>
              <input
                required
                className="border w-full border-gray-300 text-sm rounded-md   mt-2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="number"
                placeholder="Enter your price" name="price"
              />
            </div>
            <div>
              <h1 className="text-lg  text-white ">Cooking time:</h1>
              <input
                required
                className="border w-full border-gray-300  text-sm rounded-md  mt-2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="number"
                placeholder="Enter preparation time of your meal"
                name="time"
                min="2"
                max="3600"
              />
            </div>
            <div>
              <h3 className="text-lg text-white">Ingredients:</h3>
              <div className="flex items-center gap-2">
                <input
                  required={Ingredient.length >= 3 ? false : true}
                  className="border w-full border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block mt-2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="text"
                  placeholder="Enter ingredients of meal"
                  name="Ingredients"
                  min="3"
                  value={Ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                />
                <input
                  type="button"
                  className="btn btn-accent  rounded-xl w-20"
                  value="+"
                  onClick={handleAddIngredient}
                 
                />
              </div>
              {ingredientError && <p className="text-red-500">{ingredientError}</p>}
              <h3 className="flex items-center gap-2 text-white">
                Ingredients:

                <span className=" flex text-sm mt-2">
                  {Ingredient.length == 0 ? (
                    <h2 className="border-5 bg-red-700 p-1 text-sm rounded-full text-white">
                    </h2>
                  ) : (
                    <ul className="flex items-center gap-2">
                      {Ingredient.map((Ingredient) => {
                        return (
                          <li
                            key={Ingredient}
                            className="relative bg-red-500 rounded-full text-center flex items-center text-white"
                          >
                            <div className="w-10 truncate">{Ingredient}</div>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </span>
              </h3>
            </div>
            <div>
              <h3 className="text-lg text-white">Image URL:</h3>
              <div className="flex items-center gap-2">
                <input
                  required={images2.length >= 3 ? false : true}
                  className="border w-full border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block mt-2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="url"
                  placeholder="Enter image URL"
                  name="images"
                  min="13"
                  value={images}
                  onChange={(e) => setImages(e.target.value)}
                />
                <input
                  className="btn btn-accent rounded-xl w-20"
                  onClick={handleAddImage}
                  type="button"
                  value="+"
                />
              </div>
              {imageError && <p className="text-red-500">{imageError}</p>}
              <h3 className="flex items-center gap-2 text-white">
                Images:
                <span className=" flex text-sm">
                  {images2.length == 0 ? (
                    <h2 className="border-2 p-1 text-sm rounded-full">
                    </h2>
                  ) : (
                    <ul className="flex items-center gap-2">
                      {images2.map((img) => {
                        return (
                          <li key={img} className="relative flex items-center text-white">
                            <img
                              className="w-20 h-14 rounded-md"
                              src={img}
                              alt=""
                            />
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </span>
              </h3>
            </div>
            <div>
              <h3 className="text-lg  text-white ">Method:</h3>
              <textarea
                required
                className="border w-full border-gray-300  text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block mt-2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="Method"
                id=""
                cols="30"
                rows="5"
                placeholder="Enter method of meal"
              ></textarea>
            </div>
            <label className="grid grid-cols-2 gap-5 mt-2">
              {Ingredient.length >= 3 && images2.length >= 3 ? (

                <button className="btn btn-accent">
                  Apply
                </button>

              ) : (
                <input
                  className="btn btn-accent"
                  type="button"
                  onClick={() => Toasteeror()}
                  value="Applay"
                />
              )}
              {title == "" &&
                images2.length >= 4 &&
                time == 0 &&
                Ingredient.length >= 4 &&
                method == "" &&
                price == 0 ? (
                <input
                  onClick={() => toast.error("Iltimos inputlarni toldiring")}
                  value="Preview"
                  className="btn btn-success"
                  type="button"
                />
              ) : (
                <input
                  value="Preview"
                  onClick={() => {
                    PreviewModal(),
                      document.getElementById("my_modal_4").showModal();
                  }}
                  className="btn btn-success"
                  type="button"
                />
              )}
            </label>
            <dialog id="my_modal_4" className="modal">
              <div className="modal-box w-11/12 max-w-7xl">
                <div className="my-container grow">
                  <div className="mx-auto md:w-[700px] lg:w-[1000px] sm:w-[400px]">
                    <div className="py-10">
                      <h2 className="mb-5 text-2xl font-semibold">
                        Recipe elements
                      </h2>
                      <div className="flex flex-col gap-10">
                        <div className="carousel carousel-center space-x-4 rounded-box bg-neutral p-4 justify-between">
                          {data2 &&
                            data2?.images?.map((img) => {
                              return (
                                <div key={img} className="carousel-item">
                                  <img
                                    src={img}
                                    className="max-w-sm rounded-box"
                                  />
                                </div>
                              );
                            })}
                        </div>
                        <div>
                          <h2 className="mb-5 text-2xl font-semibold">
                            {data2?.title}
                          </h2>
                          <div className="mb-5 flex items-start gap-2">
                            <span className="font-semibold">Ingrediens: </span>
                            <ul className="flex flex-wrap gap-2">
                              {data2 &&
                                data2?.Ingredients?.map((Ingredient) => {
                                  return (
                                    <li key={Ingredient}>
                                      <div className="badge badge-neutral">
                                        {Ingredient}
                                      </div>
                                    </li>
                                  );
                                })}
                            </ul>
                          </div>
                          <div className="mb-5">
                            <span className="font-semibold">
                              <span className="ml-2 font-normal">
                                {data2?.time} minutes
                              </span>
                            </span>
                          </div>
                          <div className="mb-5">
                            <span className="font-semibold">
                              Price:
                              <span className="ml-2 font-normal">
                                {data2?.price}
                              </span>
                            </span>
                          </div>
                          <div className="flex gap-5 items-start">
                            <h3 className="mb-2 font-semibold">Nation:</h3>
                            <p className="mb-5">{data2?.nation}</p>
                          </div>
                          <div className="flex gap-5 items-start">
                            <h3 className="mb-2 text-xl font-semibold">
                              Method:
                            </h3>
                            <p className="mb-5">{data2?.Method}</p>
                          </div>

                          <div className="sm:flex bleck items-center w-full justify-between">
                            <form method="dialog">
                              <button className="btn btn-secondary">
                                Cancel
                              </button>
                            </form>
                            <button
                              onClick={() => (Ingredient, images2)}
                            >
                              <form method="dialog" className="btn btn-secondary">
                                Add
                              </form>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </dialog>
          </Form>
        </div>
      </div>
    </>
  );
}

export default Create;
