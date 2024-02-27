export default function ListItemDisplay({ item, index, setActive, active }) {
  return (
    <>
      <div className={`list-group-item grid pointer grid-5 ${active === index ? "border border-primary-subtle" : ""}`} key={index}>
        <span>{item?.patientid}</span>
        <span>
          {item?.firstname} {item.middlename} {item.lastname} ({item?.gender})({item?.age} {item?.agetype})
        </span>
        <span>
          {" "}
          {new Date(item?.created_on).toLocaleDateString()} || {new Date(item?.created_on).toLocaleTimeString()}
        </span>
        <span>{item?.dob ? new Date(item?.dob).toLocaleDateString() : ""} </span>
        <span className="d-flex justify-content-between">
          <div className="text-capitalize">
            {item?.processed == 0 ? (
              <span className="bg-danger rounded p-1 text-white">pending</span>
            ) : (
              <span className="text-white bg-success p-1">processed</span>
            )}
          </div>
          <span>
            <button
              onClick={(ev) => {
                setActive(index)
              }}
              className="btn btn-dark btn-sm">
              {active === index ? "collapse" : "expand"}
            </button>
          </span>
        </span>
      </div>
      {active === index && (
        <div>
          <span>
            {item?.data.length > 0 && (
              <div>
                {item?.data.map((item, index) => {
                  return (
                    <div key={index} className="list-group-item d-flex bg-secondary-subtle  justify-content-between border-bolder">
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
