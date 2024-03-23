import ApiClient from "../services/apiClient";

const submitSelectedData = (
  startDate,
  endDate,
  selectedMachine,
  setDiaryData
) => {
  const queryParams = new URLSearchParams({
    startDate,
    endDate,
    selectedMachine,
  });
  const apiUrl = "api-riports/riports/";
  const getSelectedDiary = new ApiClient(`${apiUrl}?${queryParams}`);

  getSelectedDiary
    .getData()
    .then((response) => {
      setDiaryData(response);
    })
    .catch((error) => {
      console.log(error);
    });
};

export default submitSelectedData;
