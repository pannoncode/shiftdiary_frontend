import { createSlice } from "@reduxjs/toolkit";

export const riportsDataSlice = createSlice({
  name: "riportsData",
  initialState: {
    allVolumes: [],
    allMaxProductVolumePerMin: [],
    allDates: [],
    allShift: [],
    allPlannedOee: [],
    allActualOee: [],
    allActualShiftTimeMin: [],
    employees: {
      fullLineManpower: [],
      staffPresent: [],
      staffSickPayNum: [],
      staffUnverifiedNum: [],
      staffHolidayNum: [],
    },
    machineDefects: {
      longerStops: [],
      minorStops: [],
    },
    quality: {
      minorQaDefect: [],
      majorQaDefect: [],
    },
    safety: {
      accident: []
    },
  },
  reducers: {
    setAllVolumes(state, action) {
      state.allVolumes.push(Number(action.payload));
    },
    clearAllVolumes(state) {
      state.allVolumes = [];
    },
    setAllMaxProductVolumePerMin(state, action) {
      state.allMaxProductVolumePerMin.push(Number(action.payload));
    },
    clearAllMaxProductVolumePerMin(state) {
      state.allMaxProductVolumePerMin = [];
    },
    setAllDates(state, action) {
      state.allDates.push(action.payload);
    },
    clearAllDates(state) {
      state.allDates = [];
    },
    setAllShift(state, action) {
      state.allShift.push(action.payload);
    },
    clearAllShift(state) {
      state.allShift = [];
    },
    setAllPlannedOee(state, action) {
      state.allPlannedOee.push(Number(action.payload));
    },
    clearAllPlannedOee(state) {
      state.allPlannedOee = [];
    },
    setAllActualOee(state, action) {},
    clearAllActualOee(state) {
      state.allActualOee = [];
    },
    setAllShiftTimeMin(state, action) {
      state.allActualShiftTimeMin.push(Number(action.payload));
    },
    clearAllMaxProductVolumePerMin(state) {
      state.allMaxProductVolumePerMin = [];
    },
    setEmployeesData(state, action) {
      state.employees.fullLineManpower.push(action.payload.full_line_manpower);
      state.employees.staffPresent.push(action.payload.staff_present);
      state.employees.staffHolidayNum.push(action.payload.staff_holiday_num);
      state.employees.staffUnverifiedNum.push(
        action.payload.staff_unverified_num
      );
      state.employees.staffSickPayNum.push(action.payload.staff_sick_pay_num);
    },
    clearEmployeesData(state) {
      state.employees.fullLineManpower = [];
      state.employees.staffPresent = [];
      state.employees.staffHolidayNum = [];
      state.employees.staffUnverifiedNum = [];
      state.employees.staffSickPayNum = [];
    },
    setMachineDefectData(state, action) {
      state.machineDefects.longerStops.push(action.payload.longer_stops_num);
      state.machineDefects.minorStops.push(action.payload.minor_stops_num);
    },
    clearMachineDefectData(state) {
      state.machineDefects.longerStops = [];
      state.machineDefects.minorStops = [];
    },
    setQualityData(state, action) {
      state.quality.minorQaDefect.push(action.payload.minor_qa_defect_num);
      state.quality.majorQaDefect.push(action.payload.major_qa_defect_num);
    },
    clearQualityData(state) {
      state.quality.minorQaDefect = [];
      state.quality.majorQaDefect = [];
    },
    setSafetyData(state, action) {
      state.safety.accident.push(action.payload.accident_num);
    },
    clearSafetyData(state) {
      state.safety.accident = [];
    },
  },
});

export const riportsDataActions = riportsDataSlice.actions;
export default riportsDataSlice;
