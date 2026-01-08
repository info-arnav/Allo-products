import Script from "next/script";

export default function Schema({ json }) {
  return (
    <Script
      id={`schema-json-${Math.floor(1000 + Math.random() * 9000)}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(json).replace(/</g, "\\u003c"),
      }}
    />
  );
}
