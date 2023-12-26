export async function postData(url = "", data = {}, isServer = false) {
  const host = isServer ? "http://43.143.254.158/api" : "/api";
  const realUrl = host + `/${url}`;
  let d = {};
  try {
    // Default options are marked with *
    const response = await fetch(realUrl, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    }).catch();
    d = await response.json();
  } catch (e) {
    console.log(e);
  }

  return d as any; // parses JSON response into native JavaScript objects
}
