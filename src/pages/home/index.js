import React, { useEffect, useState } from "react";
import AddForm from "../../components/form";
import Header from "../../components/header";
import Card from "../../components/card";

function HomePage() {
  const [creditData, setCreditData] = useState([]);

  // Formda oluşturulan inputların kullanılması

  const addFormHandler = (amount, installments, rate, type, bsmv, kkdf) => {
    setCreditData(() => {
      return [
        {
          loanAmount: +amount,
          numberInstallments: +installments,
          profitRate: +rate,
          installmentType: +type,
          bsmvRate: +bsmv,
          kkdfRate: +kkdf,
          id: Math.random().toString(),
        },
      ];
    });
  };

  return (
      <div>
        <Header />
        <AddForm onAddForm={addFormHandler} />
        {creditData.length ? (
          <Card className="card-container">
            <div>
              {creditData.map((item) => (
                <div className="card-container-result" key={item.id}>
                  <div className="form-content-result">
                    <h3 className="form-content-result-title">Kredi Tutarı</h3>
                    <div>
                      {item.loanAmount.toLocaleString("tr-TR", {
                        style: "currency",
                        currency: "TRY",
                      })}
                    </div>
                  </div>
                  <div className="form-content-result">
                    <h3 className="form-content-result-title">Kredi Vadesi</h3>
                    <div>{item.numberInstallments.toLocaleString()}</div>
                  </div>
                  <div className="form-content-result">
                    <h3 className="form-content-result-title">Kar Oranı</h3>
                    <div>%{item.profitRate.toLocaleString()}</div>
                  </div>
                  <div className="form-content-result">
                    <h3 className="form-content-result-title">Taksit Tutarı</h3>
                    <div>
                      {parseFloat(
                        (item.loanAmount *
                          ((item.profitRate / 100) *
                            (1 + item.kkdfRate / 100 + item.bsmvRate / 100))) /
                          (1 -
                            1 /
                              Math.pow(
                                1 +
                                  (item.profitRate / 100) *
                                    (1 +
                                      item.kkdfRate / 100 +
                                      item.bsmvRate / 100),
                                item.numberInstallments
                              ))
                      ).toLocaleString("tr-TR", {
                        style: "currency",
                        currency: "TRY",
                      })}
                    </div>
                  </div>
                  <div className="form-content-result">
                    <h3 className="form-content-result-title">
                      Toplam Ödenecek
                    </h3>
                    <div>
                      {parseFloat(
                        (item.numberInstallments *
                          (item.loanAmount *
                            ((item.profitRate / 100) *
                              (1 +
                                item.kkdfRate / 100 +
                                item.bsmvRate / 100)))) /
                          (1 -
                            1 /
                              Math.pow(
                                1 +
                                  (item.profitRate / 100) *
                                    (1 +
                                      item.kkdfRate / 100 +
                                      item.bsmvRate / 100),
                                item.numberInstallments
                              ))
                      ).toLocaleString("tr-TR", {
                        style: "currency",
                        currency: "TRY",
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ) : (
          ""
        )}
      </div>
  );
}

export default HomePage;
