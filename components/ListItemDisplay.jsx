import { useState } from "react"
export default function ListItemDisplay({ item, index }) {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(!show);

  return (
    <>
      <div className={`list-group-item grid grid-5`} key={index}>
        <span>{item?.patientid}</span>
        <span>
          {item?.firstname} {item.middlename} {item.lastname} ({item?.gender})({item?.age} {item?.agetype})
        </span>
        <span>
          {" "}
          {new Date(item?.created_on).toLocaleDateString()} || {new Date(item?.created_on).toLocaleTimeString()}
        </span>
        <span>{new Date(item?.dob).toLocaleDateString()} </span>
        <span className="d-flex justify-content-between">
          <span>{item?.processed == 0 ? "pending" : "completed"}</span>
          <span onClick={handleShow}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill="currentColor"
              className="bi bi-arrow-down-circle-fill"
              viewBox="0 0 16 16">
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293z" />
            </svg>
          </span>
        </span>
      </div>
      {show && (
        <div>
          <span>
            {item?.data.length > 0 && (
              <div className="">
                {item?.data.map((item, index) => {
                  return (
                    <div key={index} className="list-group-item d-flex justify-content-between border-bolder">
                      <span>
                        {index + 1}.{item?.name}
                      </span>{" "}
                      <span>{item?.price}</span>
                    </div>
                  )
                })}
              </div>
            )}
          </span>
        </div>
      )}
    </>
  )
}
