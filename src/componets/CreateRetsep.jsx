import { Link, useParams } from "react-router-dom";

import toast from "react-hot-toast";
import { db } from "../firebase/firebaseConfig";
import { doc, deleteDoc } from "firebase/firestore";
import { IoTimer } from "react-icons/io5";
import { TiThMenuOutline } from "react-icons/ti";
import { IoMdPricetags } from "react-icons/io";
import { RiLogoutCircleRLine } from "react-icons/ri";
function CreateRetsep({ data }) {

  const deleteRecipe = (id) => {
    deleteDoc(doc(db, "Exzam", id))
      .then(() => {
        toast.success("Deleted",);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <div className="grid lg:grid-cols-3 md:mb-20 mb-0 md:grid-cols-2 sm:grid-cols-1 gap-5 mx-auto">
      {data &&
        data.map((resipe) => {
          return (
            <div className="relative" key={resipe.id}>
              <div className="card-actions justify-end absolute z-[1] sm:left-[330px] left-[265px]">
                <button
                  className="btn btn-square btn-sm m-2"
                  onClick={() =>
                    document.getElementById("my_modal_1").showModal()
                  }
                >
                  <dialog id="my_modal_1" className="modal">
                    <div className="modal-box">
                      <h3 className="font-bold text-lg">
                        Do you really want to delete Recipe?
                      </h3>
                      <div className="modal-action">
                        <form method="dialog">
                          <button
                            className="btn"
                            onClick={() => deleteRecipe(resipe.id)}
                          >
                            delete
                          </button>
                          <button className="btn">Cancel</button>
                        </form>
                      </div>
                    </div>
                  </dialog>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="card bg-base-100 sm:w-96 w-80 shadow-xl">
                <figure>
                  <img src={resipe.images[1]} alt="Shoes" />
                </figure>

                <div className="card-body">
                  <h2 className="card-title  "><span className=" font-bold flex"> <span
                    className="mt-1" > </span>Titil:</span>{resipe.title}</h2>
                  <p className="card-description flex"> <IoTimer className="mt-1 " /><span className=" font-bold">Time:</span> {resipe.time} minut</p>
                  <p><span className="font-bold  flex "><span className="mt-1"><IoMdPricetags /></span> Price: {resipe.price}</span></p>
                  <Link to={`/products/${resipe.id}`} >
                    <div className="card-actions justify-end">
                      <button className="btn btn-primary">Go to details <RiLogoutCircleRLine /></button>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default CreateRetsep;
