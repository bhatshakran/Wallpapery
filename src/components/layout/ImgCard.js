import React, { forwardRef } from "react";

const ImgCard = forwardRef(({ card_data }, ref) => {
  return (
    <div className="hover:cursor-pointer hover:opacity-50" ref={ref}>
      <img src={card_data.urls.regular} alt="" className="" />
    </div>
  );
});

export default ImgCard;
