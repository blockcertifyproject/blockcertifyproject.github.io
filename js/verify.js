

function buf2hex(buffer) { // buffer is an ArrayBuffer
    return [...new Uint8Array(buffer)]
        .map(x => x.toString(16).padStart(2, '0'))
        .join('');
}

function compareCwa() {//cwa - certifier's wallet address
    var c1 = document.getElementById("cwa").innerHTML.toLowerCase();
    var c2 = document.getElementById("CompareCwaIp").value.toLowerCase();

    var o1 = "Certifier Addresses Matched";
    var o2 = "Certifier address not matched.";
    if (c1.localeCompare(c2) == 0) {
        document.getElementById("cwamessage").innerHTML = o1;
        document.getElementById("cwamessage").className = "successmsg";
    }
    else {
        document.getElementById("cwamessage").innerHTML = o2;
        document.getElementById("cwamessage").className = "failuremsg";
    }

}


function show1() {
    document.getElementById("form1").style.display = "block";
    document.getElementById("form2").style.display = "none";
    document.getElementById("form3").style.display = "none";

}

function show2() {
    document.getElementById("form1").style.display = "none";
    document.getElementById("form2").style.display = "block";
    document.getElementById("form3").style.display = "none";

}
function show3() {
    document.getElementById("form1").style.display = "none";
    document.getElementById("form2").style.display = "none";
    document.getElementById("form3").style.display = "block";

}


var xhr = new XMLHttpRequest;
xhr.responseType = 'blob';



