"use client";
import { useState, useEffect } from "react";
import { VictoryPie, VictoryLabel } from "victory";
export default function MortgageCalculator(props) {
  const [intrest, setIntrest] = useState(0);
  const [calculatordata, Setcalculatordata] = useState({
    hvalue: props.price || "",
    dpay: "",
    dper: "10",
    loanamt: "",
    intrate: "2.5",
    loanterm: "30",
  });
  const [calculated, setcalculated] = useState(null);

  useEffect(() => {
    let valll =
      (parseFloat(calculatordata.loanamt) *
        parseFloat(calculatordata.loanterm) *
        parseFloat(calculatordata.intrate)) /
      100;
    setIntrest(valll);
  }, [calculatordata.loanamt, calculatordata.loanterm, calculatordata.intrate]);

  useEffect(() => {
    let dpayment =
      (parseInt(calculatordata.dper) / 100) * parseInt(calculatordata.hvalue);
    if (isNaN(dpayment)) {
      dpayment = 0;
    }
    Setcalculatordata((prevState) => ({
      ...prevState,
      ["dpay"]: dpayment.toFixed(2),
    }));
    /* console.log(calculatordata.dpay); */
  }, [calculatordata.hvalue, calculatordata.dper]);

  useEffect(() => {
    let mortamt =
      parseFloat(calculatordata.hvalue) - parseFloat(calculatordata.dpay);
    if (isNaN(mortamt)) {
      mortamt = 0;
    }
    Setcalculatordata((prevState) => ({
      ...prevState,
      ["loanamt"]: mortamt.toFixed(2),
    }));
    /* console.log(calculatordata.dpay); */
  }, [calculatordata.hvalue, calculatordata.dper, calculatordata.dpay]);

  function CalcMonth() {
    let i = parseFloat(calculatordata.intrate) / 100;
    let g = i / 12;
    let h = 1 + g;
    let tenn = parseInt(calculatordata.loanterm * 12);
    let powerr = Math.pow(h, tenn);
    let aa = g * powerr;
    let numm = parseFloat(calculatordata.loanamt) * aa;
    let deno = powerr - 1;
    let monthh = numm / deno;
    return monthh;
  }

  useEffect(() => {
    setcalculated(CalcMonth().toFixed(2));
  }, [calculatordata]);
  const handleChange = (e) => {
    const { id, value } = e.target;
    Setcalculatordata((prevState) => ({
      ...prevState,
      [id]: value,
    }));
    setcalculated(CalcMonth().toFixed(2));
    /* console.log(calculatordata); */
  };

  let style = { fontSize: "15" };

  return (
    <div id="mortgageCalculator" className="mt-8">
      <div className="flex flex-col justify-start">
        <div className="flex flex-col px-auto items-center mt-10">
          <div className="my-3 block sm:hidden">
            <h3 className="fs-2">
              ${calculated} <span className="fs-5 text-secondary">/mo</span>
            </h3>
          </div>
          <div className="w-full ">
            <div className="grid grid-cols-2 sm:grid-cols-3">
              <div className="sm:col-span-1 flex items-center">
                <label className="mortlabel" htmlFor="hvalue">
                  Home Value :
                </label>
              </div>
              <div className="sm:col-span-2">
                <div className="w-full flex justify-stretch border-2 rounded-md">
                  <span className="p-3 bg-gray-100" id="basic-addon1">
                    $
                  </span>
                  <input
                    type="text"
                    className="py-2 px-2 "
                    aria-describedby="basic-addon1"
                    id="hvalue"
                    value={calculatordata.hvalue}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 my-3">
              <div className="col-sm-4 flex items-center">
                <label htmlFor="dpay" className="mortlabel">
                  Down Payment :
                </label>
              </div>
              <div className="sm:col-span-2">
                <div className="w-full flex justify-stretch border-2 rounded-md">
                  <span className="p-3  bg-gray-100">$</span>
                  <input
                    type="text"
                    className="py-2 px-2 flex-grow"
                    id="dpay"
                    value={calculatordata.dpay}
                    onChange={handleChange}
                  />
                  <input
                    type="number"
                    className="py-2 px-2 flex-grow"
                    id="dper"
                    value={calculatordata.dper}
                    onChange={handleChange}
                  />
                  <span className="p-3 rounn bg-gray-100">%</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3  my-3">
              <div className="col-sm-4 flex items-center">
                <label htmlFor="loanamt" className="mortlabel">
                  Mortgage Amt :
                </label>
              </div>
              <div className="sm:col-span-2">
                <div className="w-full flex justify-stretch border-2 rounded-md">
                  <span className="p-3 bg-gray-100" id="basic-addon2">
                    $
                  </span>
                  <input
                    type="text"
                    className="py-2 px-2 flex-grow"
                    aria-describedby="basic-addon2"
                    id="loanamt"
                    value={calculatordata.loanamt}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3  my-3">
              <div className="col-sm-4 flex items-center">
                <label htmlFor="intrate" className="mortlabel">
                  Interest Rate :
                </label>
              </div>
              <div className="sm:col-span-2">
                <div className="w-full flex justify-stretch border-2 rounded-md">
                  <input
                    type="number"
                    className="py-2 px-2 flex-grow"
                    aria-describedby="basic-addon3"
                    id="intrate"
                    value={calculatordata.intrate}
                    onChange={handleChange}
                  />
                  <span className="p-3 bg-gray-100" id="basic-addon3">
                    %
                  </span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3  my-3">
              <div className="col-sm-4 flex items-center">
                <label htmlFor="loanterm" className="mortlabel">
                  Mortgage Term :
                </label>
              </div>
              <div className="sm:col-span-2">
                <div className="w-full flex justify-stretch border-2 rounded-md">
                  <input
                    type="number"
                    className="py-2 px-2 flex-grow"
                    aria-describedby="basic-addon4"
                    id="loanterm"
                    value={calculatordata.loanterm}
                    onChange={handleChange}
                  />
                  <span className="p-3 bg-gray-100" id="basic-addon4">
                    Yrs
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-mine bg-gray-100 flex items-center flex-column flex-md-grid mb-4">
            <div className="p-3 rounded-mine">
              <h3 className="fs-2 font-bold text-mine">
                ${calculated} <span className="fs-5 text-secondary">/mo</span>
              </h3>
              <p className="text-secondary">
                Your Estimated Monthly Mortgage Payment.
              </p>
            </div>
            <svg width="400" height="400" className="">
              {(calculatordata.loanamt > 10 || intrest > 10) && (
                <>
                  <VictoryPie
                    standalone={false}
                    width={400}
                    height={400}
                    data={[
                      {
                        x: `Mortgage \n$ ${parseInt(
                          calculatordata.loanamt
                        ).toLocaleString()}`,
                        y: parseInt(calculatordata.loanamt),
                      },
                      {
                        x: `Interest \n $ ${parseInt(
                          intrest
                        ).toLocaleString()}`,
                        y: parseInt(intrest),
                      },
                    ]}
                    innerRadius={68}
                    labelRadius={100}
                    padding={{ left: 120, right: 120 }}
                    colorScale={["rgb(82 170 146)", "rgb(82 130 146)"]}
                  />
                  <VictoryLabel
                    textAnchor="middle"
                    style={style}
                    x={200}
                    y={200}
                    text={"$" + calculated + "/mo"}
                  />
                </>
              )}
            </svg>
          </div>
        </div>
        <div className="mt-40 rounded-md p-6">
          <h1 className="text-4xl font-bold leading-8 mb-5">
            Steps to calculate your payments using a mortgage calculator{" "}
          </h1>
          1. Determine the purchase price of the home.
          <br />
          <br />
          2. Calculate the down payment (usually 5-20% of the purchase price in
          Canada).
          <br />
          <br />
          3. Subtract the down payment from the purchase price to get the
          mortgage amount.
          <br />
          <br />
          4. Choose a mortgage term (typically 5 years in Canada) and
          amortization period (usually 25-30 years).
          <br />
          <br />
          5. Determine the interest rate (check current rates from Canadian
          lenders).
          <br />
          <br />
          6. Use a mortgage calculator or formula to determine the monthly
          payment based on the mortgage amount, interest rate, and amortization
          period.
          <br />
          <br />
          7. Factor in additional costs like property taxes, home insurance, and
          possibly mortgage insurance if the down payment is less than 20%.
          <br />
          <br />
          8. Consider the impact of making accelerated bi-weekly payments
          instead of monthly payments to pay off the mortgage faster.
          <br />
          <br />
          9. Review the total interest paid over the life of the mortgage.
          <br />
          <br />
          10. Ensure the monthly payments fit within your budget, typically not
          exceeding 32% of your gross monthly income for housing costs.
          <br />
          <br />
        </div>
        <div className="mt-40 rounded-md p-6">
          <h1 className="text-4xl font-bold mb-5">Terms Explained</h1>
          <b>Home Value:</b> The current market value or purchase price of the
          property.
          <br />
          <br />
          <b>Down Payment:</b> The initial upfront portion of the total home
          purchase price paid by the buyer.
          <br />
          <br />
          <b>Mortgage Amount:</b> The amount borrowed from a lender to purchase
          the home (Home Value minus Down Payment).
          <br />
          <br />
          <b>Interest Rate:</b> The percentage charged by the lender for
          borrowing the money, usually expressed as an annual rate.
          <br />
          <br />
          <b>Mortgage Term:</b> The length of time your mortgage agreement and
          interest rate are in effect (typically 1-5 years in Canada).
          <br />
          <br />
          <b>Amortization Period:</b> The total length of time it will take to
          pay off the entire mortgage (usually 25-30 years in Canada).
          <br />
          <br />
          <b>Monthly Payment:</b> The amount paid each month towards the
          mortgage, including principal and interest.
          <br />
          <br />
          <b>Principal:</b> The original amount borrowed, which decreases as
          payments are made.
          <br />
          <br />
          <b>CMHC Insurance:</b> Mortgage default insurance required for down
          payments less than 20% of the home's value.
          <br />
          <br />
          <b>Property Taxes:</b> Annual taxes levied by local governments based
          on the property's assessed value.
          <br />
          <br />
          <b>Home Insurance:</b> Coverage to protect the property against damage
          or loss.
          <br />
          <br />
          <b>Land Transfer Tax:</b> A tax paid to the provincial government when
          purchasing a property.
          <br />
          <br />
          <b>Closing Costs:</b> Additional expenses incurred when finalizing a
          home purchase (legal fees, inspections, etc.).
          <br />
          <br />
          <b>Prepayment Privileges:</b> Options to pay extra towards the
          mortgage without penalties.
          <br />
          <br />
          <b>Fixed Rate Mortgage:</b> A mortgage where the interest rate remains
          constant for the term.
          <br />
          <br />
          <b>Variable Rate Mortgage:</b> A mortgage where the interest rate can
          fluctuate based on the prime rate.
          <br />
          <br />
          <b>Refinancing:</b> The process of replacing an existing mortgage with
          a new one, often to take advantage of better terms or rates.
          <br />
          <br />
          These terms are commonly used in mortgage calculations and discussions
          about home financing in Canada.
        </div>
      </div>
      {/* <div className="mortgg3 px-5">
        <span className="text-danger">*</span>
        This calculator is for demonstration purposes only. The Canadian Real
        Estate Association does not guarantee that all calculations are
        accurate. Always consult a professional financial advisor before making
        personal financial decisions.
      </div> */}
    </div>
  );
}
