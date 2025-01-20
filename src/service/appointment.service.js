import { toast } from "react-hot-toast";
import {
  getAppointmentFailure,
  getAppointmentStart,
  getAppointmentSuccess,
} from "../slice/appointment.slice.js";
import axios from "./api.js";

const AppointmentService = {
  async postAppointment(dispatch, value) {
    dispatch(getAppointmentStart());
    try {
      const { data } = await axios.post("/appointments", value);
      dispatch(getAppointmentSuccess(data));
      if (data) {
        toast.success("успешно забронировано");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      dispatch(getAppointmentFailure());
    }
  },
  async getAppointment(dispatch) {
    dispatch(getAppointmentStart());
    try {
      const { data } = await axios.get("/appointments");
      dispatch(getAppointmentSuccess(data));
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      dispatch(getAppointmentFailure());
    }
  },
  async deleteAppointment(dispatch, id) {
    dispatch(getAppointmentStart());
    try {
      const { data } = await axios.delete(`/appointments/${id}`);

      const appointment = await axios.get("/appointments");
      dispatch(getAppointmentSuccess(appointment.data));
      setTimeout(() => {
        toast.success(data.message);
      }, 100);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      dispatch(getAppointmentFailure());
    }
  },
};

export default AppointmentService;