async function showStatus() {
    const provider = new ethers.providers.JsonRpcProvider("https://ropsten.infura.io/v3/75c0aeb12c204ddc8a1b3c8727055a89");
    let trx = "";


    if (document.getElementById("1").checked == true) {


        trx = document.getElementById("trxid1").value;
        let flag = 0;
        let res = null;
        try {
            res = await provider.getTransaction(trx);
            document.getElementById("errorMessage").style.display = "none";
            // console.log(res);
        }
        catch (err) {
            document.getElementById("errorMessage").innerHTML = "<br>You have entered a wrong transaction ID.";
            document.getElementById("errorMessage").style.display = "block";
            flag = 1;
        }
        if (flag == 0) {

            let data = Web3.utils.hexToAscii(res.data);
            let fileuri = "";

            if (data.includes("https://")) {
                fileuri = data.slice(data.indexOf("https://")).trim().split("").filter(char => char.codePointAt(0)).join("");
            }

            else if (data.includes("ipfs://")) {
                fileuri = data.slice(data.indexOf("ipfs://")).trim().split("").filter(char => char.codePointAt(0)).join("");
            }

            document.getElementById("fileframe").src = fileuri;
            document.getElementById("fileframe").style.display = "block";
            document.getElementById("FileHashOutput").innerHTML = await "The hash of NFT file is : ".concat(fileHashObtained);


            document.getElementById("certifierWalletAddr").style.display = "block";
            document.getElementById("cwa").innerHTML = res.from;

            document.getElementById("CompareCwaIp").style.display = "inline";
            document.getElementById("CompareCwa").style.display = "inline";


            //fileuri = "https://blockcertifyproject.github.io/friendshipk.pdf";
            var fileHashObtained = "";
            xhr.onload = async function () {
                var recoveredBlob = xhr.response;
                const reader = new FileReader();
                // This fires after the blob has been read/loaded.
                reader.addEventListener('loadend', (e) => {
                    blob = new Uint8Array(e.target.result);


                    // fileHashObtained =
                    crypto.subtle.digest('SHA-256', blob).then(values => {
                        fileHashObtained = (buf2hex(values));
                        document.getElementById("FileHashOutput").innerHTML = "The hash of NFT file is : ".concat(fileHashObtained);

                    });

                });
                // calling the save method

                // Start reading the blob as text.
                reader.readAsArrayBuffer(recoveredBlob);
            }
            xhr.open('GET', fileuri);
            xhr.send();

            document.getElementById("downloadbtn").href = fileuri;
            document.getElementById("downloadbtn").style.display = "inline";
        }
    }


    else if (document.getElementById("2").checked == true) {
        trx = document.getElementById("trxid2").value;
        const filehashval = document.getElementById("filehashvalue").value.trim();

        let flag = 0;
        let res = null;
        try {
            res = await provider.getTransaction(trx);
            document.getElementById("errorMessage").style.display = "none";
        }
        catch (err) {
            document.getElementById("errorMessage").innerHTML = "<br>You have entered a wrong transaction ID.";
            document.getElementById("errorMessage").style.display = "block";
            flag = 1;
        }

        if (flag == 0) {

            let data = Web3.utils.hexToAscii(res.data);
            let fileuri = "";

            if (data.includes("https://")) {
                fileuri = data.slice(data.indexOf("https://")).trim().split("").filter(char => char.codePointAt(0)).join("");
            }

            else if (data.includes("ipfs://")) {
                fileuri = data.slice(data.indexOf("ipfs://")).trim().split("").filter(char => char.codePointAt(0)).join("");
            }

            document.getElementById("fileframe").src = fileuri;
            document.getElementById("fileframe").style.display = "block";

            // document.getElementById("FileHashOutput").innerHTML = await "The hash of NFT file is : ".concat(fileHashObtained);




            //fileuri = "https://blockcertifyproject.github.io/friendshipk.pdf";
            var fileHashObtained = "";
            xhr.onload = async function () {
                var recoveredBlob = xhr.response;
                const reader = new FileReader();
                // This fires after the blob has been read/loaded.
                reader.addEventListener('loadend', (e) => {
                    blob = new Uint8Array(e.target.result);


                    // fileHashObtained =
                    crypto.subtle.digest('SHA-256', blob).then(values => {
                        fileHashObtained = (buf2hex(values));
                        s1 = fileHashObtained.toLowerCase();
                        s2 = filehashval.toLowerCase();
                        s3 = "<br><br>Your input hash value matches with blockchain.";
                        s4 = "<br><br>Your input hash value DOES NOT match with blockchain. The file from which you generated a hash IS ALTERED.";
                        let CompareRes = "";
                        if (s1.localeCompare(s2) == 0) {
                            CompareRes = s3;
                            document.getElementById("comparisionFilehash").className = "successmsg";
                        }
                        else {
                            CompareRes = s4;
                            document.getElementById("comparisionFilehash").className = "failuremsg";
                        }

                        // document.getElementById("FileHashOutput").innerHTML = "The hash of NFT file is : ".concat(fileHashObtained);


                        document.getElementById("comparisionFilehash").innerHTML =
                            "You provided File hash: ".concat(filehashval).concat("<br><br>").concat("We obtained file Hash value: ").
                                concat(fileHashObtained).concat(CompareRes);




                    });

                });
                // calling the save method

                // Start reading the blob as text.
                reader.readAsArrayBuffer(recoveredBlob);
            }
            xhr.open('GET', fileuri);
            xhr.send();

            document.getElementById("downloadbtn").href = fileuri;
            document.getElementById("downloadbtn").style.display = "inline";

            document.getElementById("comparisionFilehash").style.display = "block";

            document.getElementById("certifierWalletAddr").style.display = "block";
            document.getElementById("cwa").innerHTML = res.from;

            document.getElementById("CompareCwaIp").style.display = "inline";
            document.getElementById("CompareCwa").style.display = "inline";



        }

    }

    else if (document.getElementById("3").checked == true) {
        var s1 = "";
        trx = document.getElementById("trxid3").value;

        const fileInputted = document.getElementById('fileToUpload').files[0];

        let ff = new FileReader();
        ff.readAsArrayBuffer(fileInputted);
        ff.addEventListener('loadend', (z) => {
            fileblob = new Uint8Array(z.target.result);
            crypto.subtle.digest('SHA-256', fileblob).then(s1val => {
                s1 = buf2hex(s1val).toLowerCase();
            });
        });


        let flag = 0;
        let res = null;
        try {
            res = await provider.getTransaction(trx);
            document.getElementById("errorMessage").style.display = "none";
        }
        catch (err) {
            document.getElementById("errorMessage").innerHTML = "<br>You have entered a wrong transaction ID.";
            document.getElementById("errorMessage").style.display = "block";
            flag = 1;
        }

        if (flag == 0) {

            let data = Web3.utils.hexToAscii(res.data);
            let fileuri = "";

            if (data.includes("https://")) {
                fileuri = data.slice(data.indexOf("https://")).trim().split("").filter(char => char.codePointAt(0)).join("");
            }

            else if (data.includes("ipfs://")) {
                fileuri = data.slice(data.indexOf("ipfs://")).trim().split("").filter(char => char.codePointAt(0)).join("");
            }

            // document.getElementById("fileframe").src = fileuri;
            // document.getElementById("fileframe").style.display = "block";



            //fileuri = "https://blockcertifyproject.github.io/friendshipk.pdf";
            var fileHashObtained = "";
            xhr.onload = async function () {
                var recoveredBlob = xhr.response;
                const reader = new FileReader();
                // This fires after the blob has been read/loaded.
                reader.addEventListener('loadend', (e) => {
                    blob = new Uint8Array(e.target.result);


                    // fileHashObtained =
                    crypto.subtle.digest('SHA-256', blob).then(values => {
                        fileHashObtained = (buf2hex(values));
                        var s2 = fileHashObtained.toLowerCase();
                        var CompareRes = "";
                        if (s1.localeCompare(s2) == 0) {
                            CompareRes = "<br><br>Your Uploaded File and NFT File Hashes match. Your file in UN-altered.";
                            document.getElementById("comparisionFilehash").className = "successmsg";
                        }
                        else {
                            CompareRes = "<br><br>Your Uploaded File and NFT File on Blockchain Hashes DID NOT match. Your file IS altered.";
                            document.getElementById("comparisionFilehash").className = "failuremsg";
                        }
                        // document.getElementById("FileHashOutput").innerHTML = "The hash of NFT file is : ".concat(fileHashObtained);
                        document.getElementById("comparisionFilehash").innerHTML =
                            "You provided File hash: ".concat(s1).concat("<br><br>").concat("We obtained file Hash value: ").
                                concat(s2).concat(CompareRes);
                    });

                });
                // calling the save method

                // Start reading the blob as text.
                reader.readAsArrayBuffer(recoveredBlob);
            }
            xhr.open('GET', fileuri);
            xhr.send();

            document.getElementById("downloadbtn").href = fileuri;
            document.getElementById("downloadbtn").style.display = "inline";

            document.getElementById("comparisionFilehash").style.display = "block";

            document.getElementById("certifierWalletAddr").style.display = "block";
            document.getElementById("cwa").innerHTML = res.from;

            document.getElementById("CompareCwaIp").style.display = "inline";
            document.getElementById("CompareCwa").style.display = "inline";


        }
    }



}
