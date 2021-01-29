import React from "react";

const OrderPreviewForm = ({ match }) => {
  return <h2>{`معاينة الفاتورة رقم  ${match.params.id}`}</h2>;
};

export default OrderPreviewForm;
