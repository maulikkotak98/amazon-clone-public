import axiosInstance from "./axiosInstance";

// write functions that calls the api and returns promise
function createPayment(total) {
  return axiosInstance.post(`/payments/create?total=${total}`, {});
}

// export API functions
export { createPayment };
