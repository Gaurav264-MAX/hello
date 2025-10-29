import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ProductCard = () => {
  return (
    <div className="w-100 min-vh-100 bg-light d-flex justify-content-center align-items-center">
      <div className="w-100 p-4">
        <div className="card shadow-sm w-100">
          <div className="card-body">
            {/* Price & Discount */}
            <div className="d-flex align-items-center">
              <span className="text-danger fw-bold fs-4">-66%</span>
              <span className="ms-2 fw-bold fs-3">₹339</span>
            </div>
            <p className="text-muted text-decoration-line-through mb-1">M.R.P: ₹999</p>
            <p className="text-secondary">Inclusive of all taxes</p>

            {/* Amazon Pay UPI */}
            <p className="text-primary small">
              Set up your <strong>Amazon Pay UPI</strong> account. Enjoy faster payments & instant refunds.
            </p>

            {/* Offers & Discounts */}
            <div className="border-top pt-2">
              <p className="fw-bold">All offers & discounts</p>
              <p className="small">
                <strong>₹100 off</strong> on orders above ₹1,000 on <strong>UCO Bank Debit Card</strong>
              </p>
              <p className="text-muted small">Add items worth ₹821 to avail offer</p>
            </div>

            {/* Warranty */}
            <div className="border-top pt-2">
              <p className="fw-bold">Warranty</p>
              <p className="small">Protection against product failure</p>
            </div>

            {/* Total Price & Delivery */}
            <div className="border-top pt-2">
              <p className="fw-bold fs-5">Total: ₹339</p>
              <p className="text-primary small">
                <strong>FREE delivery</strong> Friday, 28 March
              </p>
              <p className="small text-muted">
                Or fastest delivery <strong>Tomorrow, 26 March</strong>. Order within{" "}
                <span className="text-success fw-bold">1 hr 12 mins</span>.
              </p>
            </div>

            {/* Delivery Location */}
            <div className="border-top pt-2 small">
              Deliver to <strong>Ekampreet - Ludhiana 141008</strong>
            </div>

            {/* Questions */}
            <div className="mt-3 d-flex flex-wrap gap-2">
              <button className="btn btn-outline-primary btn-sm flex-grow-1">
                Does it work with all car models?
              </button>
              <button className="btn btn-outline-primary btn-sm flex-grow-1">
                Is installation difficult?
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
