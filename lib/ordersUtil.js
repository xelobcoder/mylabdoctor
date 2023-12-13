import { customFetch } from "@/components/request/util"

export const getOrders = async function (clinicianid, setR, setL) {
  const getOrders = await customFetch(`orders/temporary?clinicianid=${clinicianid}`);
  const { status, statusCode, message, result } = getOrders;
  if (status == 'success' && statusCode == 200) {
    const transform = result.map((item) => {
      let data = item?.data;
      data = JSON.parse(data);
      item.data = data;
      return item;
    })
    setR(transform);
    setL(false);
    return;
  } else {
    setL(false);
    return;
  }
}