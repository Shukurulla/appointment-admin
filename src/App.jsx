import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./components/loading/loading.jsx";
import AppointmentService from "./service/appointment.service.js";

const App = () => {
  const { isLoading, appointments } = useSelector((state) => state.appointment);

  const dispatch = useDispatch();

  useEffect(() => {
    AppointmentService.getAppointment(dispatch);
  }, []);

  const deleteHandler = async (id) => {
    await AppointmentService.deleteAppointment(dispatch, id);
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div className="container py-5">
      <Toaster></Toaster>
      {appointments.appointments ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>№</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Date</th>
              <th>Option</th>
            </tr>
          </thead>
          <tbody>
            {appointments.appointments.map((item, idx) => (
              <tr>
                <td>{idx + 1}</td>
                <td>{item.name}</td>
                <td>{item.phone}</td>
                <td>{item.date}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteHandler(item.id)}
                  >
                    Delete
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
