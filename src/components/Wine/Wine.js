import React, { useState } from "react";
import "./Wine.css";
import Tag from "../Tag/Tag";

const Wine = ({}) => {
  return (
    <div className="wine">
      <div className="wine__image">
        <img src="https://images.vivino.com/thumbs/MhiwIbE4TmSLMfjD-EKYjg_pb_x300.png"></img>
      </div>
      <div className="wine__detail">
        <div className="wine__title">La Crema Sonoma Coast Pinotasdf Noir</div>
        <div className="wine__tags">
          <Tag isFilled={1} txt="picnic" />
          <Tag isFilled={1} txt="dry" />
          <Tag isFilled={1} txt="steak" />
          <Tag isFilled={1} txt="oak" />
          <Tag isFilled={0} txt="rose" />
          <Tag isFilled={0} txt="cherry" />
        </div>
        <div className="wine__rate">★4.5</div>
        <div className="wine__price">₩17,000</div>
      </div>
    </div>
  );
};

export default Wine;
