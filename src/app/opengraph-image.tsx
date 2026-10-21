import { ImageResponse } from "next/og";

export const alt = "Ahmed Raza · MERN Stack Developer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#F5F5DC", // Beige background
          padding: "40px",
        }}
      >
        {/* Inner thin border frame in surface cream */}
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#FFFEF7",
            border: "2px solid #DED9BE",
            borderRadius: "20px",
            padding: "40px 60px",
            textAlign: "center",
          }}
        >
          {/* Eyebrow */}
          <div
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: "#008080",
              letterSpacing: "4px",
              textTransform: "uppercase",
              marginBottom: "20px",
              fontFamily: "sans-serif",
            }}
          >
            MERN STACK DEVELOPER · KARACHI, PAKISTAN
          </div>

          {/* Name in deep teal bold */}
          <div
            style={{
              fontSize: 84,
              fontWeight: 900,
              color: "#004C4C",
              letterSpacing: "-2px",
              lineHeight: 1.1,
              marginBottom: "24px",
              fontFamily: "sans-serif",
            }}
          >
            Ahmed Raza
          </div>

          {/* Role line in primary teal */}
          <div
            style={{
              fontSize: 30,
              fontWeight: 700,
              color: "#008080",
              lineHeight: 1.4,
              maxWidth: "850px",
              fontFamily: "sans-serif",
            }}
          >
            E-Commerce Specialist & Next.js Developer
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
