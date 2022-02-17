


export const fetchApi=async (url,data)=> {
    const response = await fetch(url, {
        method: 'POST',
        // headers: {
        //   // 'Content-Type': 'application/json',
        //   // 'Content-Type': 'application/x-www-form-urlencoded',
          // "Content-Type": "multipart/form-data",
          // "accept": "*/*",
        // },
        // dataType: "text",
        dataType: "form-data",
        // redirect: 'follow', // manual, *follow, error
        // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: data // body data type must match "Content-Type" header
      })
      .then(res=> res.json())
      .then(res=> res)
      .catch(err=>console.log(err))
      return response
}