import { createSlice } from "@reduxjs/toolkit";
import getRemainingHoursToday from "../utils/formatDate";

const appointmentSlice = createSlice({
  name: "appointment",
  initialState: {
    isLoading: false,
    appointments: [],
    date: getRemainingHoursToday()[0],
  },
  reducers: {
    getAppointmentStart: (state) => {
      state.isLoading = true;
    },
    getAppointmentSuccess: (state, action) => {
      state.isLoading = false;
      state.appointments = action.payload;
    },
    getAppointmentFailure: (state) => {
      state.isLoading = false;
    },
    changeDate: (state, action) => {
      state.date = action.payload;
    },
  },
});
export const {
  getAppointmentFailure,
  getAppointmentStart,
  getAppointmentSuccess,
  changeDate,
} = appointmentSlice.actions;

export default appointmentSlice.reducer;
