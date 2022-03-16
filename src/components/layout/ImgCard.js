import React from "react";

const ImgCard = ({ card_data }) => {
  console.log(card_data);
  return (
    <div className="hover:cursor-pointer hover:opacity-50">
      <img src={card_data.urls.regular} alt="" className="" />
    </div>
  );
};

export default ImgCard;
