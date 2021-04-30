// import moment from 'moment'
import { useState } from "react";

export const Quotebox = ({ quote }) => {
  const [showLogs, setShowLogs] = useState(false);

  return (
    <div
      data-testid="quotebox"
      className="relative bg-white mt-6 rounded-xl p-6 shadow-xl"
    >
      <div className="flex flex-row items-center justify-between">
        <div className="mr-4 flex flex-col items-center">
          <div style={{ fontWeight: 700, fontSize: 12, marginBottom: 5 }}>
            Gallons
          </div>
          <div>{quote.gallons}</div>
        </div>

        <div className="mr-4 flex flex-col items-center">
          <div style={{ fontWeight: 700, fontSize: 12, marginBottom: 5 }}>
            Rate
          </div>
          <div>{`$${quote.rate}/gal`}</div>
        </div>

        <div className="mr-4 flex flex-col items-center">
          <div style={{ fontWeight: 700, fontSize: 12, marginBottom: 5 }}>
            Total Cost
          </div>
          <div>{`$${quote.total_price}`}</div>
        </div>

        <div className="mr-4 flex flex-col items-center">
          <div style={{ fontWeight: 700, fontSize: 12, marginBottom: 5 }}>
            Delivered
          </div>
          <div>{quote.delivery_date}</div>
        </div>

        <div className="mr-4 flex flex-col items-center">
          <div style={{ fontWeight: 700, fontSize: 12, marginBottom: 5 }}>
            Address
          </div>
          <div>{quote.delivery_address1}</div>
        </div>

        {/* <div className="mr-4 flex flex-col items-center">
          <div style={{ fontWeight: 700, fontSize: 12, marginBottom: 5 }}>
            Order Date
          </div>
          <div>{quote.date_requested}</div>
        </div> */}
      </div>
    </div>
  );
};

export default Quotebox;
