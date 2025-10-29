import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import logoImg from './assets/nr.png';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useFetchOrderQuery } from "./apiroute.js";
const cellStyle = {
  border: "1px solid #ccc",
  padding: "8px 16px",
  textAlign: "left",
};


const A4_WIDTH_PX = 794;
const A4_HEIGHT_PX = 1123;
const a4Style = {
  width: `${A4_WIDTH_PX}px`,
  minHeight: `${A4_HEIGHT_PX}px`,
  background: "#fff",
  margin: "0 auto",
  boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  padding: 40,
  position: "relative",
};

const InvoicePage = () => {
  const { orderId } = useParams();
 
  const invoiceRef = useRef();
  const { data: order, isLoading: isOrdersLoading, error } = useFetchOrderQuery(orderId);
  
  if (isOrdersLoading) return <div>Loading...</div>;
  if (!order || !order._id) return <div>Order not found</div>;

  const handleDownloadPDF = async () => {
    const element = invoiceRef.current;
    const canvas = await html2canvas(element, {
      scale: 2,
      width: A4_WIDTH_PX,
      height: A4_HEIGHT_PX,
      backgroundColor: "#fff",
    });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4",
    });
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`invoice_${order._id.slice(-8).toUpperCase()}.pdf`);
  };

  return (
    <div>
      <button
        onClick={handleDownloadPDF}
        style={{
          margin: "20px 0",
          padding: "10px 20px",
          background: "#000",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          float: "right"
        }}
      >
        Download PDF
      </button>
      <div
        ref={invoiceRef}
        className="a4-invoice" // TEMP: for print CSS
        style={{
          ...a4Style,
          fontFamily: "Arial, sans-serif",
        }}
      >
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
            <strong>National Refrigeration Spare Parts</strong>
            <br />
            New Hargobind Marg
            <br />
            Ludhiana, Punjab
            <br />
            99141-06783
          </div>
          <img
            src={logoImg}
            alt="Logo"
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
          <div style={{ fontSize: 14, fontWeight: "SemiBold" }}>
            <div style={{ fontSize: 18, marginBottom: 10 }}>Bill To:</div>
            Name: {order.deliveryDetails?.name || "Customer"}
            {order.deliveryDetails?.address && (
              <>
                <br />
                Address: {order.deliveryDetails.address}
              </>
            )}
            <br />
            Mobile: {order.deliveryDetails?.mobile || "N/A"}
            <br />
            City: {order.deliveryDetails?.city || "N/A"}
            <br />
            Pincode: {order.deliveryDetails?.pincode || "N/A"}
          </div>
          <table style={{ borderCollapse: "collapse" }}>
            <tbody>
              <tr>
                <td style={cellStyle}>Invoice #</td>
                <td style={cellStyle}>{order._id.slice(-8).toUpperCase()}</td>
              </tr>
              <tr>
                <td style={cellStyle}>Date</td>
                <td style={cellStyle}>{new Date(order.orderDate).toLocaleDateString()}</td>
              </tr>
              <tr>
                {/* <td style={cellStyle}>Amount Due</td> */}
                {/* <td style={cellStyle}>
                  ₹{order.totalAmount}
                </td> */}
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
            {order.items.map((item, idx) => (
              <tr key={idx}>
                <td style={cellStyle}>{item.name || item.title}</td>
                <td style={cellStyle}>{item.heading || "-"}</td>
                <td style={cellStyle}>₹{item.newprice || item.price}</td>
                <td style={cellStyle}>{item.quantity}</td>
                <td style={cellStyle}>₹{(item.newprice || item.price) * item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals */}
        <div style={{ float: "right", marginTop: 20 }}>
          <table style={{ borderCollapse: "collapse" }}>
            <tbody>
              <tr>
                <td style={cellStyle}>Total</td>
                <td style={cellStyle}>₹{order.totalAmount}</td>
              </tr>
              {/* <tr>
                <td style={cellStyle}>Amount Paid</td>
                <td style={cellStyle}>₹0.00</td>
              </tr>
              <tr>
                <td style={cellStyle}>Balance Due</td>
                <td style={cellStyle}>₹{order.totalAmount}</td>
              </tr> */}
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
          <div style={{marginLeft:100}}>
            A finance charge of 1.5% will be made on unpaid balances after 30 days.
          </div>
        </div>
        {/* Declaration and Signature Section (TEMP) */}
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 60 }}>
          <tbody>
            <tr>
              <td style={{
                border: "1px solid #000",
                verticalAlign: "top",
                padding: "8px 12px",
                width: "65%",
                fontSize: 14
              }}>
                <strong>Declaration</strong><br />
                We declare that this invoice shows the actual price of the goods described and that all particulars are true and correct.
              </td>
              <td style={{
                border: "1px solid #000",
                verticalAlign: "top",
                padding: "8px 12px",
                textAlign: "right",
                fontSize: 14,
                width: "35%"
              }}>
                <div style={{ fontWeight: "bold", marginBottom: 40 }}>
                  for National Refrigeration Spare Parts, Ludhiana
                </div>
                <div style={{ marginTop: 40 }}>
                  Authorised Signatory
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* TEMP: Print CSS for A4 size */}
      <style>{`
        @media print {
          .a4-invoice {
            width: 210mm !important;
            min-height: 297mm !important;
            box-shadow: none !important;
            margin: 0 !important;
            padding: 0 !important;
            background: #fff !important;
          }
          body {
            background: #fff !important;
          }
        }
      `}</style>
    </div>
  );
};

export default InvoicePage;
