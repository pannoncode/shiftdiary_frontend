import { createSlice } from "@reduxjs/toolkit";

export const actualDiarySlice = createSlice({
  name: "actualDiary",
  initialState: {
    diary: {
      complated: "",
      created: "",
      created_it: "",
      id: "",
      machine_number: "",
      shift: "",
      shift_date: "",
      user_id: "",
    },
    safety: {
      id: "",
      shift_diary: "",
      accident_num: 0,
      accident: "",
      safety_notes: "",
    },
    quality: {
      id: "",
      shift_diary: "",
      minor_qa_defect_num: 0,
      minor_qa_defect: "",
      major_qa_defect_num: 0,
      major_qa_defect: "",
      quality_notes: "",
    },
    employees: {
      id: "",
      shift_diary: "",
      full_line_manpower: "",
      staff_present: "",
      staff_sick_pay_num: "",
      staff_sick_pay: "",
      staff_holiday_num: "",
      staff_holiday: "",
      staff_unverified_num: "",
      staff_unverified: "",
      staff_notes: "",
    },
    machine_defect: {
      id: "",
      shift_diary: "",
      longer_stops_num: "",
      longer_stops: "",
      minor_stops_num: "",
      minor_stops: "",
      machine_defect_notes: "",
    },
  },
  reducers: {
    setActualShiftDiary(state, action) {
      state.diary.complated = action.payload.complated;
      state.diary.created = action.payload.created;
      state.diary.created_it = action.payload.created_it;
      state.diary.id = action.payload.id;
      state.diary.machine_number = action.payload.machine_number;
      state.diary.shift = action.payload.shift;
      state.diary.shift_date = action.payload.shift_date;
      state.diary.user_id = action.payload.user_id;
    },
    setActualSafety(state, action) {
      if (action.payload && action.payload.shift_diary) {
        state.safety.shift_diary = action.payload.shift_diary;
        state.safety.accident_num = action.payload.accident_num;
        state.safety.accident = action.payload.accident;
        state.safety.safety_notes = action.payload.safety_notes;
        state.safety.id = action.payload.id;
      }
    },
    setActualQuality(state, action) {
      if (action.payload && action.payload.shift_diary) {
        state.quality.id = action.payload.id;
        state.quality.minor_qa_defect_num = action.payload.minor_qa_defect_num;
        state.quality.minor_qa_defect = action.payload.minor_qa_defect;
        state.quality.major_qa_defect_num = action.payload.major_qa_defect_num;
        state.quality.major_qa_defect = action.payload.major_qa_defect;
        state.quality.quality_notes = action.payload.quality_notes;
      }
    },
    setActualEmployees(state, action) {
      if (action.payload && action.payload.shift_diary) {
        state.employees.id = action.payload.id;
        state.employees.shift_diary = action.payload.shift_diary;
        state.employees.full_line_manpower = action.payload.full_line_manpower;
        state.employees.staff_present = action.payload.staff_present;
        state.employees.staff_sick_pay_num = action.payload.staff_sick_pay_num;
        state.employees.staff_sick_pay = action.payload.staff_sick_pay;
        state.employees.staff_holiday_num = action.payload.staff_holiday_num;
        state.employees.staff_holiday = action.payload.staff_holiday;
        state.employees.staff_unverified_num =
          action.payload.staff_unverified_num;
        state.employees.staff_unverified = action.payload.staff_unverified;
        state.employees.staff_notes = action.payload.staff_notes;
      }
    },
    setActualMachineDefect(state, action) {
      if (action.payload && action.payload.shift_diary) {
        state.machine_defect.id = action.payload.id;
        state.machine_defect.shift_diary = action.payload.shift_diary;
        state.machine_defect.longer_stops_num = action.payload.longer_stops_num;
        state.machine_defect.longer_stops = action.payload.longer_stops;
        state.machine_defect.minor_stops = action.payload.minor_stops;
        state.machine_defect.minor_stops_num = action.payload.minor_stops_num;
        state.machine_defect.machine_defect_notes =
          action.payload.machine_defect_notes;
      }
    },
    clearDiaryData(state) {
      state.diary.complated = "";
      state.diary.created = "";
      state.diary.created_it = "";
      state.diary.id = "";
      state.diary.machine_number = "";
      state.diary.shift = "";
      state.diary.shift_date = "";
      state.diary.user_id = "";
    },
    clearSafetyData(state) {
      state.safety.shift_diary = "";
      state.safety.accident_num = 0;
      state.safety.accident = "";
      state.safety.safety_notes = "";
      state.safety.id = "";
    },
    clearQualityData(state) {
      state.quality.id = "";
      state.quality.minor_qa_defect_num = 0;
      state.quality.minor_qa_defect = "";
      state.quality.major_qa_defect_num = 0;
      state.quality.major_qa_defect = "";
      state.quality.quality_notes = "";
    },
    clearEmployeesData(state) {
      state.employees.id = "";
      state.employees.shift_diary = "";
      state.employees.full_line_manpower = "";
      state.employees.staff_present = "";
      state.employees.staff_sick_pay_num = "";
      state.employees.staff_sick_pay = "";
      state.employees.staff_holiday_num = "";
      state.employees.staff_holiday = "";
      state.employees.staff_unverified_num = "";
      state.employees.staff_unverified = "";
      state.employees.staff_notes = "";
    },
    clearMachineDefect(state) {
      state.machine_defect.id = "";
      state.machine_defect.shift_diary = "";
      state.machine_defect.longer_stops_num = "";
      state.machine_defect.longer_stops = "";
      state.machine_defect.minor_stops = "";
      state.machine_defect.minor_stops_num = "";
      state.machine_defect.machine_defect_notes = "";
    },
  },
});

export const actualDiaryActions = actualDiarySlice.actions;
export default actualDiarySlice;
