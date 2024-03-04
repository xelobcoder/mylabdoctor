import { useState } from "react";
import { handleSearch } from "../../lib/billingUtil";
import { useRouter } from "next/navigation";
import Loader from "../../components/accessories/Loader";

export default function RequestTest() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const router = useRouter();


  const renderingView = () => {
    if (loading) return <Loader />
    else {
      if (results.length == 0) {
        return (<div className="list-group">
          <div className="list-group-item d-flex justify-content-between mt-3">
            <p className="fw-bold mt-2">No Data Available</p>
            <button className="btn btn-success btn-sm" onClick={(ev) => { router.push('/request/new') }}>
              Register new client
            </button>
          </div>
        </div>)
      } else {
        return <div className="list-group mt-3">
          {results.map((item, index) => {
            return (
              <div className="list-group-item grid grid-6" key={index}>
                <span>{item?.firstname} {item?.middlename} {item?.lastname} ({item?.gender}) ({item?.age} {item?.ageTyspane})</span>
                <span>Email: {item?.email}</span>
                <span>DOB: {item?.dob}</span>
                <span>Marital Status: {item?.marital_status}</span>
                <span>Mobile Number: {item?.mobile_number}</span>
                <span>
                  <button
                    onClick={(ev) => { router.push(`/request/billing?patientid=${item?.patientid}`) }} className="btn btn-success btn-sm">
                    request test
                  </button>
                </span>
              </div>
            )
          })}
        </div>
      }
    }
  }


  return (
    <>
      <div className='d-flex justify-content-between'>
        <input type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="search using patient name or mobile number or email address or your unique id" className="custom-input" />
        <button onClick={(ev) => { handleSearch(query, setResults, setLoading) }} type="button" className="btn btn-primary btn-sm mx-2">
          search
        </button>
      </div>
      <div>
        {renderingView()}
      </div>
    </>
  )
}