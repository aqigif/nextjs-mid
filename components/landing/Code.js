import React, { useState } from "react";

function Code() {
  const [hover, setHover] = useState("");
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: 788,
      }}
    >
      {icon.map((item) => (
        <img
          onMouseEnter={() => setHover(item)}
          onMouseLeave={() => setHover("")}
          src={`/code/${item}-${item === hover ? "on" : "off"}.png`}
          alt={item}
        />
      ))}
    </div>
  );
}

const icon = ["html", "css", "js", "react", "js1", "sql", "docker"];

export default Code;
