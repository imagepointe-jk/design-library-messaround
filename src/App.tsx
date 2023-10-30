import { useState } from "react";
import "./App.css";

const accessToken =
  "sl.BokVPDmzm10ZsnsOdxLqKE6VxXkT3GorZbUwVWhUApm0JyVyZt-sAbdaKrm4JT30gVr_vOMyPjwIIjNyespv1_F0EQvmMO7c5DUOSMPZ0yHc6cT02dQiN5uFCh_YBdLKPd7Fxzo-txMF";
const apiUrl = "https://content.dropboxapi.com/2/files/download";

function App() {
  const [url, setUrl] = useState(undefined as string | undefined);

  function click() {
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Dropbox-API-Arg": JSON.stringify({
          path: "/American Benchraft-Leather Tree Ornament.png",
        }),
      },
    };
    fetch(apiUrl, requestOptions)
      .then((res) => {
        if (res.status === 200) {
          return res.blob();
        } else {
          console.log(res);
          res.text().then((text) => console.log(text));
          throw new Error("Failed to download");
        }
      })
      .then((blob) => {
        const imageUrl = URL.createObjectURL(blob);
        setUrl(imageUrl);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div>
      {url && <img src={url}></img>}
      <button onClick={click}>Click</button>
    </div>
  );
}

export default App;
