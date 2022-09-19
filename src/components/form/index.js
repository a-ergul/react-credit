import React, { useEffect, useState } from "react";
import Card from "../card";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

const AddForm = (props) => {
  const [loanAmount, setLoanAmount] = useState("");
  const [numberOfInstallments, setNumberOfInstallments] = useState(0);
  const [profitRate, setProfitRate] = useState("");
  const [installmentType, setInstallmentType] = useState("");
  const [bsmvRate, setBsmvRate] = useState("");
  const [kkdfRate, setKkdfRate] = useState("");

  const [dates, setDates] = useState([]);

  // dialog ekranı için yapılan işlemler

  const [displayBasic, setDisplayBasic] = useState(false);

  const dialogFuncMap = {
    displayBasic: setDisplayBasic,
  };

  const onClick = (name, position) => {
    dialogFuncMap[`${name}`](true);
  };
  const onHide = (name) => {
    dialogFuncMap[`${name}`](false);
  };

  const headerBody = (
    <div className="dialog-header">
      <label>Geri Ödeme Tablosu</label>
    </div>
  );

  // input alanlarına girilen değerler için effect fonksiyonu çağırma

  useEffect(() => {
    setLoanAmount("");
    setNumberOfInstallments("");
    setProfitRate("");
    setInstallmentType("");
    setBsmvRate("");
    setKkdfRate("");
  }, []);

  // Kredi tutarı üzerinden yapılan matematik işlemleri

  const getInterest = (month) => {
    let amountRepaid = loanAmount - getPrincipal(month);
    let interestedAmount = (amountRepaid * profitRate) / 100;
    return Math.round((interestedAmount + Number.EPSILON) * 100) / 100;
  };

  const getPrincipal = (month) => {
    let dividedAmount = (loanAmount / numberOfInstallments) * month;
    return Math.round(((dividedAmount + Number.EPSILON) * 100) / 100);
  };

  const getKkdf = (month) => {
    let kkdfAmount = (getInterest(month) * kkdfRate) / 100;
    return Math.round(((kkdfAmount + Number.EPSILON) * 100) / 100);
  };

  const getBsmv = (month) => {
    let bsmvAmount = (getInterest(month) * bsmvRate) / 100;
    return Math.round(((bsmvAmount + Number.EPSILON) * 100) / 100);
  };

  const getPayment = () => {
    return parseFloat(
      (loanAmount *
        ((profitRate / 100) * (1 + kkdfRate / 100 + bsmvRate / 100))) /
        (1 -
          1 /
            Math.pow(
              1 + (profitRate / 100) * (1 + kkdfRate / 100 + bsmvRate / 100),
              numberOfInstallments
            ))
    ).toLocaleString("tr-TR");
  };

  // Ödeme Ekranı için oluşturulan taksit sayısına bağlı zaman işlemi

  useEffect(() => {
    let datesArray = [];

    for (let i = 0; i < numberOfInstallments; i++) {
      let number = 0;
      number = number + 1 + i;
      // date = new Date(date.setMonth(date.getMonth() + 1 + i));
      datesArray.push({
        number: `${number}`,
        month: i,
      });
    }
    setDates(datesArray);
  }, [numberOfInstallments]);

  const addFormHandler = (e) => {
    e.preventDefault();
    props.onAddForm(
      loanAmount,
      numberOfInstallments,
      profitRate,
      installmentType,
      bsmvRate,
      kkdfRate
    );
  };

  return (
    <div>
      <Card className="card-container">
        <form onSubmit={addFormHandler}>
          <div className="form-container">
            <div className="form-content">
              <label
                htmlFor="loanAmount"
                style={{ paddingLeft: 3, paddingBottom: 5 }}
              >
                Kredi Tutarı (Ana Para)
              </label>
              <input
                id="loanAmount"
                style={{
                  height: 40,
                  width: 250,
                  borderRadius: 4,
                  fontWeight: 600,
                  fontSize: 20,
                }}
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
              ></input>
            </div>
            <div className="form-content">
              <label
                htmlFor="numberOfInstallments"
                style={{ paddingBottom: 5 }}
              >
                Taksit Sayısı
              </label>
              <input
                id="amount"
                style={{
                  height: 40,
                  width: 250,
                  borderRadius: 4,
                  fontWeight: 600,
                  fontSize: 20,
                }}
                value={numberOfInstallments}
                onChange={(e) => setNumberOfInstallments(e.target.value)}
              ></input>
            </div>
          </div>
          <div className="form-container">
            <div className="form-content">
              <label
                htmlFor="profitRate"
                style={{ paddingLeft: 3, paddingBottom: 5 }}
              >
                Kâr Oranı
              </label>
              <input
                id="amount"
                style={{
                  height: 40,
                  width: 250,
                  borderRadius: 4,
                  fontWeight: 600,
                  fontSize: 20,
                }}
                value={profitRate}
                onChange={(e) => setProfitRate(e.target.value)}
              ></input>
            </div>
            <div className="form-content">
              <label htmlFor="installmentType" style={{ paddingBottom: 5 }}>
                Taksit Aralığı Seçimi
              </label>
              <select
                id="amount"
                style={{
                  height: 48,
                  width: 258,
                  borderRadius: 4,
                  fontWeight: 600,
                  fontSize: 20,
                }}
                value={installmentType}
                onChange={(e) => setInstallmentType(e.target.value)}
              >
                <option value="aylık">Aylık</option>
                <option value="Yıllık">Yıllık</option>
                <option value="haftalık">Haftalık</option>
              </select>
            </div>
          </div>
          <div className="form-container">
            <div className="form-content">
              <label
                htmlFor="bsmvRate"
                style={{ paddingLeft: 3, paddingBottom: 5 }}
              >
                BSMV Oranı
              </label>
              <input
                id="amount"
                style={{
                  height: 40,
                  width: 250,
                  borderRadius: 4,
                  fontWeight: 600,
                  fontSize: 20,
                }}
                value={bsmvRate}
                onChange={(e) => setBsmvRate(e.target.value)}
              ></input>
            </div>
            <div className="form-content">
              <label htmlFor="kkdfRate" style={{ paddingBottom: 5 }}>
                KKDF Oranı
              </label>
              <input
                id="amount"
                style={{
                  height: 40,
                  width: 250,
                  borderRadius: 4,
                  fontWeight: 600,
                  fontSize: 20,
                }}
                value={kkdfRate}
                onChange={(e) => setKkdfRate(e.target.value)}
              ></input>
            </div>
          </div>
          <div className="form-container">
            <div className="form-container-button">
              <button className="form-button" type="Submit">
                Hesapla
              </button>
            </div>
          </div>
        </form>
        <div className="form-container-button">
          <Button
            onClick={() => onClick("displayBasic")}
            label="Ödeme Tablosu"
            className="form-button"
          />
          <Dialog
            onHide={() => onHide("displayBasic")}
            header={headerBody}
            visible={displayBasic}
            style={{
              width: "fit-content",
              backgroundColor: "#575d88",
              color: "white",
              borderRadius: 20,
            }}
          >
            <table>
              <thead className="table-body">
                <tr>
                  <th scope="col">Taksit No</th>
                  <th scope="col">Aylık Taksit</th>

                  <th scope="col">Kâr Tutarı</th>
                  <th scope="col">BSMV</th>
                  <th scope="col">Kkdf</th>
                </tr>
              </thead>
              <tbody className="table-body">
                {dates.map((emi, index) => {
                  const { number, month } = emi;
                  return (
                    <tr key={index}>
                      <td>{number}</td>
                      <td>{getPayment()}₺</td>
                      <td>{getInterest(month).toFixed(2)}₺</td>
                      <td>{getKkdf(month).toFixed(2)}</td>
                      <td>{getBsmv(month).toFixed(2)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Dialog>
        </div>
      </Card>
    </div>
  );
};

export default AddForm;
