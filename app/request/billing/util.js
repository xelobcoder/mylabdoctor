import { customPost } from "@/components/request/util";

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
        setR([]);
      }
    }
  } catch {
    setR([]);
   }
}