import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { changeAmount, removeAll, removeProduct } from "../app/userslice";
import { FcFullTrash } from "react-icons/fc";

function Trash() {
  const { userP } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  if (userP.products.length === 0) {
    return (
      <>
        <div className="m-auto flex justify-center items-center h-[500px] max-w-[1220px]">
          <div className="flex flex-col text-center justify-center items-center mt-32">
            <img src="./trash.png" alt="" />
            <h1 className="font-semibold text-[34px]">
              Your cart is empty and sad :(
            </h1>
            <Link to="/">
              <button className=" btn btn-active btn-neutral mt-[50px] text-white transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 font-bold w-[250px] h-[61px] rounded-[8px]">
                Home
              </button>
            </Link>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div className="sm:mx-48 mx-10 mt-10">
        <h1 className="text-4xl">Cart</h1>
        <div className="grid sm:grid-cols-2 grid-cols-1">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {userP?.products?.map((product) => {
                  return (
                    <tr key={product.id}>
                      <td>
                        <div className="flex items-center gap-3">
                          <h1 className="text-blue-600">{product.amount}X</h1>
                          <div className="avatar">
                            <div className="mask mask-squircle h-12 w-12">
                              <img
                                src={product.images[0]}
                                alt="Product Image"
                              />
                            </div>
                          </div>
                          <div className="w-40 text-xl">{product.title}</div>
                          <div className="text-sm opacity-50">
                            ${product.price}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <button
                            className="px-2 text-white border-2 bg-sky-400 rounded-full"
                            onClick={() =>
                              dispatch(
                                changeAmount({
                                  id: product.id,
                                  type: "increase",
                                })
                              )
                            }
                          >
                            +
                          </button>
                          <h1 className="px-2 text-indigo-950 bg-teal-100 py-1 rounded-md">
                            {product.amount}
                          </h1>
                          <button
                            className="px-2 text-white bg-sky-400 border-2 rounded-full"
                            onClick={() =>
                              dispatch(
                                changeAmount({
                                  id: product.id,
                                  type: "decrease",
                                })
                              )
                            }
                            disabled={product.amount === 1}
                          >
                            -
                          </button>
                        </div>
                      </td>
                      <td>${product.price}</td>
                      <td>
                        <button
                          onClick={() => dispatch(removeProduct(product.id))}
                          className="btn btn-ghost btn-xs h-12"
                        >
                          <FcFullTrash className="h-8 w-10" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="sm:w-96 w-70 sm:ml-40 ml-0">
            <img src="./karta.webp" alt="Payment Image" className="mb-5" />
            <div className="bg-teal-100 rounded-md gap-10 text-center py-2">
              <input
                type="text"
                className="bg-teal-100 h-full mr-5"
                placeholder="Enter promo code..."
              />
              <button className="bg-indigo-950 btn text-white">Apply</button>
            </div>
            <div>
              <div className="flex justify-between px-2 items-center py-2 mt-5 border-y-2 border-indigo-500">
                <h4 className="text-lg">Items {userP.products.length}</h4>
                <h4>${userP.price}</h4>
              </div>
              <div className="flex justify-between items-center px-2 pt-2">
                <h5>Subtotal:</h5>
                <h4>${userP.price}</h4>
              </div>
              <div className="flex justify-between items-center px-2 mt-5">
                <h2 className="text-lg">Total:</h2>
                <h4>${userP.price}</h4>
              </div>
            </div>
            <button
              className="btn w-full mt-2"
              onClick={() => dispatch(removeAll())}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Trash;
