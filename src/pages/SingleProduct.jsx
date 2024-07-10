import React, { useState } from "react";
import { useCollection } from "../hooks/useCollection";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addProduct } from "../app/userslice";

function SingleProduct() {
  const params = useParams();
  const { user } = useSelector((state) => state.user);
  const { data } = useCollection("Exzam", ["uid", "==", user.uid]);
  const data2 = data?.filter((id) => id.id == params.id)[0];
  const dispatch = useDispatch();

  const [productAmount, setProductAmount] = useState(1);

  const setAmount = (type) => {
    if (type == "decrease" && productAmount > 1) {
      setProductAmount((prev) => prev - 1);
    } else if (type == "increase") {
      setProductAmount((prev) => prev + 1);
    }
  };
  const addToBag = () => {
    const newP = {
      ...data2,
      amount: productAmount,
    };

    dispatch(addProduct(newP));
  };
  return (
    <>
      <main className="mb-10 container grow place-content-center">
        <div className="mx-auto md:w-[700px] lg:w-[1300px] sm:w-[400px] place-content-center">
          <div className="py-10">
            <h2 className="mb-5 text-2xl font-semibold">Recipe elements</h2>
            <div className="flex flex-col gap-10">
              <div className="carousel carousel-center space-x-4 rounded-box bg-neutral p-4 justify-between">
                {data2 &&
                  data2?.images?.map((img) => {
                    return (
                      <div key={img} className="carousel-item">
                        <img src={img} className="max-w-sm rounded-box" />
                      </div>
                    );
                  })}
              </div>
              <div className="place-content-center ml-5">
                <h2 className="mb-5 text-2xl font-semibold">{data2?.title}</h2>
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
                    Cooking time:
                    <span className="ml-2 font-normal">
                      {data2?.time} minutes
                    </span>
                  </span>
                </div>
                <div className="mb-5">
                  <span className="font-semibold">
                    Prise:
                    <span className="ml-2 font-normal">{data2?.prise}</span>
                  </span>
                </div>
                <div className="flex gap-5 items-start">
                  <h3 className="mb-2 font-semibold">Nation:</h3>
                  <p className="mb-5">{data2?.nation}</p>
                </div>
                <div className="flex gap-5 items-start">
                  <h3 className="mb-2 text-xl font-semibold">Method:</h3>
                  <p className="mb-5 text-balance md:w-[700px] lg:w-[1300px] sm:w-[400px]">
                    {data2?.Method}
                  </p>
                </div>
                <div className="sm:flex bleck items-center w-full justify-between text-center">
                  <div className="flex items-center gap-2 sm:mb-0 mb-15">
                    <button
                      onClick={() => setAmount("increase")}
                      className="btn btn-outline btn-primary "
                    >
                      +
                    </button>
                    <h3>{productAmount}</h3>
                    <button
                      onClick={() => setAmount("decrease")}
                      className="btn btn-outline btn-primary  "
                      disabled={productAmount == 1 ? true : false}
                    >
                      -
                    </button>
                    <button
                      onClick={() => addToBag()}
                      className="btn btn-outline btn-success"
                    >
                      Add to bag
                    </button>
                  </div>
                  <a className="btn btn-active btn-neutral ml-auto w-80 text-center mt-5 place-content-center" href="/">
                    Back
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default SingleProduct;
