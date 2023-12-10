import { customFetch } from "@/components/request/util"

export const getReadyResult = async function (billingid, clinicianid, setR, setL) {
  try {
    const response = await customFetch(`clinician/resultsets/billingid?clinicianid=${clinicianid}&&billingid=${billingid}`);
    const { result, status, statusCode } = response;
    if (statusCode == 200 && status == 'success') {
      setL(false);
      setR(result);
    } else {
      setL(false);
      setR([]);
    }
  } catch (error) {
    setL(false);
    setR([]);
    console.log('error occured');
  }
}