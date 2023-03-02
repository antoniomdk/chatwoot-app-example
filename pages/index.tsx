import { useEffect, useState } from "react";

export default function IndexPage() {
  const [chatwootData, setChatwootData] = useState<any>(null);

  useEffect(() => {
    window.addEventListener("message", (event) => {
      try {
        const eventData = JSON.parse(event.data);
        if (eventData?.event === "appContext") {
          setChatwootData(eventData);
        } else {
          console.log(eventData);
        }
      } catch (e) {}
    });
  }, []);

  return (
    <main>
      <h1>Chatwoot App Example</h1>
      <p>{chatwootData && JSON.stringify(chatwootData)}</p>
    </main>
  );
}
