import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./components/loading/loading.jsx";
import AppointmentService from "./service/appointment.service.js";
import { changeDate } from "./slice/appointment.slice.js";
import getRemainingHoursToday from "./utils/formatDate.js";
import { convertDatetime } from "./utils/reverseDate.js";

const App = () => {
  const { isLoading, appointments, date } = useSelector(
    (state) => state.appointment
  );
  const [warning, setWarning] = useState({
    item: {},
    state: false,
  });
  const [showList, setShowList] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    AppointmentService.getAppointment(dispatch, date);
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
        <div className="col-lg-3 mt-2 col-md-3 col-sm-4 col-5">
          <div className="border p-[6px] w-100 rounded-md px-2 flex items-center justify-between">
            <span>
              <i class="fa-solid fa-calendar-days"></i>
              <span className={`hidden lg:inline ml-[10px]`}>дата: </span>
            </span>

            <ul className="relative">
              <li
                className="cursor-pointer"
                onClick={() => setShowList(!showList)}
              >
                {convertDatetime(date).slice(0, 9)}{" "}
                <i className="bi bi-chevron-down"></i>
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
                } absolute bg-white h-[50vh] overflow-y-scroll  z-20 left-0 w-[170px] shadow-md`}
              >
                {getRemainingHoursToday().map((item) => (
                  <li
                    onClick={() => handleChange(item)}
                    className="p-2 px-3 cursor-pointer hover:bg-blue-200"
                  >
                    {convertDatetime(item).slice(0, 9)}
                  </li>
                ))}
              </div>
            </ul>
          </div>
        </div>
        <div className="col-sm-12 sm:hidden"></div>
        <div className="col-lg-3 mt-2 flex items-center col-md-3 col-sm-4 col-4">
          <div className="border p-[6px] w-100 rounded-md px-2 flex items-center justify-between">
            <i className="fa-solid fa-users"></i>
            <span className={`hidden lg:block`}>количество клиентов:</span>
            <span>{appointments.total_clients}</span>
          </div>
        </div>
        <div className="col-lg-3 mt-2 flex items-center col-md-3 col-sm-4 col-4">
          <div className="border p-[6px] w-100 rounded-md px-2 flex items-center justify-between">
            <i class="fa-solid fa-user-check"></i>
            <span className={`hidden lg:block`}>клиенты приходят:</span>

            <span>{appointments.clients_arrived}</span>
          </div>
        </div>
        <div className="col-lg-3 mt-2 flex items-center col-md-3 col-sm-4 col-4">
          <div className="border p-[6px] w-100 rounded-md px-2 flex items-center justify-between">
            <i class="fa-solid fa-user-clock"></i>

            <span className={`hidden lg:block`}>клиенты остались:</span>

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
        <div className="w-100 overflow-x-scroll">
          <table className="table table-striped">
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
                  <td>
                    {convertDatetime(item.date.slice(0, item.date.length - 3))}
                  </td>
                  <td>
                    <button
                      className="btn btn-danger  rounded-md text-white"
                      onClick={() => warningHandler(item)}
                    >
                      <i className="bi bi-trash3"></i>
                    </button>
                    <a
                      className="btn btn-success mx-2 rounded-md text-white"
                      href={`tel:${item.phone}`}
                    >
                      <i className="bi bi-telephone"></i>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        appointments.message
      )}
    </div>
  );
};

export default App;
