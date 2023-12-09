import { customPost } from "@/components/request/util";

export const handleSearch = async (q, setR) => {
  console.log(q);
  try {
    if (q.length >= 3) {
      let response = await customPost('client/filter/clinician', { data: q });
      const { result, status, statusCode } = response;
      statusCode == 200 && status  == 'success' ? setR(result) : setR([]);
    }
  } catch {
    setR([]);
   }
}