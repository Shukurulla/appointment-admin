import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./components/loading/loading.jsx";
import AppointmentService from "./service/appointment.service.js";
import { changeDate } from "./slice/appointment.slice.js";
import getRemainingHoursToday from "./utils/formatDate.js";

const App = () => {
  const { isLoading, appointments, date } = useSelector(
    (state) => state.appointment
  );
  const [warning, setWarning] = useState({
    item: {},
    state: false,
  });
  const [showList, setShowList] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    AppointmentService.getAppointment(dispatch, date);
    console.log(date);
  }, []);
  useEffect(() => {
    AppointmentService.getAppointment(dispatch, date);
  }, [date]);

  const deleteHandler = async (id) => {
    await AppointmentService.deleteAppointment(dispatch, id);
    setWarning({ state: false, item: {} });
  };

  const handleChange = (date) => {
    dispatch(changeDate(date));
    setShowList(false);
  };

  const warningHandler = (item) => {
    setWarning({ state: true, item: item });
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div className="w-[90%] md:w-[80%] lg:w-[70%] mx-auto py-5">
      <Toaster></Toaster>
      <div className="row my-3">
        <div className="col-lg-3 col-md-6 col-sm-12">
          <div className="border p-[6px] w-100 rounded-md px-2 flex items-center justify-between">
            <b>дата: </b>

            <ul className="relative">
              <li
                className="cursor-pointer"
                onClick={() => setShowList(!showList)}
              >
                {date} <i className="bi bi-chevron-down"></i>
              </li>
              {showList ? (
                <div
                  onClick={() => setShowList(false)}
                  className="absolute w-[100vw] h-[100vh] z-10  bg-[#ffffff00]"
                ></div>
              ) : (
                ""
              )}
              <div
                className={`${
                  showList ? "block" : "hidden"
                } absolute bg-white w-[140px] z-20 left-0 translate-x-[-15px]`}
              >
                {getRemainingHoursToday().map((item) => (
                  <li
                    onClick={() => handleChange(item)}
                    className="p-2 px-3 cursor-pointer hover:bg-blue-200"
                  >
                    {item}
                  </li>
                ))}
              </div>
            </ul>
          </div>
        </div>
        <div className="col-lg-3 flex items-center col-md-6 col-sm-12">
          <div className="border p-[6px] w-100 rounded-md px-2 flex items-center justify-between">
            <b>количество клиентов:</b>
            <span>{appointments.total_clients}</span>
          </div>
        </div>
        <div className="col-lg-3 flex items-center col-md-6 col-sm-12">
          <div className="border p-[6px] w-100 rounded-md px-2 flex items-center justify-between">
            <b>клиенты приходят:</b>
            <span>{appointments.clients_arrived}</span>
          </div>
        </div>
        <div className="col-lg-3 flex items-center col-md-6 col-sm-12">
          <div className="border p-[6px] w-100 rounded-md px-2 flex items-center justify-between">
            <b>клиенты остались:</b>
            <span>{appointments.clients_remaining}</span>
          </div>
        </div>
      </div>
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
      {appointments.error ? appointments.error : ""}
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
                  <a
                    className="bg-green-700 mx-2 px-2 py-1 rounded-md text-white"
                    href={`tel:${item.phone}`}
                  >
                    <i className="bi text-[12px] sm:text-[15px] bi-telephone"></i>
                  </a>
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
