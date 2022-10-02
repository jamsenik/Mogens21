var address:IpAddress;
export async function GetIpAddress(): Promise<string> {
    console.log("Getting address");
    if (address === undefined) {
        address = (await (await fetch("https://api.ipify.org?format=json")).json()) as IpAddress
    }
    console.log("Ip address", address);
    return address.ip;
}

type IpAddress = {
    ip: string;
  }
