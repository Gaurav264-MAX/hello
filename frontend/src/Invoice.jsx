import React from "react";

const cellStyle = {
  border: "1px solid #ccc",
  padding: "8px 16px",
  textAlign: "left",
};

const Invoice = () => (
  <div style={{ fontFamily: "Arial, sans-serif", margin: 40 }}>
    {/* Header */}
    <div style={{ textAlign: "center", marginBottom: 30 }}>
      <div
        style={{
          background: "#000",
          color: "#fff",
          padding: "10px 0",
          letterSpacing: 8,
          fontSize: 20,
        }}
      >
        INVOICE
      </div>
    </div>

    {/* Company Info and Logo */}
    <div style={{ position: "relative", minHeight: 100 }}>
      <div>
        <strong>MAHESH NANDENNAGARI</strong>
        <br />
        #429, First Floor
        <br />
        Bettadasanapura
        <br />
        +918660876889
      </div>
      <img
        src="https://i.imgur.com/1Q9Z1Zm.png"
        alt="Makesh Logo"
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          width: 120,
        }}
      />
    </div>

    {/* Client Info and Invoice Details */}
    <div style={{ marginTop: 60, display: "flex", justifyContent: "space-between" }}>
      <div style={{ fontSize: 22, fontWeight: "bold" }}>Infosys LTD</div>
      <table style={{ borderCollapse: "collapse" }}>
        <tbody>
          <tr>
            <td style={cellStyle}>Invoice #</td>
            <td style={cellStyle}>101138</td>
          </tr>
          <tr>
            <td style={cellStyle}>Date</td>
            <td style={cellStyle}>January 1, 2012</td>
          </tr>
          <tr>
            <td style={cellStyle}>Amount Due</td>
            <td style={cellStyle}>$600.00</td>
          </tr>
        </tbody>
      </table>
    </div>

    {/* Items Table */}
    <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 40 }}>
      <thead>
        <tr>
          <th style={cellStyle}>Item</th>
          <th style={cellStyle}>Description</th>
          <th style={cellStyle}>Rate</th>
          <th style={cellStyle}>Quantity</th>
          <th style={cellStyle}>Price</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={cellStyle}>-Front End Consultation</td>
          <td style={cellStyle}>Experience Review</td>
          <td style={cellStyle}>$150.00</td>
          <td style={cellStyle}>4</td>
          <td style={cellStyle}>$600.00</td>
        </tr>
      </tbody>
    </table>

    {/* Totals */}
    <div style={{ float: "right", marginTop: 20 }}>
      <table style={{ borderCollapse: "collapse" }}>
        <tbody>
          <tr>
            <td style={cellStyle}>Total</td>
            <td style={cellStyle}>$600.00</td>
          </tr>
          <tr>
            <td style={cellStyle}>Amount Paid</td>
            <td style={cellStyle}>$0.00</td>
          </tr>
          <tr>
            <td style={cellStyle}>Balance Due</td>
            <td style={cellStyle}>$600.00</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div style={{ clear: "both" }} />

    {/* Additional Notes */}
    <hr style={{ marginTop: 80 }} />
    <div style={{ marginTop: 40 }}>
      <div
        style={{
          textAlign: "center",
          letterSpacing: 8,
          fontWeight: "bold",
          marginBottom: 10,
        }}
      >
        ADDITIONAL NOTES
      </div>
      <div>
        A finance charge of 1.5% will be made on unpaid balances after 30 days.
      </div>
    </div>
  </div>
);

export default Invoice;