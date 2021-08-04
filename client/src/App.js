import React, { useEffect, useState } from "react";
import Helloabi from "./contracts/Hello.json";
import Web3 from "web3";
import Navbar from "./Navbar";

const App = () => {
  const [refresh, setrefresh] = useState(0);

  let content;
  const [loading2, setloading2] = useState(false);

  const [account, setAccount] = useState("");
  const [loading, setLoading] = useState(true);
  const [Hello, setHello] = useState({});

  const loadWeb3 = async () => {
    if (window.ethereum) {
      await window.ethereum.enable();
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };

  const loadBlockchainData = async () => {
    setLoading(true);
    if (
      typeof window.ethereum == "undefined" 
    ) {
      return;
    }
    const web3 = new Web3(window.ethereum);

    let url = window.location.href;
    console.log(url);

    const accounts = await web3.eth.getAccounts();

    if (accounts.length == 0) {
      return;
    }
    setAccount(accounts[0]);
    const networkId = await web3.eth.net.getId();
    
    
    if (networkId == 42) {
      // const hello = new web3.eth.Contract(Helloabi.abi, networkData.address);
      const hello = {}
      setHello(hello);

      setLoading(false);
    } else {
      window.alert("the contract not deployed to detected network.");
      setloading2(true);
    }
  };

  const onclick = async (a) => {
    const web3 = new Web3(window.web3);
    await Hello.methods
      .setCompleted(a.toString())
      .send({ from: account })
      .once("recepient", (recepient) => {
        console.log("success");
      })
      .on("error", () => {
        console.log("error");
      });
  };

  const walletAddress = async () => {
    await window.ethereum.request({
      method: "eth_requestAccounts",
      params: [
        {
          eth_accounts: {},
        },
      ],
    });
    window.location.reload();
  };

  useEffect(() => {
    loadWeb3();
    loadBlockchainData();

    if (refresh == 1) {
      setrefresh(0);
      loadBlockchainData();
    }
    //esl
  }, [refresh]);

  if (loading === true) {
    content = (
      <p className="text-center">
        Loading...{loading2 ? <div>loading....</div> : ""}
      </p>
    );
  } else {
    content = (
      <div class="container">
        <main role="main" class="container">
          <div class="jumbotron">
            <h1>Project</h1>
            <div className="row" style={{ paddingTop: "30px" }}>
              {" "}
              <div className="row" style={{ paddingLeft: "40px" }}>
                <h3>text 1</h3>
              </div>
              <div className="row" style={{ paddingLeft: "40px" }}>
                <h3>text 2</h3>
              </div>
              <div className="row" style={{ paddingLeft: "40px" }}>
                <h3>text 3</h3>
              </div>
              <div className="row" style={{ paddingLeft: "40px" }}>
                <button className="btn btn-primary">Click on it</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div>
      <Navbar account={account} />

      {account == "" ? (
        <div className="container">
          {" "}
          Connect your wallet to application{"   "}{" "}
          <button onClick={walletAddress}>metamask</button>
        </div>
      ) : (
        content
      )}
      {/* {content} */}
    </div>
  );
};

export default App;
