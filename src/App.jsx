import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./components/loading/loading.jsx";
import AppointmentService from "./service/appointment.service.js";

const App = () => {
  const { isLoading, appointments } = useSelector((state) => state.appointment);
  const [warning, setWarning] = useState({
    item: {},
    state: false,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    AppointmentService.getAppointment(dispatch);
  }, []);

  const deleteHandler = async (id) => {
    await AppointmentService.deleteAppointment(dispatch, id);
    setWarning({ state: false, item: {} });
  };

  const warningHandler = (item) => {
    setWarning({ state: true, item: item });
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div className="w-[90%] md:w-[80%] lg:w-[70%] mx-auto py-5">
      <Toaster></Toaster>
      {warning.state ? (
        <div className="warning-wrapper">
          <div className="w-[80%] bg-white p-4 rounded-md">
            <p>
              Хотите удалить "<b>{warning.item.name}</b>{" "}
              <b>{warning.item.date}</b>"?
            </p>
            <div className="d-flex mt-3 gap-2">
              <button
                className="bg-gray-600  px-2 py-1 rounded-md text-white"
                onClick={() => setWarning({ state: false, item: {} })}
              >
                Отмена
              </button>
              <button
                className="bg-red-600 px-2 py-1 rounded-md text-white"
                onClick={() => deleteHandler(warning.item.id)}
              >
                Удалить
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {appointments.appointments ? (
        <table className="table text-[12px] sm:text-[15px] table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Date</th>
              <th>Option</th>
            </tr>
          </thead>
          <tbody>
            {appointments.appointments.map((item, idx) => (
              <tr className="">
                <td>{item.name}</td>
                <td>{item.phone}</td>
                <td>{item.date.slice(0, item.date.length - 3)}</td>
                <td>
                  <button
                    className="bg-red-600 px-2 py-1 rounded-md text-white"
                    onClick={() => warningHandler(item)}
                  >
                    <i className="bi text-[12px] sm:text-[15px] bi-trash3"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        appointments.message
      )}
    </div>
  );
};

export default App;
