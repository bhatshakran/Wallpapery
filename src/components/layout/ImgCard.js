import React from "react";

const ImgCard = ({ card_data }) => {
  console.log(card_data);
  return (
    <div>
      <img
        src={card_data.urls.regular}
        alt=""
        className="object-cover w-full h-full"
      />
    </div>
  );
};

export default ImgCard;
