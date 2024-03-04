import { customFetch, customPost } from "../components/request/util";

export const handleSearch = async (q, setR,setL) => {
  try {
    if (q.length >= 3) {
      setL(true);
      let response = await customPost('client/filter/clinician', { data: q });
      const { result, status, statusCode } = response;
      if (statusCode == 200 && status == 'success') { 
        setR(result);
        setL(false);
      } else {
        setL(false);
        setR([]);
      }
    }
  } catch {
    setL(false);
    setR([]);
  }
}


export const getTestList = async (setR, setLoading, setS) => {
  try {
    let response = await customFetch('testpanel/list/bulk');
    const { data, status, statusCode } = response;
    if (statusCode == 200 && status == 'success') {
      setS(data);
      setR(data);
    }
    else setR([]);
    setLoading(false);
  } catch {
    setR([]);
    setLoading(false);
  }
}