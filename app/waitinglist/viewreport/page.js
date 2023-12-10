"use client";
import Divider from "@/components/Divider";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { getReadyResult } from "./util";

export default function ViewReportSummary() {
  const searchparams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);
  const clientname = searchparams.get("clientname");
  const billingid = searchparams.get('billingid');
  const [showpdf, setshow] = useState(false);
  const [embedLink, setembedLink] = useState('');
  const [pdfloading, setpdfloading] = useState(false);

  const getData = useCallback(async () => {
    setLoading(true);
    await getReadyResult(billingid, 2, setResults, setLoading);
  }, [billingid]);

  useEffect(() => {
    getData();
  }, [getData]);


  const handleEmbedLink = async (item) => {
    setpdfloading(true);
    setshow(true);
    const { testid, name, billingid } = item;
    const structuredName = name.trim().replace(" ", "_");
    const link = `http://localhost:5000/billing/result/pdf?billingid=${billingid}&&testid=${testid}&&testname=${structuredName}`;
    setembedLink(link);
    setpdfloading(false);
  }

  const determineStage = function (item) {
    const { collection, processing, ready, approval } = item;
    if (approval == 1) {
      return 'approved';
    }

    if (ready == 'true') {
      return 'ready';
    }

    if (processing == 'true') {
      return 'processing';
    }

    if (collection == 'true') {
      return 'collection';
    }

    return 'sampling';
  }



  return (
    <Divider>
      <div>
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <span>Client Name: {clientname}</span>
              <span>Billing Id: {billingid}</span>
            </div>
          </div>
          <div className={`card-body pointer ${showpdf && 'grid grid-20-80'}`}>
            {loading && <div className="my-2 p-5 loader"></div>}
            {!loading && results.length > 0 && (
              <>
                <div className="border-right">
                  <ul>
                    {results.map((item, index) => {
                      const stage = determineStage(item);
                      return (
                        <li className={`border-bottom p-4 test-single-view text-capitalize ${!showpdf ?  "grid grid-3" : "grid"}`} key={index}>
                          <span>{item?.name}</span>
                          {showpdf && (<br />)}
                          <span
                            className={stage == 'approved' ? 'text-success' :
                              'ready' ? 'text-orange' : 'processing' ? 'text-info' : 'text-danger'}
                          >
                           {stage}
                          </span>
                          <span>
                            {(stage == 'approved' && !showpdf )&& <button className="btn-primary" onClick={() => {handleEmbedLink(item)}}>View Report</button>}
                          </span>
                        </li>
                      )
                    })}
                  </ul>
                </div>
                {showpdf && (
                  <div className="page-viewer">
                    {
                      pdfloading ?
                        <div className="loader"></div> :
                        <embed src={embedLink} width="100%" height="100%" />
                     }
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </Divider>
  )
}