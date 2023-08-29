function generateQRDisplay(id,URL){
    var qrcode = new QRCode(id, {
        text: URL,
        width: 50,
        height: 50,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });
}