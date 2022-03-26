import React, {ChangeEvent, useState} from "react";
import axios from "axios";

export default function ZipApp(){

type Zipcode = {
  First: string;
  Second: string;
}

type Address = {
  address1:string;
  address2:string;
  address3:string
}


const [zipcode, setZipcode] = useState<Zipcode>({
  First:"",
  Second:""
});

const [address, setAddress] = useState<Address>({
  address1:"",
  address2:"",
  address3:"",
});

const updateZipcodeFirst = (e: ChangeEvent<HTMLInputElement>) => {
  setZipcode({...zipcode, First: e.target.value }); //スプレッド構文 
};

const updateZipcodeSecond = async(e: ChangeEvent<HTMLInputElement>) =>{
  setZipcode({ ...zipcode, Second: e.target.value });
  if(zipcode.First.length === 3 && e.target.value.length === 4){
  try{
    const res = await axios.get(
      "https://zipcloud.ibsnet.co.jp/api/search",
      {
      params: {
        zipcode: zipcode.First + e.target.value
      }
      }
    );

    if(res.data.results) {
      const result = res.data.results[0];
      setAddress({
        ...address,
        address1: result["address1"],
        address2: result["address2"],
        address3: result["address3"]
      });
    }
  } catch {
    alert("住所の取得に失敗しました");
  }
  }
};


return (
  <React.Fragment>
  <div>
    <h1>郵便番号を入力してください</h1>
    <input type ="text" onChange={updateZipcodeFirst} className="txt_first" value={zipcode.First}></input>
    <span>-</span>
    <input type ="text" onChange={updateZipcodeSecond} className="txt_second" value={zipcode.Second}></input>
  </div>
  <div>
    <p>都道府県： {address.address1}</p>
    <p>市区町村： {address.address2}</p>
    <p>町域： {address.address3}</p>
  </div>
  </React.Fragment>
  );

}
